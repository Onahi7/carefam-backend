import { 
  IsString, 
  IsEnum, 
  IsNumber, 
  IsBoolean, 
  IsArray,
  ValidateNested,
  IsPositive,
  Min,
  Max,
  IsMongoId,
  IsOptional,
  IsDateString
} from "class-validator"
import { Type, Transform } from "class-transformer"
import { 
  InvoiceType, 
  InvoiceStatus, 
  PaymentMethod, 
  TaxType 
} from "../../common/schemas/invoice.schema"

export class CreateInvoiceItemDto {
  @IsMongoId()
  product: string

  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNumber()
  @IsPositive()
  unitPrice: number

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercentage?: number = 0

  @IsString()
  @IsOptional()
  notes?: string
}

export class CreateTaxBreakdownDto {
  @IsEnum(TaxType)
  taxType: TaxType

  @IsString()
  taxName: string

  @IsNumber()
  @Min(0)
  @Max(100)
  taxRate: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  taxableAmount?: number
}

export class CreateInvoiceDto {
  @IsEnum(InvoiceType)
  invoiceType: InvoiceType

  @IsMongoId()
  customer: string

  @IsMongoId()
  outlet: string

  @IsDateString()
  issueDate: string

  @IsDateString()
  @IsOptional()
  dueDate?: string

  @IsDateString()
  @IsOptional()
  validUntil?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[]

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercentage?: number = 0

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaxBreakdownDto)
  @IsOptional()
  taxes?: CreateTaxBreakdownDto[]

  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  @IsOptional()
  acceptedPaymentMethods?: PaymentMethod[]

  @IsBoolean()
  @IsOptional()
  isCreditSale?: boolean = false

  @IsNumber()
  @Min(1)
  @Max(365)
  @IsOptional()
  creditTermDays?: number = 30

  @IsString()
  @IsOptional()
  customerNotes?: string

  @IsString()
  @IsOptional()
  internalNotes?: string

  @IsString()
  @IsOptional()
  termsAndConditions?: string

  @IsString()
  @IsOptional()
  purchaseOrderNumber?: string

  @IsOptional()
  deliveryAddress?: {
    street?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
  }

  @IsDateString()
  @IsOptional()
  deliveryDate?: string

  @IsString()
  @IsOptional()
  deliveryNotes?: string
}

export class UpdateInvoiceDto {
  @IsEnum(InvoiceStatus)
  @IsOptional()
  status?: InvoiceStatus

  @IsDateString()
  @IsOptional()
  issueDate?: string

  @IsDateString()
  @IsOptional()
  dueDate?: string

  @IsDateString()
  @IsOptional()
  validUntil?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  @IsOptional()
  items?: CreateInvoiceItemDto[]

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercentage?: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaxBreakdownDto)
  @IsOptional()
  taxes?: CreateTaxBreakdownDto[]

  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  @IsOptional()
  acceptedPaymentMethods?: PaymentMethod[]

  @IsString()
  @IsOptional()
  customerNotes?: string

  @IsString()
  @IsOptional()
  internalNotes?: string

  @IsString()
  @IsOptional()
  termsAndConditions?: string

  @IsString()
  @IsOptional()
  purchaseOrderNumber?: string

  @IsOptional()
  deliveryAddress?: {
    street?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
  }

  @IsDateString()
  @IsOptional()
  deliveryDate?: string

  @IsString()
  @IsOptional()
  deliveryNotes?: string
}

export class InvoiceFilterDto {
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

  @IsEnum(InvoiceStatus)
  @IsOptional()
  status?: InvoiceStatus

  @IsEnum(InvoiceType)
  @IsOptional()
  invoiceType?: InvoiceType

  @IsMongoId()
  @IsOptional()
  customer?: string

  @IsMongoId()
  @IsOptional()
  outlet?: string

  @IsDateString()
  @IsOptional()
  startDate?: string

  @IsDateString()
  @IsOptional()
  endDate?: string

  @IsString()
  @IsOptional()
  search?: string
}

export class AddPaymentDto {
  @IsNumber()
  @IsPositive()
  amount: number

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @IsString()
  @IsOptional()
  paymentReference?: string

  @IsString()
  @IsOptional()
  paymentNotes?: string
}