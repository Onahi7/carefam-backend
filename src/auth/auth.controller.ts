import { Controller, Post, UseGuards, Get, Request, Body } from "@nestjs/common"
import { AuthService } from "./auth.service"
import type { LoginDto } from "./dto/login.dto"
import type { RegisterDto } from "./dto/register.dto"
import type { StartShiftDto } from "./dto/start-shift.dto"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { RolesGuard } from "./guards/roles.guard"
import { Roles } from "./decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post("register")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post("start-shift")
  @UseGuards(JwtAuthGuard)
  async startShift(@Request() req, @Body() startShiftDto: StartShiftDto) {
    return this.authService.startShift(req.user.userId, startShiftDto)
  }

  @Post('end-shift')
  @UseGuards(JwtAuthGuard)
  async endShift(@Request() req, @Body() endShiftDto: any) {
    return this.authService.endShift(req.user.userId, endShiftDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }

  @Post('cash-transaction')
  @UseGuards(JwtAuthGuard)
  async addCashTransaction(@Request() req, @Body() body: { amount: number, type: 'cash-in' | 'cash-out', reason: string }) {
    return this.authService.addCashTransaction(req.user.userId, body.amount, body.type, body.reason);
  }
}
