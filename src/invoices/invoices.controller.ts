import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus
} from "@nestjs/common"
import { InvoicesService } from "./invoices.service"
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceFilterDto, AddPaymentDto } from "./dto/invoice.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("invoices")
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  create(@Body() createInvoiceDto: CreateInvoiceDto, @Request() req) {
    return this.invoicesService.create(createInvoiceDto, req.user.userId)
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  findAll(@Query() filterDto: InvoiceFilterDto) {
    return this.invoicesService.findAll(filterDto)
  }

  @Get("overdue")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  getOverdueInvoices() {
    return this.invoicesService.getOverdueInvoices()
  }

  @Get("customer/:customerId")
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  getInvoicesByCustomer(@Param("customerId") customerId: string) {
    return this.invoicesService.getInvoicesByCustomer(customerId)
  }

  @Get(":id")
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  findOne(@Param("id") id: string) {
    return this.invoicesService.findOne(id)
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  update(
    @Param("id") id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @Request() req
  ) {
    return this.invoicesService.update(id, updateInvoiceDto, req.user.userId)
  }

  @Patch(":id/approve")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  approve(@Param("id") id: string, @Request() req) {
    return this.invoicesService.approve(id, req.user.userId)
  }

  @Patch(":id/cancel")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  cancel(@Param("id") id: string, @Request() req) {
    return this.invoicesService.cancel(id, req.user.userId)
  }

  @Post(":id/payments")
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  addPayment(
    @Param("id") id: string,
    @Body() addPaymentDto: AddPaymentDto,
    @Request() req
  ) {
    return this.invoicesService.addPayment(id, addPaymentDto, req.user.userId)
  }

  @Post(":id/convert-to-invoice")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  convertProformaToInvoice(@Param("id") id: string, @Request() req) {
    return this.invoicesService.convertProformaToInvoice(id, req.user.userId)
  }
}