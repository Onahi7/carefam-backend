import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

export type ShiftHistoryDocument = ShiftHistory & Document

export enum ShiftStatus {
  ACTIVE = "active",
  ENDED = "ended",
  CANCELLED = "cancelled"
}

@Schema({ timestamps: true })
export class ShiftHistory {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "Outlet", required: true })
  outletId: Types.ObjectId

  @Prop({ required: true, enum: ShiftStatus })
  status: ShiftStatus

  @Prop({ required: true })
  startTime: Date

  @Prop()
  endTime: Date

  @Prop({ required: true })
  openingCash: number

  @Prop({ default: 0 })
  totalSales: number

  @Prop({ default: 0 })
  cashSales: number

  @Prop({ default: 0 })
  cardSales: number

  @Prop({ default: 0 })
  mobileSales: number

  @Prop({ default: 0 })
  transactionCount: number

  @Prop({ default: 0 })
  totalCashIn: number

  @Prop({ default: 0 })
  totalCashOut: number

  @Prop({ default: 0 })
  expectedCash: number

  @Prop()
  actualCash: number

  @Prop()
  variance: number

  @Prop()
  notes: string

  @Prop({
    type: {
      managerId: { type: Types.ObjectId, ref: "User" },
      managerName: String,
      timestamp: Date,
      approved: Boolean,
      notes: String
    }
  })
  managerApproval?: {
    managerId: Types.ObjectId
    managerName: string
    timestamp: Date
    approved: boolean
    notes?: string
  }

  @Prop({ default: false })
  isArchived: boolean
}

export const ShiftHistorySchema = SchemaFactory.createForClass(ShiftHistory)

// Create indexes for better performance
ShiftHistorySchema.index({ userId: 1, startTime: -1 })
ShiftHistorySchema.index({ outletId: 1, startTime: -1 })
ShiftHistorySchema.index({ status: 1 })
ShiftHistorySchema.index({ startTime: 1, endTime: 1 })