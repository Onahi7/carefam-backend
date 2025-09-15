import { Controller, Get, Post, Put, Delete, Param, UseGuards } from "@nestjs/common"
import { SuppliersService } from "./suppliers.service"
import type { CreateSupplierDto } from "./dto/create-supplier.dto"
import type { UpdateSupplierDto } from "./dto/update-supplier.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("suppliers")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER)
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Post()
  async create(createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto)
  }

  @Get()
  async findAll() {
    return this.suppliersService.findAll()
  }

  @Get("top")
  async getTopSuppliers(limit?: string) {
    const limitNumber = limit ? Number.parseInt(limit) : 10
    return this.suppliersService.getTopSuppliers(limitNumber)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.suppliersService.findById(id);
  }

  @Put(":id")
  async update(@Param('id') id: string, updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.suppliersService.delete(id);
  }
}
