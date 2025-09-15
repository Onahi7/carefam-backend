import { IsOptional, IsString, IsNumber, IsObject } from "class-validator"

export class EndShiftDto {
  @IsNumber()
  actualCash: number

  @IsOptional()
  @IsString()
  notes?: string

  @IsOptional()
  @IsObject()
  managerApproval?: {
    managerId: string
    managerName: string
    timestamp: Date
    approved: boolean
  }
}