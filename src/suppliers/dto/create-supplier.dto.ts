import { IsNotEmpty, IsEmail, IsOptional, IsNumber, ValidateNested } from "class-validator"
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

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  contactPerson: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  phone: string

  @IsNotEmpty()
  address: string

  @IsOptional()
  city?: string

  @IsOptional()
  country?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentTermsDto)
  paymentTerms?: PaymentTermsDto
}
