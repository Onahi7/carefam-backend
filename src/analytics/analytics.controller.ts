import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { AnalyticsService } from "./analytics.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/schemas/user.schema"

@Controller("analytics")
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('system-overview')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async getSystemOverview(@Query('outletId') outletId?: string) {
    return this.analyticsService.getSystemOverview(outletId);
  }

  @Get("sales")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async getSalesAnalytics(
    @Query('outletId') outletId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined
    const end = endDate ? new Date(endDate) : undefined
    return this.analyticsService.getSalesAnalytics(outletId, start, end)
  }

  @Get("staff-performance")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async getStaffPerformance(
    @Query('outletId') outletId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined
    const end = endDate ? new Date(endDate) : undefined
    return this.analyticsService.getStaffPerformance(outletId, start, end)
  }

  @Get('inventory')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async getInventoryAnalytics(@Query('outletId') outletId?: string) {
    return this.analyticsService.getInventoryAnalytics(outletId);
  }

  @Get("financial")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async getFinancialReports(
    @Query('outletId') outletId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined
    const end = endDate ? new Date(endDate) : undefined
    return this.analyticsService.getFinancialReports(outletId, start, end)
  }
}
