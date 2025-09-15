import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsArray, IsOptional } from "class-validator"
import { UserRole } from "../../common/schemas/user.schema"

export class RegisterDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsEnum(UserRole)
  role: UserRole

  @IsOptional()
  outletId?: string

  @IsArray()
  @IsOptional()
  assignedOutlets?: string[]
}
