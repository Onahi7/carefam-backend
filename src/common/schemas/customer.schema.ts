import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type CustomerDocument = Customer & Document

export enum CustomerType {
  WALK_IN = "walk_in",
  B2B = "b2b",
  INSTITUTIONAL = "institutional"
}

export enum PaymentMethod {
  CASH = "cash",
  AFRIMONEY = "afrimoney",
  MOBILE_MONEY = "mobile_money",
  BANK_TRANSFER = "bank_transfer",
  CREDIT = "credit"
}

export enum CreditStatus {
  GOOD = "good",
  OVERDUE = "overdue",
  SUSPENDED = "suspended",
  BLOCKED = "blocked"
}

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true })
  name: string

  @Prop()
  email: string

  @Prop()
  phone: string

  @Prop({ required: true, enum: CustomerType })
  customerType: CustomerType

  @Prop()
  businessName: string // For B2B customers

  @Prop()
  businessRegistrationNumber: string // For B2B customers

  @Prop()
  taxIdentificationNumber: string // For B2B customers

  @Prop({
    type: {
      street: String,
      city: String,
      region: String,
      postalCode: String,
      country: String
    }
  })
  address: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  }

  @Prop()
  contactPerson: string // For B2B customers

  @Prop()
  contactPersonPhone: string // For B2B customers

  @Prop([{ type: String, enum: PaymentMethod }])
  preferredPaymentMethods: PaymentMethod[]

  // Credit Management for B2B customers
  @Prop({ default: 0 })
  creditLimit: number

  @Prop({ default: 0 })
  currentCreditBalance: number

  @Prop({ default: 30 })
  creditTermDays: number // Payment terms in days

  @Prop({ enum: CreditStatus, default: CreditStatus.GOOD })
  creditStatus: CreditStatus

  @Prop()
  creditApprovedBy: Types.ObjectId // Reference to admin/manager user

  @Prop()
  creditApprovedDate: Date

  // Pricing information
  @Prop({ default: false })
  isWholesaleCustomer: boolean

  @Prop({ default: 0, min: 0, max: 50 })
  discountPercentage: number // Wholesale discount

  // Outlet assignment for outlet-specific customers
  @Prop({ type: Types.ObjectId, ref: "Outlet" })
  assignedOutlet: Types.ObjectId

  // Purchase history summary
  @Prop({ default: 0 })
  totalPurchases: number

  @Prop({ default: 0 })
  lifetimeValue: number

  @Prop()
  lastPurchaseDate: Date

  @Prop({ default: 0 })
  averageOrderValue: number

  @Prop({ default: true })
  isActive: boolean

  @Prop()
  notes: string // Internal notes about the customer

  @Prop({ type: Types.ObjectId, ref: "User" })
  createdBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  lastModifiedBy: Types.ObjectId
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)

// Create indexes for better performance
CustomerSchema.index({ customerType: 1 })
CustomerSchema.index({ phone: 1 })
CustomerSchema.index({ email: 1 })
CustomerSchema.index({ businessRegistrationNumber: 1 })
CustomerSchema.index({ assignedOutlet: 1 })
CustomerSchema.index({ creditStatus: 1 })