import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Outlet, type OutletDocument } from "../common/schemas/outlet.schema"
import type { CreateOutletDto } from "./dto/create-outlet.dto"
import type { UpdateOutletDto } from "./dto/update-outlet.dto"

@Injectable()
export class OutletsService {
  constructor(
    @InjectModel(Outlet.name) private outletModel: Model<OutletDocument>
  ) {}

  async create(createOutletDto: CreateOutletDto) {
    const outlet = new this.outletModel(createOutletDto)
    return outlet.save()
  }

  async findAll() {
    return this.outletModel.find({ isActive: true }).sort({ name: 1 })
  }

  async findById(id: string) {
    const outlet = await this.outletModel.findById(id)
    if (!outlet) {
      throw new NotFoundException("Outlet not found")
    }
    return outlet
  }

  async update(id: string, updateOutletDto: UpdateOutletDto) {
    const outlet = await this.outletModel.findByIdAndUpdate(id, updateOutletDto, { new: true })

    if (!outlet) {
      throw new NotFoundException("Outlet not found")
    }
    return outlet
  }

  async updateMetrics(outletId: string, saleAmount: number) {
    const outlet = await this.outletModel.findById(outletId)
    if (outlet) {
      outlet.metrics.totalSales += saleAmount
      outlet.metrics.totalTransactions += 1
      outlet.metrics.averageTransactionValue = outlet.metrics.totalSales / outlet.metrics.totalTransactions
      outlet.metrics.lastSaleDate = new Date()
      await outlet.save()
    }
  }

  async delete(id: string) {
    const outlet = await this.outletModel.findByIdAndUpdate(id, { isActive: false }, { new: true })

    if (!outlet) {
      throw new NotFoundException("Outlet not found")
    }
    return outlet
  }

  async getOutletComparison() {
    const outlets = await this.outletModel.find({ isActive: true })
    
    // Calculate comparison metrics for each outlet
    const comparison = outlets.map(outlet => ({
      id: outlet._id,
      name: outlet.name,
      location: `${outlet.address}, ${outlet.city || ''}`.trim(),
      totalSales: outlet.metrics?.totalSales || 0,
      totalTransactions: outlet.metrics?.totalTransactions || 0,
      averageTransaction: outlet.metrics?.averageTransactionValue || 0,
      lastSaleDate: outlet.metrics?.lastSaleDate,
      // Mock additional metrics for comparison
      salesGrowth: Math.floor(Math.random() * 20) - 10, // -10% to +10%
      customerCount: Math.floor(Math.random() * 1000) + 100,
      topProduct: "Paracetamol 500mg",
      efficiency: Math.floor(Math.random() * 40) + 60, // 60% to 100%
    }))

    // Sort by total sales descending
    comparison.sort((a, b) => b.totalSales - a.totalSales)

    return {
      outlets: comparison,
      summary: {
        totalOutlets: outlets.length,
        totalSales: comparison.reduce((sum, outlet) => sum + outlet.totalSales, 0),
        averageSales: comparison.reduce((sum, outlet) => sum + outlet.totalSales, 0) / outlets.length,
        bestPerforming: comparison[0]?.name || "None",
        worstPerforming: comparison[comparison.length - 1]?.name || "None"
      }
    }
  }
}
