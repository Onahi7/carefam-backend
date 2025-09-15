import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type CreditTransactionDocument = CreditTransaction & Document

export enum CreditTransactionType {
  CREDIT_SALE = "credit_sale",
  PAYMENT = "payment",
  CREDIT_ADJUSTMENT = "credit_adjustment",
  INTEREST_CHARGE = "interest_charge",
  LATE_FEE = "late_fee",
  CREDIT_LIMIT_ADJUSTMENT = "credit_limit_adjustment"
}

export enum CreditTransactionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  REVERSED = "reversed"
}

@Schema({ timestamps: true })
export class CreditTransaction {
  @Prop({ required: true, unique: true })
  transactionNumber: string

  @Prop({ type: Types.ObjectId, ref: "Customer", required: true })
  customer: Types.ObjectId

  @Prop({ required: true, enum: CreditTransactionType })
  transactionType: CreditTransactionType

  @Prop({ required: true })
  amount: number

  @Prop({ required: true })
  description: string

  @Prop({ type: Types.ObjectId, ref: "Invoice" })
  relatedInvoice: Types.ObjectId

  @Prop({ required: true, enum: CreditTransactionStatus, default: CreditTransactionStatus.PENDING })
  status: CreditTransactionStatus

  @Prop({ required: true })
  transactionDate: Date

  @Prop()
  dueDate: Date // For credit sales

  @Prop({ default: 0 })
  runningBalance: number // Customer's balance after this transaction

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  approvedBy: Types.ObjectId

  @Prop()
  approvedDate: Date

  @Prop()
  notes: string

  @Prop({ type: Types.ObjectId, ref: "Outlet", required: true })
  outlet: Types.ObjectId
}

export const CreditTransactionSchema = SchemaFactory.createForClass(CreditTransaction)

// Create indexes for better performance
CreditTransactionSchema.index({ transactionNumber: 1 }, { unique: true })
CreditTransactionSchema.index({ customer: 1 })
CreditTransactionSchema.index({ transactionType: 1 })
CreditTransactionSchema.index({ status: 1 })
CreditTransactionSchema.index({ transactionDate: 1 })
CreditTransactionSchema.index({ dueDate: 1 })
CreditTransactionSchema.index({ "customer": 1, "transactionDate": 1 })
CreditTransactionSchema.index({ "customer": 1, "status": 1 })