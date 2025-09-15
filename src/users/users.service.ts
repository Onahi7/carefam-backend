import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { User, type UserDocument } from "../common/schemas/user.schema"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findAll() {
    return this.userModel
      .find({ isActive: true })
      .populate('assignedOutlets', 'name address city')
      .select("-password")
      .lean()
      .then(users => 
        users.map(user => ({
          ...user,
          outletId: user.assignedOutlets?.[0]?._id || null,
          outletName: (user.assignedOutlets?.[0] as any)?.name || null
        }))
      )
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select("-password")
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  async updateUser(id: string, updateData: Partial<User>) {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password")

    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async deactivateUser(id: string) {
    const user = await this.userModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("-password")

    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }
}
