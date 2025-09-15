import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type CashTransactionDocument = CashTransaction & Document

export enum CashTransactionType {
  CASH_IN = "cash-in",
  CASH_OUT = "cash-out",
  SALE = "sale",
  OPENING = "opening",
  CLOSING = "closing"
}

@Schema({ timestamps: true })
export class CashTransaction {
  @Prop({ required: true, enum: CashTransactionType })
  type: CashTransactionType

  @Prop({ required: true })
  amount: number

  @Prop({ required: true })
  reason: string

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId

  @Prop({ required: true, type: Types.ObjectId, ref: "Outlet" })
  outletId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  approvedBy?: Types.ObjectId

  @Prop()
  reference?: string

  @Prop({ required: true })
  balanceAfter: number

  @Prop({ default: true })
  isActive: boolean
}

export const CashTransactionSchema = SchemaFactory.createForClass(CashTransaction)

// Audit Log Schema
export type AuditLogDocument = AuditLog & Document

export enum AuditAction {
  LOGIN = "login",
  LOGOUT = "logout",
  SHIFT_START = "shift_start",
  SHIFT_END = "shift_end",
  TRANSACTION_VOID = "transaction_void",
  PRICE_OVERRIDE = "price_override",
  DISCOUNT_APPLIED = "discount_applied",
  MANAGER_OVERRIDE = "manager_override",
  CASH_IN = "cash_in",
  CASH_OUT = "cash_out",
  RECONCILIATION = "reconciliation"
}

@Schema({ timestamps: true })
export class AuditLog {
  @Prop({ required: true, enum: AuditAction })
  action: AuditAction

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  userId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  managerId?: Types.ObjectId

  @Prop({ required: true, type: Types.ObjectId, ref: "Outlet" })
  outletId: Types.ObjectId

  @Prop({ required: true })
  details: string

  @Prop()
  amount?: number

  @Prop()
  transactionId?: string

  @Prop()
  ipAddress?: string

  @Prop()
  userAgent?: string

  @Prop({ type: Object })
  metadata?: Record<string, any>
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog)