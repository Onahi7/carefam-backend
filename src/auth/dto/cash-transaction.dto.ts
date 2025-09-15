import { IsEnum, IsNumber, IsString, IsOptional, Min } from "class-validator"
import { CashTransactionType } from "../../common/schemas/cash-transaction.schema"

export class CashTransactionDto {
  @IsEnum(CashTransactionType)
  type: CashTransactionType

  @IsNumber()
  @Min(0)
  amount: number

  @IsString()
  reason: string

  @IsOptional()
  @IsString()
  reference?: string
}