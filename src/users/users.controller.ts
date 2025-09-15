import { Controller, Get, Put, Delete, Param, Body, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(":id")
  @Roles(UserRole.ADMIN)
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.updateUser(id, updateData)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deactivateUser(@Param('id') id: string) {
    return this.usersService.deactivateUser(id);
  }
}
