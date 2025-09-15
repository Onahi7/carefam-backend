import { IsNotEmpty, IsArray, IsEnum, IsOptional, IsNumber, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { PaymentMethod } from "../../common/schemas/transaction.schema"

class TransactionItemDto {
  @IsNotEmpty()
  productId: string

  @IsNumber()
  quantity: number

  @IsOptional()
  @IsNumber()
  discount?: number
}

export class CreateTransactionDto {
  @IsNotEmpty()
  outletId: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDto)
  items: TransactionItemDto[]

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod

  @IsOptional()
  customerName?: string

  @IsOptional()
  customerPhone?: string

  @IsOptional()
  notes?: string
}
