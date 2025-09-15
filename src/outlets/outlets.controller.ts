import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from "@nestjs/common"
import { OutletsService } from "./outlets.service"
import { CreateOutletDto } from "./dto/create-outlet.dto"
import { UpdateOutletDto } from "./dto/update-outlet.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("outlets")
@UseGuards(JwtAuthGuard)
export class OutletsController {
  constructor(private outletsService: OutletsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createOutletDto: CreateOutletDto) {
    return this.outletsService.create(createOutletDto)
  }

  @Get()
  async findAll() {
    return this.outletsService.findAll()
  }

    @Get("comparison")
  async getOutletComparison() {
    return this.outletsService.getOutletComparison()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.outletsService.findById(id);
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(@Param('id') id: string, @Body() updateOutletDto: UpdateOutletDto) {
    return this.outletsService.update(id, updateOutletDto)
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.outletsService.delete(id);
  }
}
