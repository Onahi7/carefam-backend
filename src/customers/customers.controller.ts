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
import { CustomersService } from "./customers.service"
import { CreateCustomerDto, UpdateCustomerDto, CustomerFilterDto, UpdateCreditLimitDto } from "./dto/customer.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("customers")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  create(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
    return this.customersService.create(createCustomerDto, req.user.userId)
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  findAll(@Query() filterDto: CustomerFilterDto) {
    return this.customersService.findAll(filterDto)
  }

  @Get("by-outlet/:outletId")
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  findByOutlet(@Param("outletId") outletId: string) {
    return this.customersService.getCustomersByOutlet(outletId)
  }

  @Get("credit-customers")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  getCreditCustomers() {
    return this.customersService.getCreditCustomers()
  }

  @Get("overdue-customers")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  getOverdueCustomers() {
    return this.customersService.getOverdueCustomers()
  }

  @Get(":id")
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER)
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(id)
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Request() req
  ) {
    return this.customersService.update(id, updateCustomerDto, req.user.userId)
  }

  @Patch(":id/credit-limit")
  @Roles(UserRole.ADMIN)
  updateCreditLimit(
    @Param("id") id: string,
    @Body() updateCreditLimitDto: UpdateCreditLimitDto,
    @Request() req
  ) {
    return this.customersService.updateCreditLimit(
      id,
      updateCreditLimitDto.creditLimit,
      req.user.userId
    )
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.customersService.remove(id)
  }
}