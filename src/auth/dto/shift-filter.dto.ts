import { IsOptional, IsString, IsNumber, IsEnum, IsDateString, IsMongoId } from "class-validator"
import { Type } from "class-transformer"

export class ShiftFilterDto {
  @IsOptional()
  @IsMongoId()
  userId?: string

  @IsOptional()
  @IsMongoId()
  outletId?: string

  @IsOptional()
  @IsEnum(["active", "ended", "cancelled"])
  status?: string

  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10
}

export class ShiftStatsDto {
  @IsOptional()
  @IsMongoId()
  outletId?: string

  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string

  @IsOptional()
  @IsEnum(["daily", "weekly", "monthly"])
  period?: string = "daily"
}