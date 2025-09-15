import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type InvoiceDocument = Invoice & Document

export enum InvoiceType {
  PROFORMA = "proforma",
  INVOICE = "invoice",
  CREDIT_NOTE = "credit_note",
  DEBIT_NOTE = "debit_note"
}

export enum InvoiceStatus {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  SENT = "sent",
  PAID = "paid",
  PARTIALLY_PAID = "partially_paid",
  OVERDUE = "overdue",
  CANCELLED = "cancelled",
  VOID = "void"
}

export enum PaymentMethod {
  CASH = "cash",
  AFRIMONEY = "afrimoney",
  MOBILE_MONEY = "mobile_money",
  BANK_TRANSFER = "bank_transfer",
  CREDIT = "credit",
  CHEQUE = "cheque"
}

export enum TaxType {
  VAT = "vat",
  WITHHOLDING_TAX = "withholding_tax",
  EXCISE_DUTY = "excise_duty",
  IMPORT_DUTY = "import_duty"
}

@Schema({ timestamps: true })
export class InvoiceItem {
  @Prop({ type: Types.ObjectId, ref: "Product", required: true })
  product: Types.ObjectId

  @Prop({ required: true })
  productName: string

  @Prop({ required: true })
  quantity: number

  @Prop({ required: true })
  unitPrice: number

  @Prop({ default: 0, min: 0, max: 100 })
  discountPercentage: number

  @Prop({ required: true })
  lineTotal: number // Calculated: (quantity * unitPrice) - discount

  @Prop()
  notes: string
}

@Schema({ timestamps: true })
export class TaxBreakdown {
  @Prop({ required: true, enum: TaxType })
  taxType: TaxType

  @Prop({ required: true })
  taxName: string

  @Prop({ required: true, min: 0, max: 100 })
  taxRate: number

  @Prop({ required: true })
  taxableAmount: number

  @Prop({ required: true })
  taxAmount: number
}

@Schema({ timestamps: true })
export class PaymentRecord {
  @Prop({ required: true })
  amount: number

  @Prop({ required: true, enum: PaymentMethod })
  paymentMethod: PaymentMethod

  @Prop({ required: true })
  paymentDate: Date

  @Prop()
  paymentReference: string // Transaction ID, receipt number, etc.

  @Prop()
  paymentNotes: string

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  recordedBy: Types.ObjectId
}

@Schema({ timestamps: true })
export class DeliveryAddress {
  @Prop()
  street: string

  @Prop()
  city: string

  @Prop()
  region: string

  @Prop()
  postalCode: string

  @Prop()
  country: string
}

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ required: true, unique: true })
  invoiceNumber: string

  @Prop({ required: true, enum: InvoiceType })
  invoiceType: InvoiceType

  @Prop({ required: true, enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status: InvoiceStatus

  @Prop({ type: Types.ObjectId, ref: "Customer", required: true })
  customer: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "Outlet", required: true })
  outlet: Types.ObjectId

  @Prop({ required: true })
  issueDate: Date

  @Prop()
  dueDate: Date

  @Prop()
  validUntil: Date // For proforma invoices

  // Invoice Items
  @Prop({ type: [InvoiceItem], required: true })
  items: InvoiceItem[]

  // Financial Calculations
  @Prop({ required: true })
  subtotal: number

  @Prop({ default: 0, min: 0, max: 100 })
  discountPercentage: number

  @Prop({ default: 0 })
  discountAmount: number

  @Prop({ type: [TaxBreakdown] })
  taxes: TaxBreakdown[]

  @Prop({ required: true })
  totalTaxAmount: number

  @Prop({ required: true })
  totalAmount: number

  @Prop({ default: 0 })
  amountPaid: number

  @Prop({ default: 0 })
  amountDue: number

  // Payment Information
  @Prop({ type: [PaymentRecord] })
  payments: PaymentRecord[]

  @Prop([{ type: String, enum: PaymentMethod }])
  acceptedPaymentMethods: PaymentMethod[]

  // Credit Information (for B2B customers)
  @Prop({ default: false })
  isCreditSale: boolean

  @Prop({ default: 30 })
  creditTermDays: number

  // Notes and Additional Information
  @Prop()
  customerNotes: string // Notes for the customer

  @Prop()
  internalNotes: string // Internal notes

  @Prop()
  termsAndConditions: string

  // Reference Information
  @Prop()
  purchaseOrderNumber: string // Customer's PO number

  @Prop({ type: Types.ObjectId, ref: "Invoice" })
  originalInvoice: Types.ObjectId // For credit/debit notes

  @Prop({ type: Types.ObjectId, ref: "Invoice" })
  proformaInvoice: Types.ObjectId // Link to original proforma

  // User Information
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "User" })
  approvedBy: Types.ObjectId

  @Prop()
  approvedDate: Date

  @Prop({ type: Types.ObjectId, ref: "User" })
  lastModifiedBy: Types.ObjectId

  // System Information
  @Prop({ default: false })
  isPrinted: boolean

  @Prop({ default: false })
  isEmailSent: boolean

  @Prop({ type: DeliveryAddress })
  deliveryAddress: DeliveryAddress

  @Prop()
  deliveryDate: Date

  @Prop()
  deliveryNotes: string
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice)

// Create indexes for better performance
InvoiceSchema.index({ invoiceNumber: 1 }, { unique: true })
InvoiceSchema.index({ customer: 1 })
InvoiceSchema.index({ outlet: 1 })
InvoiceSchema.index({ status: 1 })
InvoiceSchema.index({ invoiceType: 1 })
InvoiceSchema.index({ issueDate: 1 })
InvoiceSchema.index({ dueDate: 1 })
InvoiceSchema.index({ createdBy: 1 })
InvoiceSchema.index({ "customer": 1, "status": 1 })
InvoiceSchema.index({ "outlet": 1, "issueDate": 1 })