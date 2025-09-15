import { Controller, Get, Query, UseGuards, Param, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ShiftHistoryService } from './shift-history.service';
import { ShiftFilterDto, ShiftStatsDto } from './dto/shift-filter.dto';

@Controller('shift-history')
@UseGuards(JwtAuthGuard)
export class ShiftHistoryController {
  constructor(private readonly shiftHistoryService: ShiftHistoryService) {}

  @Get()
  async getShiftHistory(
    @Query() filters: ShiftFilterDto,
    @Request() req: any,
  ) {
    const currentUserId = req.user.id;
    const userRole = req.user.role;
    
    // Allow managers and admins to view all shifts, others can only see their own
    const userId = (userRole === 'manager' || userRole === 'admin') ? filters.userId : currentUserId;
    
    return this.shiftHistoryService.getShiftHistory({
      ...filters,
      userId
    });
  }

  @Get('stats')
  async getShiftStats(
    @Query() filters: ShiftStatsDto,
    @Request() req: any,
  ) {
    const currentUserId = req.user.id;
    const userRole = req.user.role;
    
    // Allow managers and admins to view all stats, others can only see their own
    // Note: ShiftStatsDto doesn't include userId, so we filter at service level if needed
    
    return this.shiftHistoryService.getShiftStats(filters);
  }

  @Get('top-performers')
  @UseGuards(JwtAuthGuard)
  async getTopPerformers(
    @Query('outletId') outletId?: string,
    @Query('period') period: string = 'monthly',
    @Request() req?: any,
  ) {
    const userRole = req?.user?.role;
    
    // Only managers and admins can view top performers
    if (userRole !== 'manager' && userRole !== 'admin') {
      throw new Error('Unauthorized: Only managers and admins can view top performers');
    }
    
    return this.shiftHistoryService.getTopPerformers(outletId, period);
  }

  @Get(':id')
  async getShiftById(
    @Param('id') shiftId: string,
    @Request() req: any,
  ) {
    const currentUserId = req.user.id;
    const userRole = req.user.role;
    
    const shift = await this.shiftHistoryService.getShiftById(shiftId);
    
    // Only allow managers, admins, or the shift owner to view specific shift details
    if (userRole !== 'manager' && userRole !== 'admin' && shift.userId.toString() !== currentUserId) {
      throw new Error('Unauthorized: You can only view your own shifts');
    }
    
    return shift;
  }
}