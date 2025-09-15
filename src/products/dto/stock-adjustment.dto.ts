import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from "class-validator"

export enum AdjustmentType {
  ADD = "add",
  SUBTRACT = "subtract",
  SET = "set",
}

export class StockAdjustmentDto {
  @IsNotEmpty()
  outletId: string

  @IsNumber()
  quantity: number

  @IsEnum(AdjustmentType)
  adjustmentType: AdjustmentType

  @IsNotEmpty()
  reason: string

  @IsOptional()
  notes?: string
}
