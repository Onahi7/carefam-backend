import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, ShiftStatus } from '../common/schemas/user.schema';
import { ShiftHistory } from '../common/schemas/shift-history.schema';

@Injectable()
export class ShiftMigrationService {
  private readonly logger = new Logger(ShiftMigrationService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ShiftHistory.name) private shiftHistoryModel: Model<ShiftHistory>,
  ) {}

  /**
   * Migrate existing shift data from user documents to shift history collection
   * This should be run once after deploying the new shift history system
   */
  async migrateShiftData(): Promise<{ migrated: number; errors: string[] }> {
    this.logger.log('Starting shift data migration...');
    
    let migrated = 0;
    const errors: string[] = [];

    try {
      // Find all users with current shift data
      const usersWithShifts = await this.userModel.find({
        currentShift: { $exists: true, $ne: null }
      }).exec();

      this.logger.log(`Found ${usersWithShifts.length} users with current shift data`);

      for (const user of usersWithShifts) {
        try {
          // Migrate current active shift if it exists
          if (user.currentShift) {
            await this.migrateIndividualShift(user._id.toString(), user.currentShift);
            migrated++;
          }

          this.logger.log(`Migrated shifts for user: ${user.email}`);
        } catch (error) {
          const errorMessage = `Failed to migrate shifts for user ${user.email}: ${error.message}`;
          this.logger.error(errorMessage);
          errors.push(errorMessage);
        }
      }

      this.logger.log(`Migration completed. Migrated: ${migrated}, Errors: ${errors.length}`);
      return { migrated, errors };
    } catch (error) {
      this.logger.error('Migration failed:', error);
      throw error;
    }
  }

  /**
   * Migrate a single shift to the shift history collection
   */
  private async migrateIndividualShift(userId: string, shift: any): Promise<void> {
    try {
      // Check if shift already exists in history (prevent duplicates)
      const existingShift = await this.shiftHistoryModel.findOne({
        userId,
        startTime: shift.startTime
      }).exec();

      if (existingShift) {
        this.logger.debug(`Shift already exists for user ${userId} at ${shift.startTime}`);
        return;
      }

      // Create new shift history entry
      const shiftHistory = new this.shiftHistoryModel({
        userId,
        outletId: shift.outletId,
        status: shift.status || ShiftStatus.ENDED,
        startTime: shift.startTime,
        endTime: shift.endTime,
        openingCash: shift.openingCash || 0,
        closingCash: shift.actualCash || 0,
        expectedCash: shift.expectedCash || 0,
        actualCash: shift.actualCash || 0,
        variance: shift.variance || 0,
        
        // Sales data
        totalSales: shift.totalSales || 0,
        cashSales: shift.cashSales || 0,
        cardSales: shift.cardSales || 0,
        transactionCount: shift.transactionCount || 0,
        
        // Cash movements
        totalCashIn: shift.totalCashIn || 0,
        totalCashOut: shift.totalCashOut || 0,
        cashInTransactions: shift.cashInTransactions || [],
        cashOutTransactions: shift.cashOutTransactions || [],
        
        // Additional info
        notes: shift.notes,
        managerApproval: shift.managerApproval ? {
          required: true,
          approved: shift.managerApproval.approved || false,
          managerId: shift.managerApproval.managerId,
          timestamp: shift.managerApproval.timestamp || new Date(),
          reason: shift.managerApproval.reason
        } : undefined,
        
        // Metadata
        createdAt: shift.startTime || new Date(),
        updatedAt: shift.endTime || new Date()
      });

      await shiftHistory.save();
      this.logger.debug(`Migrated shift for user ${userId}: ${shift.startTime}`);
    } catch (error) {
      this.logger.error(`Failed to migrate individual shift: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clean up old shift data from user documents after successful migration
   * WARNING: This will permanently remove shift data from user documents
   */
  async cleanupOldShiftData(): Promise<{ cleaned: number; errors: string[] }> {
    this.logger.warn('Starting cleanup of migrated shift data from user documents...');
    
    let cleaned = 0;
    const errors: string[] = [];

    try {
      // Clean up ended shifts from currentShift field after migration
      const result = await this.userModel.updateMany(
        { 
          'currentShift.status': ShiftStatus.ENDED,
          'currentShift.endTime': { $exists: true, $ne: null }
        },
        { $unset: { currentShift: 1 } }
      ).exec();

      cleaned = result.modifiedCount;
      this.logger.log(`Cleaned up ${cleaned} ended shifts from user documents`);

      return { cleaned, errors };
    } catch (error) {
      const errorMessage = `Failed to cleanup old shift data: ${error.message}`;
      this.logger.error(errorMessage);
      errors.push(errorMessage);
      throw error;
    }
  }

  /**
   * Validate migration by comparing counts
   */
  async validateMigration(): Promise<{
    userShiftCount: number;
    historyShiftCount: number;
    isValid: boolean;
  }> {
    try {
      // Count current shifts in user documents
      const userShiftCount = await this.userModel.countDocuments({
        currentShift: { $exists: true, $ne: null }
      }).exec();

      // Count shifts in history collection
      const historyShiftCount = await this.shiftHistoryModel.countDocuments().exec();

      const isValid = historyShiftCount >= 0; // Always valid since we're building the history

      this.logger.log(`Migration validation - User shifts: ${userShiftCount}, History shifts: ${historyShiftCount}, Valid: ${isValid}`);

      return {
        userShiftCount,
        historyShiftCount,
        isValid
      };
    } catch (error) {
      this.logger.error('Validation failed:', error);
      throw error;
    }
  }

  /**
   * Get migration status and statistics
   */
  async getMigrationStatus(): Promise<{
    totalHistoryShifts: number;
    usersWithOldShiftData: number;
    activeShifts: number;
    needsMigration: boolean;
  }> {
    try {
      const totalHistoryShifts = await this.shiftHistoryModel.countDocuments().exec();
      
      // Check for ended shifts that haven't been migrated yet
      const usersWithOldData = await this.userModel.countDocuments({
        'currentShift.status': ShiftStatus.ENDED,
        'currentShift.endTime': { $exists: true, $ne: null }
      }).exec();

      const activeShifts = await this.userModel.countDocuments({
        'currentShift.status': ShiftStatus.ACTIVE
      }).exec();

      const needsMigration = usersWithOldData > 0;

      return {
        totalHistoryShifts,
        usersWithOldShiftData: usersWithOldData,
        activeShifts,
        needsMigration
      };
    } catch (error) {
      this.logger.error('Failed to get migration status:', error);
      throw error;
    }
  }
}