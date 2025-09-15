import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { ShiftHistory, ShiftHistoryDocument, ShiftStatus } from "../common/schemas/shift-history.schema"
import { User, UserDocument } from "../common/schemas/user.schema"
import { ShiftFilterDto, ShiftStatsDto } from "../auth/dto/shift-filter.dto"

@Injectable()
export class ShiftHistoryService {
  constructor(
    @InjectModel(ShiftHistory.name) private shiftHistoryModel: Model<ShiftHistoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createShiftHistory(userId: string, shiftData: any): Promise<ShiftHistory> {
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new Error("User not found")
    }

    const shiftHistory = new this.shiftHistoryModel({
      userId,
      outletId: user.assignedOutlets?.[0], // Get primary outlet
      ...shiftData,
      completedAt: new Date()
    })

    return shiftHistory.save()
  }

  async getShiftHistory(filterDto: ShiftFilterDto): Promise<{ shifts: ShiftHistory[], total: number }> {
    const {
      userId,
      outletId,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = filterDto

    const query: any = {}

    if (userId) query.userId = userId
    if (outletId) query.outletId = outletId
    if (status) query.status = status

    if (startDate || endDate) {
      query.startTime = {}
      if (startDate) query.startTime.$gte = new Date(startDate)
      if (endDate) query.startTime.$lte = new Date(endDate)
    }

    const skip = (page - 1) * limit

    const [shifts, total] = await Promise.all([
      this.shiftHistoryModel
        .find(query)
        .populate("userId", "firstName lastName email role")
        .populate("outletId", "name location")
        .sort({ startTime: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.shiftHistoryModel.countDocuments(query)
    ])

    return { shifts, total }
  }

  async getShiftById(shiftId: string): Promise<ShiftHistory> {
    const shift = await this.shiftHistoryModel
      .findById(shiftId)
      .populate("userId", "firstName lastName email role")
      .populate("outletId", "name location")
      .populate("managerApproval.managerId", "firstName lastName")
      .exec()

    if (!shift) {
      throw new Error("Shift not found")
    }

    return shift
  }

  async getShiftStats(statsDto: ShiftStatsDto): Promise<any> {
    const { outletId, startDate, endDate, period } = statsDto

    const matchStage: any = {
      status: ShiftStatus.ENDED
    }

    if (outletId) matchStage.outletId = outletId
    if (startDate || endDate) {
      matchStage.startTime = {}
      if (startDate) matchStage.startTime.$gte = new Date(startDate)
      if (endDate) matchStage.startTime.$lte = new Date(endDate)
    }

    const stats = await this.shiftHistoryModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalShifts: { $sum: 1 },
          totalSales: { $sum: "$totalSales" },
          totalCashSales: { $sum: "$cashSales" },
          totalCardSales: { $sum: "$cardSales" },
          totalMobileSales: { $sum: "$mobileSales" },
          totalTransactions: { $sum: "$transactionCount" },
          totalVariance: { $sum: "$variance" },
          averageShiftSales: { $avg: "$totalSales" },
          averageTransactionsPerShift: { $avg: "$transactionCount" },
          shiftsWithVariance: {
            $sum: {
              $cond: [{ $ne: ["$variance", 0] }, 1, 0]
            }
          },
          largestVariance: { $max: { $abs: "$variance" } },
          totalShiftDuration: {
            $sum: {
              $divide: [
                { $subtract: ["$endTime", "$startTime"] },
                1000 * 60 * 60 // Convert to hours
              ]
            }
          }
        }
      }
    ])

    const result = stats[0] || {
      totalShifts: 0,
      totalSales: 0,
      totalCashSales: 0,
      totalCardSales: 0,
      totalMobileSales: 0,
      totalTransactions: 0,
      totalVariance: 0,
      averageShiftSales: 0,
      averageTransactionsPerShift: 0,
      shiftsWithVariance: 0,
      largestVariance: 0,
      totalShiftDuration: 0
    }

    // Calculate additional metrics
    result.averageShiftDuration = result.totalShifts > 0 ? result.totalShiftDuration / result.totalShifts : 0
    result.varianceRate = result.totalShifts > 0 ? (result.shiftsWithVariance / result.totalShifts) * 100 : 0
    result.averageTransactionValue = result.totalTransactions > 0 ? result.totalSales / result.totalTransactions : 0

    return result
  }

  async getTopPerformers(outletId?: string, period: string = "monthly"): Promise<any[]> {
    const matchStage: any = {
      status: ShiftStatus.ENDED
    }

    if (outletId) matchStage.outletId = outletId

    // Set date range based on period
    const now = new Date()
    if (period === "daily") {
      matchStage.startTime = { $gte: new Date(now.setHours(0, 0, 0, 0)) }
    } else if (period === "weekly") {
      const weekStart = new Date(now.setDate(now.getDate() - 7))
      matchStage.startTime = { $gte: weekStart }
    } else if (period === "monthly") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      matchStage.startTime = { $gte: monthStart }
    }

    const performers = await this.shiftHistoryModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$userId",
          totalShifts: { $sum: 1 },
          totalSales: { $sum: "$totalSales" },
          totalTransactions: { $sum: "$transactionCount" },
          averageSales: { $avg: "$totalSales" },
          totalVariance: { $sum: { $abs: "$variance" } }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
          pipeline: [
            { $project: { firstName: 1, lastName: 1, email: 1, role: 1 } }
          ]
        }
      },
      { $unwind: "$user" }
    ])

    return performers
  }

  async archiveOldShifts(daysOld: number = 365): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    const result = await this.shiftHistoryModel.updateMany(
      {
        endTime: { $lt: cutoffDate },
        isArchived: false
      },
      { isArchived: true }
    )

    return result.modifiedCount
  }
}