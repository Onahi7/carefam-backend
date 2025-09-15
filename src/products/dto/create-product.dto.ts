import { IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsDateString, IsArray, IsEnum } from "class-validator"
import { ProductType, ProductCategory } from "../../common/schemas/product.schema"

export class CreateProductDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  description?: string

  @IsNotEmpty()
  barcode: string

  @IsEnum(ProductType)
  productType: ProductType

  @IsEnum(ProductCategory)
  category: ProductCategory

  @IsNumber()
  retailPrice: number

  @IsNumber()
  wholesalePrice: number

  @IsNumber()
  costPrice: number

  @IsNotEmpty()
  manufacturer: string

  @IsOptional()
  brand?: string

  @IsOptional()
  model?: string

  @IsOptional()
  batchNumber?: string

  @IsOptional()
  @IsDateString()
  expiryDate?: string

  @IsOptional()
  warrantyPeriod?: string

  @IsOptional()
  @IsBoolean()
  requiresPrescription?: boolean

  @IsOptional()
  @IsBoolean()
  isControlledSubstance?: boolean

  @IsOptional()
  activeIngredient?: string

  @IsOptional()
  strength?: string

  @IsOptional()
  dosageForm?: string

  @IsOptional()
  packSize?: string

  @IsOptional()
  storageConditions?: string

  @IsOptional()
  supplier?: string

  @IsOptional()
  @IsArray()
  inventory?: {
    outlet: string
    quantity: number
    reorderPoint: number
  }[]
}
