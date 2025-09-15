import { IsOptional, IsEmail, IsDateString } from "class-validator"

export class UpdateOutletDto {
  @IsOptional()
  name?: string

  @IsOptional()
  address?: string

  @IsOptional()
  city?: string

  @IsOptional()
  phone?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  licenseNumber?: string

  @IsOptional()
  @IsDateString()
  licenseExpiry?: string

  @IsOptional()
  operatingHours?: {
    open: string
    close: string
    timezone?: string
  }
}
