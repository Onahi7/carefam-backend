import { 
  IsString, 
  IsEmail, 
  IsPhoneNumber, 
  IsEnum, 
  IsOptional, 
  IsNumber, 
  IsBoolean, 
  IsArray,
  ValidateNested,
  IsPositive,
  Min,
  Max,
  IsMongoId
} from "class-validator"
import { Type, Transform } from "class-transformer"
import { CustomerType, PaymentMethod, CreditStatus } from "../../common/schemas/customer.schema"

export class AddressDto {
  @IsString()
  @IsOptional()
  street?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  region?: string

  @IsString()
  @IsOptional()
  postalCode?: string

  @IsString()
  @IsOptional()
  country?: string
}

export class CreateCustomerDto {
  @IsString()
  name: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsEnum(CustomerType)
  customerType: CustomerType

  @IsString()
  @IsOptional()
  businessName?: string

  @IsString()
  @IsOptional()
  businessRegistrationNumber?: string

  @IsString()
  @IsOptional()
  taxIdentificationNumber?: string

  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto

  @IsString()
  @IsOptional()
  contactPerson?: string

  @IsString()
  @IsOptional()
  contactPersonPhone?: string

  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  @IsOptional()
  preferredPaymentMethods?: PaymentMethod[]

  @IsNumber()
  @Min(0)
  @IsOptional()
  creditLimit?: number = 0

  @IsNumber()
  @Min(7)
  @Max(365)
  @IsOptional()
  creditTermDays?: number = 30

  @IsBoolean()
  @IsOptional()
  isWholesaleCustomer?: boolean = false

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  discountPercentage?: number = 0

  @IsMongoId()
  @IsOptional()
  assignedOutlet?: string

  @IsString()
  @IsOptional()
  notes?: string
}

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsEnum(CustomerType)
  @IsOptional()
  customerType?: CustomerType

  @IsString()
  @IsOptional()
  businessName?: string

  @IsString()
  @IsOptional()
  businessRegistrationNumber?: string

  @IsString()
  @IsOptional()
  taxIdentificationNumber?: string

  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto

  @IsString()
  @IsOptional()
  contactPerson?: string

  @IsString()
  @IsOptional()
  contactPersonPhone?: string

  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  @IsOptional()
  preferredPaymentMethods?: PaymentMethod[]

  @IsNumber()
  @Min(7)
  @Max(365)
  @IsOptional()
  creditTermDays?: number

  @IsBoolean()
  @IsOptional()
  isWholesaleCustomer?: boolean

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  discountPercentage?: number

  @IsMongoId()
  @IsOptional()
  assignedOutlet?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class CustomerFilterDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10

  @IsEnum(CustomerType)
  @IsOptional()
  customerType?: CustomerType

  @IsEnum(CreditStatus)
  @IsOptional()
  creditStatus?: CreditStatus

  @IsMongoId()
  @IsOptional()
  assignedOutlet?: string

  @IsString()
  @IsOptional()
  search?: string

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isActive?: boolean = true
}

export class UpdateCreditLimitDto {
  @IsNumber()
  @Min(0)
  creditLimit: number
}