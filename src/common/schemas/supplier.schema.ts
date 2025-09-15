import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import type { Document } from "mongoose"

export type SupplierDocument = Supplier & Document

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  contactPerson: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  address: string

  @Prop()
  city: string

  @Prop()
  country: string

  @Prop({
    type: {
      creditDays: { type: Number, default: 30 },
      creditLimit: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
    },
  })
  paymentTerms: {
    creditDays: number
    creditLimit: number
    discount: number
  }

  @Prop({ default: true })
  isActive: boolean

  @Prop({
    type: {
      totalOrders: { type: Number, default: 0 },
      totalValue: { type: Number, default: 0 },
      averageDeliveryTime: { type: Number, default: 0 },
      rating: { type: Number, default: 5 },
    },
  })
  performance: {
    totalOrders: number
    totalValue: number
    averageDeliveryTime: number
    rating: number
  }
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier)
