import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, Request } from "@nestjs/common"
import { ProductsService } from "./products.service"
import type { CreateProductDto } from "./dto/create-product.dto"
import type { UpdateProductDto } from "./dto/update-product.dto"
import type { StockAdjustmentDto } from "./dto/stock-adjustment.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("products")
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  async findAll(
    @Query('outletId') outletId?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    return this.productsService.findAll(outletId, category, search)
  }

  @Get("categories")
  async getCategories() {
    return this.productsService.getCategories()
  }

  @Get("types")
  async getProductTypes() {
    return this.productsService.getProductTypes()
  }

  @Get('low-stock')
  async getLowStockProducts(@Query('outletId') outletId?: string) {
    // If no outletId provided, get for all outlets or default outlet
    const targetOutletId = outletId || 'default'
    return this.productsService.getLowStockProducts(targetOutletId);
  }

  @Get("expiring")
  async getExpiringProducts(@Query('outletId') outletId?: string, @Query('days') days?: string) {
    const daysNumber = days ? Number.parseInt(days) : 30
    const targetOutletId = outletId || 'default'
    return this.productsService.getExpiringProducts(targetOutletId, daysNumber)
  }

  @Get("stock-adjustment")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async getStockAdjustments(@Query('outletId') outletId?: string) {
    return this.productsService.getStockAdjustmentHistory(outletId)
  }

    @Post(":id/stock-adjustment")
  @UseGuards(JwtAuthGuard)
  async createStockAdjustment(@Param("id") productId: string, @Body() stockAdjustmentDto: StockAdjustmentDto) {
    return this.productsService.adjustStock(productId, stockAdjustmentDto)
  }

  @Get("barcode/:barcode")
  async findByBarcode(@Param('barcode') barcode: string, @Query('outletId') outletId?: string) {
    return this.productsService.findByBarcode(barcode, outletId)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto)
  }

  @Post(":id/adjust-stock")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async adjustStock(@Param('id') id: string, @Body() stockAdjustmentDto: StockAdjustmentDto) {
    return this.productsService.adjustStock(id, stockAdjustmentDto)
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
