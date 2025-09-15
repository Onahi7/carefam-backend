import { IsOptional, IsEmail, IsNumber, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

class PaymentTermsDto {
  @IsOptional()
  @IsNumber()
  creditDays?: number

  @IsOptional()
  @IsNumber()
  creditLimit?: number

  @IsOptional()
  @IsNumber()
  discount?: number
}

export class UpdateSupplierDto {
  @IsOptional()
  name?: string

  @IsOptional()
  contactPerson?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  phone?: string

  @IsOptional()
  address?: string

  @IsOptional()
  city?: string

  @IsOptional()
  country?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentTermsDto)
  paymentTerms?: PaymentTermsDto
}
