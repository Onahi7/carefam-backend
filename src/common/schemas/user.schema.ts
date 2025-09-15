import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type UserDocument = User & Document

export enum UserRole {
  CASHIER = "cashier",
  MANAGER = "manager",
  ADMIN = "admin",
}

export enum ShiftStatus {
  ACTIVE = "active",
  ENDED = "ended",
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, enum: UserRole })
  role: UserRole

  @Prop({ type: [{ type: Types.ObjectId, ref: "Outlet" }] })
  assignedOutlets: Types.ObjectId[]

  @Prop({ default: true })
  isActive: boolean

  @Prop({
    type: {
      status: { type: String, enum: ShiftStatus },
      startTime: Date,
      endTime: Date,
      openingCash: { type: Number, default: 0 },
      totalSales: { type: Number, default: 0 },
      cashSales: { type: Number, default: 0 },
      cardSales: { type: Number, default: 0 },
      mobileSales: { type: Number, default: 0 },
      transactionCount: { type: Number, default: 0 },
      totalCashIn: { type: Number, default: 0 },
      totalCashOut: { type: Number, default: 0 },
      expectedCash: { type: Number, default: 0 },
      actualCash: Number,
      variance: Number,
      notes: String,
      managerApproval: {
        managerId: String,
        managerName: String,
        timestamp: Date,
        approved: Boolean
      }
    },
  })
  currentShift?: {
    status: ShiftStatus
    startTime: Date
    endTime?: Date
    openingCash: number
    totalSales: number
    cashSales: number
    cardSales: number
    mobileSales: number
    transactionCount: number
    totalCashIn: number
    totalCashOut: number
    expectedCash: number
    actualCash?: number
    variance?: number
    notes?: string
    managerApproval?: {
      managerId: string
      managerName: string
      timestamp: Date
      approved: boolean
    }
  }
}

export const UserSchema = SchemaFactory.createForClass(User)
