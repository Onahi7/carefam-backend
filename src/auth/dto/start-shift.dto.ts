import { IsOptional, IsString, IsNumber, Min } from "class-validator"

export class StartShiftDto {
  @IsNumber()
  @Min(0)
  openingCash: number

  @IsOptional()
  @IsString()
  notes?: string
}
