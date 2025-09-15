import { IsNotEmpty, IsArray, IsEnum, IsOptional, IsNumber, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { PaymentMethod } from "../../common/schemas/transaction.schema"

class BulkSaleItemDto {
  @IsNotEmpty()
  productId: string

  @IsNumber()
  quantity: number

  @IsOptional()
  @IsNumber()
  discount?: number
}

export class CreateBulkSaleDto {
  @IsNotEmpty()
  outletId: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkSaleItemDto)
  items: BulkSaleItemDto[]

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @IsNotEmpty()
  customerName: string

  @IsOptional()
  customerPhone?: string

  @IsOptional()
  notes?: string

  @IsOptional()
  @IsNumber()
  discount?: number
}
