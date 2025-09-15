import { Controller, Get, Post, Put, Param, Query, Body, UseGuards, Request } from "@nestjs/common"
import { TransactionsService } from "./transactions.service"
import type { CreateTransactionDto } from "./dto/create-transaction.dto"
import type { CreateBulkSaleDto } from "./dto/create-bulk-sale.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"
import { TransactionType } from "../common/schemas/transaction.schema"

@Controller("transactions")
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post("sale")
  async createSale(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionsService.createSale(createTransactionDto, req.user.userId)
  }

  @Post("bulk-sale")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async createBulkSale(@Body() createBulkSaleDto: CreateBulkSaleDto, @Request() req) {
    return this.transactionsService.createBulkSale(createBulkSaleDto, req.user.userId)
  }

  @Get()
  async findAll(
    @Query('outletId') outletId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: TransactionType,
  ) {
    const start = startDate ? new Date(startDate) : undefined
    const end = endDate ? new Date(endDate) : undefined
    return this.transactionsService.findAll(outletId, start, end, type)
  }

    @Get("bulk")
  async getBulkSales(
    @Query("status") status?: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
    @Query("outletId") outletId?: string
  ) {
    const start = startDate ? new Date(startDate) : undefined
    const end = endDate ? new Date(endDate) : undefined
    return this.transactionsService.getBulkSalesAnalytics(outletId, start, end)
  }

  @Get('receipt/:transactionId')
  async getReceipt(@Param('transactionId') transactionId: string) {
    return this.transactionsService.generateReceipt(transactionId)
  }

  @Get("daily-sales/:outletId")
  async getDailySales(@Param('outletId') outletId: string, @Query('date') date?: string) {
    const saleDate = date ? new Date(date) : new Date()
    return this.transactionsService.getDailySales(outletId, saleDate)
  }

  @Get("staff/:staffId")
  async getTransactionsByStaff(@Param('staffId') staffId: string, @Query('outletId') outletId?: string) {
    return this.transactionsService.getTransactionsByStaff(staffId, outletId)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.transactionsService.findById(id);
  }

  @Put(":id/cancel")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async cancelTransaction(@Param('id') id: string, @Body('reason') reason: string) {
    return this.transactionsService.cancelTransaction(id, reason)
  }
}
