import { IsOptional, IsNumber, IsBoolean, IsDateString, IsArray } from "class-validator"

export class UpdateProductDto {
  @IsOptional()
  name?: string

  @IsOptional()
  description?: string

  @IsOptional()
  @IsNumber()
  retailPrice?: number

  @IsOptional()
  @IsNumber()
  wholesalePrice?: number

  @IsOptional()
  @IsNumber()
  costPrice?: number

  @IsOptional()
  category?: string

  @IsOptional()
  manufacturer?: string

  @IsOptional()
  @IsDateString()
  expiryDate?: string

  @IsOptional()
  @IsBoolean()
  requiresPrescription?: boolean

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
