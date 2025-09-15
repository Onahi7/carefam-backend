import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Transaction, type TransactionDocument, TransactionStatus } from "../common/schemas/transaction.schema"
import { Product, type ProductDocument } from "../common/schemas/product.schema"
import { User, type UserDocument } from "../common/schemas/user.schema"
import { Outlet, type OutletDocument } from "../common/schemas/outlet.schema"
import { Supplier, type SupplierDocument } from "../common/schemas/supplier.schema"

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Outlet.name) private outletModel: Model<OutletDocument>,
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async getSystemOverview(outletId?: string) {
    const [
      totalOutlets,
      totalProducts,
      totalUsers,
      totalSuppliers,
      todayTransactions,
      todaySales,
      lowStockCount,
      expiringCount,
    ] = await Promise.all([
      this.outletModel.countDocuments({ isActive: true }),
      this.productModel.countDocuments({ isActive: true }),
      this.userModel.countDocuments({ isActive: true }),
      this.supplierModel.countDocuments({ isActive: true }),
      this.getTodayTransactionCount(outletId),
      this.getTodaySales(outletId),
      this.getLowStockCount(outletId),
      this.getExpiringProductsCount(),
    ])

    return {
      totalOutlets,
      totalProducts,
      totalUsers,
      totalSuppliers,
      todayTransactions,
      todaySales,
      lowStockCount,
      expiringCount,
    }
  }

  async getSalesAnalytics(outletId?: string, startDate?: Date, endDate?: Date) {
    const matchQuery: any = { status: TransactionStatus.COMPLETED }

    if (outletId) {
      matchQuery.outlet = outletId
    }

    if (startDate || endDate) {
      matchQuery.createdAt = {}
      if (startDate) matchQuery.createdAt.$gte = startDate
      if (endDate) matchQuery.createdAt.$lte = endDate
    }

    const [salesByDay, salesByOutlet, topProducts, paymentMethods] = await Promise.all([
      this.getSalesByDay(matchQuery),
      this.getSalesByOutlet(matchQuery),
      this.getTopSellingProducts(matchQuery),
      this.getPaymentMethodBreakdown(matchQuery),
    ])

    return {
      salesByDay,
      salesByOutlet,
      topProducts,
      paymentMethods,
    }
  }

  async getStaffPerformance(outletId?: string, startDate?: Date, endDate?: Date) {
    const matchQuery: any = { status: TransactionStatus.COMPLETED }

    if (outletId) {
      matchQuery.outlet = outletId
    }

    if (startDate || endDate) {
      matchQuery.createdAt = {}
      if (startDate) matchQuery.createdAt.$gte = startDate
      if (endDate) matchQuery.createdAt.$lte = endDate
    }

    const staffPerformance = await this.transactionModel.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: "$staff",
          totalSales: { $sum: "$total" },
          totalTransactions: { $count: {} },
          averageTransaction: { $avg: "$total" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "staff",
        },
      },
      { $unwind: "$staff" },
      {
        $project: {
          staffId: "$_id",
          staffName: { $concat: ["$staff.firstName", " ", "$staff.lastName"] },
          totalSales: 1,
          totalTransactions: 1,
          averageTransaction: 1,
        },
      },
      { $sort: { totalSales: -1 } },
    ])

    return staffPerformance
  }

  async getInventoryAnalytics(outletId?: string) {
    const products = await this.productModel.find({ isActive: true })

    let totalValue = 0
    let lowStockItems = 0
    let outOfStockItems = 0
    let expiringItems = 0

    const categoryBreakdown: { [key: string]: { count: number; value: number } } = {}

    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    products.forEach((product) => {
      let productStock = 0
      let productValue = 0

      if (outletId) {
        const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)
        productStock = outletInventory?.quantity || 0
        productValue = productStock * product.costPrice
      } else {
        productStock = product.inventory.reduce((sum, inv) => sum + inv.quantity, 0)
        productValue = productStock * product.costPrice
      }

      totalValue += productValue

      // Check stock levels
      const reorderPoint = outletId
        ? product.inventory.find((inv) => inv.outlet.toString() === outletId)?.reorderPoint || 10
        : 10

      if (productStock === 0) {
        outOfStockItems++
      } else if (productStock <= reorderPoint) {
        lowStockItems++
      }

      // Check expiry
      if (product.expiryDate && product.expiryDate <= thirtyDaysFromNow && productStock > 0) {
        expiringItems++
      }

      // Category breakdown
      if (!categoryBreakdown[product.category]) {
        categoryBreakdown[product.category] = { count: 0, value: 0 }
      }
      categoryBreakdown[product.category].count++
      categoryBreakdown[product.category].value += productValue
    })

    return {
      totalProducts: products.length,
      totalValue,
      lowStockItems,
      outOfStockItems,
      expiringItems,
      categoryBreakdown,
    }
  }

  async getFinancialReports(outletId?: string, startDate?: Date, endDate?: Date) {
    const matchQuery: any = { status: TransactionStatus.COMPLETED }

    if (outletId) {
      matchQuery.outlet = outletId
    }

    if (startDate || endDate) {
      matchQuery.createdAt = {}
      if (startDate) matchQuery.createdAt.$gte = startDate
      if (endDate) matchQuery.createdAt.$lte = endDate
    }

    const [revenueData, expensesData, topProducts] = await Promise.all([
      this.getRevenueBreakdown(matchQuery),
      this.getExpenseBreakdown(matchQuery),
      this.getTopSellingProducts(matchQuery),
    ])

    // Extract totals from aggregation results
    const revenue = revenueData?.[0]?.totalRevenue || 0
    const expenses = expensesData?.[0]?.totalExpenses || 0
    const profit = revenue - expenses
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0

    // Format period string
    let period = 'custom'
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (diffDays <= 7) period = 'weekly'
      else if (diffDays <= 31) period = 'monthly'
      else if (diffDays <= 365) period = 'yearly'
    }

    return {
      period,
      revenue,
      expenses,
      profit,
      profitMargin,
      topSellingProducts: (topProducts || []).map((product: any) => ({
        name: product.productName || product.name || 'Unknown Product',
        quantity: product.quantitySold || product.quantity || 0,
        revenue: product.revenue || product.totalRevenue || 0,
      })),
    }
  }

  private async getTodayTransactionCount(outletId?: string) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const query: any = {
      status: TransactionStatus.COMPLETED,
      createdAt: { $gte: today, $lt: tomorrow },
    }

    if (outletId) {
      query.outlet = outletId
    }

    return this.transactionModel.countDocuments(query)
  }

  private async getTodaySales(outletId?: string) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const matchQuery: any = {
      status: TransactionStatus.COMPLETED,
      createdAt: { $gte: today, $lt: tomorrow },
    }

    if (outletId) {
      matchQuery.outlet = outletId
    }

    const result = await this.transactionModel.aggregate([
      {
        $match: matchQuery,
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total" },
        },
      },
    ])

    return result[0]?.totalSales || 0
  }

  private async getLowStockCount(outletId?: string) {
    const products = await this.productModel.find({ isActive: true })
    let count = 0

    products.forEach((product) => {
      product.inventory.forEach((inv) => {
        if (outletId && inv.outlet.toString() !== outletId) {
          return
        }
        if (inv.quantity <= inv.reorderPoint) {
          count++
        }
      })
    })

    return count
  }

  private async getExpiringProductsCount() {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    return this.productModel.countDocuments({
      isActive: true,
      expiryDate: { $lte: thirtyDaysFromNow, $gte: new Date() },
    })
  }

  private async getSalesByDay(matchQuery: any) {
    return this.transactionModel.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          totalSales: { $sum: "$total" },
          totalTransactions: { $count: {} },
        },
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          totalSales: 1,
          totalTransactions: 1,
        },
      },
      { $sort: { date: 1 } },
    ])
  }

  private async getSalesByOutlet(matchQuery: any) {
    return this.transactionModel.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: "$outlet",
          totalSales: { $sum: "$total" },
          totalTransactions: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "outlets",
          localField: "_id",
          foreignField: "_id",
          as: "outlet",
        },
      },
      { $unwind: "$outlet" },
      {
        $project: {
          outletName: "$outlet.name",
          totalSales: 1,
          totalTransactions: 1,
        },
      },
      { $sort: { totalSales: -1 } },
    ])
  }

  private async getTopSellingProducts(matchQuery: any) {
    return this.transactionModel.aggregate([
      { $match: matchQuery },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$items.totalPrice" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          productName: "$product.name",
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ])
  }

  private async getPaymentMethodBreakdown(matchQuery: any) {
    return this.transactionModel.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: "$paymentMethod",
          count: { $count: {} },
          totalAmount: { $sum: "$total" },
        },
      },
      {
        $project: {
          paymentMethod: "$_id",
          count: 1,
          totalAmount: 1,
        },
      },
    ])
  }

  private async getRevenueBreakdown(matchQuery: any) {
    return this.transactionModel.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
          totalTax: { $sum: "$tax" },
          totalDiscount: { $sum: "$discount" },
          netRevenue: { $sum: { $subtract: ["$total", "$tax"] } },
        },
      },
    ])
  }

  private async getExpenseBreakdown(matchQuery: any) {
    // This would typically come from a separate expenses collection
    // For now, we'll calculate cost of goods sold from transactions
    return this.transactionModel.aggregate([
      { $match: matchQuery },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: null,
          costOfGoodsSold: {
            $sum: { $multiply: ["$items.quantity", "$product.costPrice"] },
          },
        },
      },
    ])
  }

  private async getProfitLossStatement(matchQuery: any) {
    const [revenue, expenses] = await Promise.all([
      this.getRevenueBreakdown(matchQuery),
      this.getExpenseBreakdown(matchQuery),
    ])

    const totalRevenue = revenue[0]?.totalRevenue || 0
    const costOfGoodsSold = expenses[0]?.costOfGoodsSold || 0
    const grossProfit = totalRevenue - costOfGoodsSold
    const netProfit = grossProfit // Simplified - would include operating expenses

    return {
      totalRevenue,
      costOfGoodsSold,
      grossProfit,
      netProfit,
      profitMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
    }
  }
}
