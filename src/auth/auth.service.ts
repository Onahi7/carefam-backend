import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { JwtService } from "@nestjs/jwt"
import type { Model } from "mongoose"
import * as bcrypt from "bcryptjs"
import { User, type UserDocument, ShiftStatus } from "../common/schemas/user.schema"
import type { LoginDto } from "./dto/login.dto"
import type { RegisterDto } from "./dto/register.dto"
import type { StartShiftDto } from "./dto/start-shift.dto"
import type { EndShiftDto } from "./dto/end-shift.dto"
import { ShiftHistoryService } from "./shift-history.service"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private shiftHistoryService: ShiftHistoryService
  ) {}

  async validateUser(emailOrUsername: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ 
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ],
      isActive: true 
    })
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject()
      return result
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
      outlets: user.assignedOutlets,
    }

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        assignedOutlets: user.assignedOutlets,
        currentShift: user.currentShift,
      },
    }
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({ 
      $or: [
        { email: registerDto.email },
        { username: registerDto.username }
      ]
    })
    if (existingUser) {
      throw new BadRequestException("User with this email or username already exists")
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12)

    const user = new this.userModel({
      ...registerDto,
      password: hashedPassword,
      assignedOutlets: registerDto.outletId ? [registerDto.outletId] : registerDto.assignedOutlets || [],
    })

    await user.save()

    const { password, ...result } = user.toObject()
    return result
  }

  async startShift(userId: string, startShiftDto: StartShiftDto) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new UnauthorizedException("User not found")
    }

    if (user.currentShift?.status === ShiftStatus.ACTIVE) {
      throw new BadRequestException("User already has an active shift")
    }

    user.currentShift = {
      status: ShiftStatus.ACTIVE,
      startTime: new Date(),
      openingCash: startShiftDto.openingCash,
      totalSales: 0,
      cashSales: 0,
      cardSales: 0,
      mobileSales: 0,
      transactionCount: 0,
      totalCashIn: 0,
      totalCashOut: 0,
      expectedCash: startShiftDto.openingCash,
      notes: startShiftDto.notes
    }

    await user.save()
    return { message: "Shift started successfully", shift: user.currentShift }
  }

  async endShift(userId: string, endShiftDto: EndShiftDto) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new UnauthorizedException("User not found")
    }

    if (user.currentShift?.status !== ShiftStatus.ACTIVE) {
      throw new BadRequestException("No active shift found")
    }

    const expectedCash = user.currentShift.openingCash + 
                        user.currentShift.cashSales + 
                        user.currentShift.totalCashIn - 
                        user.currentShift.totalCashOut
    
    const variance = endShiftDto.actualCash - expectedCash

    // Update current shift
    user.currentShift.status = ShiftStatus.ENDED
    user.currentShift.endTime = new Date()
    user.currentShift.expectedCash = expectedCash
    user.currentShift.actualCash = endShiftDto.actualCash
    user.currentShift.variance = variance
    user.currentShift.notes = endShiftDto.notes
    user.currentShift.managerApproval = endShiftDto.managerApproval

    // Save completed shift to history
    await this.shiftHistoryService.createShiftHistory(userId, user.currentShift)

    // Clear current shift
    user.currentShift = undefined

    await user.save()
    
    return { 
      message: "Shift ended successfully", 
      summary: {
        expectedCash,
        actualCash: endShiftDto.actualCash,
        variance
      }
    }
  }

  async updateShiftSales(userId: string, saleAmount: number, paymentMethod: string) {
    const user = await this.userModel.findById(userId)
    if (user && user.currentShift?.status === ShiftStatus.ACTIVE) {
      user.currentShift.totalSales += saleAmount
      user.currentShift.transactionCount += 1
      
      // Track payment method breakdown
      switch (paymentMethod) {
        case 'cash':
          user.currentShift.cashSales += saleAmount
          break
        case 'card':
          user.currentShift.cardSales += saleAmount
          break
        case 'mobile':
          user.currentShift.mobileSales += saleAmount
          break
      }
      
      // Update expected cash for cash payments
      if (paymentMethod === 'cash') {
        user.currentShift.expectedCash += saleAmount
      }
      
      await user.save()
    }
  }

  async addCashTransaction(userId: string, amount: number, type: 'cash-in' | 'cash-out', reason: string) {
    const user = await this.userModel.findById(userId)
    if (user && user.currentShift?.status === ShiftStatus.ACTIVE) {
      if (type === 'cash-in') {
        user.currentShift.totalCashIn += amount
        user.currentShift.expectedCash += amount
      } else {
        user.currentShift.totalCashOut += amount
        user.currentShift.expectedCash -= amount
      }
      await user.save()
    }
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select("-password")
    if (!user) {
      throw new UnauthorizedException("User not found")
    }
    return user
  }
}
