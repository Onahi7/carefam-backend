import { IsNotEmpty, IsEmail, IsOptional, IsDateString, IsMongoId } from "class-validator"

export class CreateOutletDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  address: string

  @IsOptional()
  city?: string

  @IsNotEmpty()
  phone: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsMongoId()
  managerId?: string

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
