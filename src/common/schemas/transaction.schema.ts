import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type TransactionDocument = Transaction & Document

export enum TransactionType {
  SALE = "sale",
  BULK_SALE = "bulk_sale",
  RETURN = "return",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  MOBILE = "mobile",
}

export enum TransactionStatus {
  COMPLETED = "completed",
  PENDING = "pending",
  CANCELLED = "cancelled",
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, enum: TransactionType })
  type: TransactionType

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  staff: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: "Outlet", required: true })
  outlet: Types.ObjectId

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        quantity: Number,
        unitPrice: Number,
        totalPrice: Number,
        discount: { type: Number, default: 0 },
      },
    ],
  })
  items: {
    product: Types.ObjectId
    quantity: number
    unitPrice: number
    totalPrice: number
    discount: number
  }[]

  @Prop({ required: true })
  subtotal: number

  @Prop({ default: 0 })
  tax: number

  @Prop({ default: 0 })
  discount: number

  @Prop({ required: true })
  total: number

  @Prop({ required: true, enum: PaymentMethod })
  paymentMethod: PaymentMethod

  @Prop({ required: true, enum: TransactionStatus })
  status: TransactionStatus

  @Prop()
  customerName?: string

  @Prop()
  customerPhone?: string

  @Prop()
  notes?: string

  @Prop()
  receiptUrl?: string

  @Prop()
  invoiceNumber?: string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
