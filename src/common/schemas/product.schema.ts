import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Types } from "mongoose"

export type ProductDocument = Product & Document

export enum ProductType {
  DRUG = "drug",
  LAB_EQUIPMENT = "lab_equipment", 
  MEDICAL_DEVICE = "medical_device",
  GENERAL_PHARMACY = "general_pharmacy"
}

export enum ProductCategory {
  // Drug categories
  PRESCRIPTION_DRUGS = "prescription_drugs",
  OTC_DRUGS = "otc_drugs",
  ANTIBIOTICS = "antibiotics",
  VITAMINS_SUPPLEMENTS = "vitamins_supplements",
  PAIN_RELIEF = "pain_relief",
  CHRONIC_DISEASE = "chronic_disease",
  PEDIATRIC = "pediatric",
  
  // Lab Equipment
  DIAGNOSTIC_EQUIPMENT = "diagnostic_equipment",
  TESTING_KITS = "testing_kits",
  LAB_CONSUMABLES = "lab_consumables",
  MICROSCOPY = "microscopy",
  BLOOD_PRESSURE_MONITORS = "blood_pressure_monitors",
  GLUCOMETERS = "glucometers",
  
  // Medical Devices
  SURGICAL_INSTRUMENTS = "surgical_instruments",
  MONITORING_DEVICES = "monitoring_devices",
  MOBILITY_AIDS = "mobility_aids",
  WOUND_CARE = "wound_care",
  RESPIRATORY_DEVICES = "respiratory_devices",
  THERMOMETERS = "thermometers",
  
  // General Pharmacy
  PERSONAL_CARE = "personal_care",
  BABY_CARE = "baby_care",
  FIRST_AID = "first_aid",
  HYGIENE_PRODUCTS = "hygiene_products",
  COSMETICS = "cosmetics",
  HEALTH_ACCESSORIES = "health_accessories"
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ required: true, unique: true })
  barcode: string

  @Prop({ required: true, enum: ProductType })
  productType: ProductType

  @Prop({ required: true, enum: ProductCategory })
  category: ProductCategory

  @Prop({ required: true })
  retailPrice: number

  @Prop({ required: true })
  wholesalePrice: number

  @Prop({ required: true })
  costPrice: number

  @Prop({ required: true })
  manufacturer: string

  @Prop()
  brand: string

  @Prop()
  model: string // For equipment and devices

  @Prop()
  batchNumber: string

  @Prop()
  expiryDate: Date

  @Prop()
  warrantyPeriod: string // For equipment and devices

  @Prop({ default: false })
  requiresPrescription: boolean

  @Prop({ default: false })
  isControlledSubstance: boolean // For drugs

  @Prop()
  activeIngredient: string // For drugs

  @Prop()
  strength: string // For drugs (e.g., "500mg", "10ml")

  @Prop()
  dosageForm: string // For drugs (e.g., "tablet", "syrup", "injection")

  @Prop()
  packSize: string // Size/quantity per package

  @Prop()
  storageConditions: string // Storage requirements

  @Prop({
    type: [
      {
        outlet: { type: Types.ObjectId, ref: "Outlet" },
        quantity: Number,
        reorderPoint: Number,
        lastUpdated: Date,
      },
    ],
  })
  inventory: {
    outlet: Types.ObjectId
    quantity: number
    reorderPoint: number
    lastUpdated: Date
  }[]

  @Prop({ type: Types.ObjectId, ref: "Supplier" })
  supplier: Types.ObjectId

  @Prop({ default: true })
  isActive: boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product)
