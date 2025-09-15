import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { ShiftMigrationService } from './shift-migration.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('shift-migration')
@UseGuards(JwtAuthGuard)
export class ShiftMigrationController {
  constructor(private readonly migrationService: ShiftMigrationService) {}

  @Get('status')
  async getMigrationStatus(@Request() req: any) {
    const userRole = req.user.role;
    
    // Only admins can check migration status
    if (userRole !== 'admin') {
      throw new Error('Unauthorized: Only admins can check migration status');
    }
    
    return this.migrationService.getMigrationStatus();
  }

  @Post('migrate')
  async migrateShiftData(@Request() req: any) {
    const userRole = req.user.role;
    
    // Only admins can run migration
    if (userRole !== 'admin') {
      throw new Error('Unauthorized: Only admins can run migration');
    }
    
    return this.migrationService.migrateShiftData();
  }

  @Post('validate')
  async validateMigration(@Request() req: any) {
    const userRole = req.user.role;
    
    // Only admins can validate migration
    if (userRole !== 'admin') {
      throw new Error('Unauthorized: Only admins can validate migration');
    }
    
    return this.migrationService.validateMigration();
  }

  @Post('cleanup')
  async cleanupOldData(@Request() req: any) {
    const userRole = req.user.role;
    
    // Only admins can cleanup old data
    if (userRole !== 'admin') {
      throw new Error('Unauthorized: Only admins can cleanup old data');
    }
    
    // This is a destructive operation, so we require explicit confirmation
    return this.migrationService.cleanupOldShiftData();
  }
}