import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import type { Document } from "mongoose"
import { Types } from "mongoose"

export type OutletDocument = Outlet & Document

@Schema({ timestamps: true })
export class Outlet {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  address: string

  @Prop()
  city: string

  @Prop({ required: true })
  phone: string

  @Prop()
  email: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  managerId: string

  @Prop()
  licenseNumber: string

  @Prop()
  licenseExpiry: Date

  @Prop({
    type: {
      open: String,
      close: String,
      timezone: { type: String, default: "Africa/Freetown" },
    },
  })
  operatingHours: {
    open: string
    close: string
    timezone: string
  }

  @Prop({ default: true })
  isActive: boolean

  @Prop({
    type: {
      totalSales: { type: Number, default: 0 },
      totalTransactions: { type: Number, default: 0 },
      averageTransactionValue: { type: Number, default: 0 },
      lastSaleDate: Date,
    },
    default: {
      totalSales: 0,
      totalTransactions: 0,
      averageTransactionValue: 0,
      lastSaleDate: null,
    }
  })
  metrics: {
    totalSales: number
    totalTransactions: number
    averageTransactionValue: number
    lastSaleDate: Date
  }
}

export const OutletSchema = SchemaFactory.createForClass(Outlet)
