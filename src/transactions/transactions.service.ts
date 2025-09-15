import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Transaction, type TransactionDocument, TransactionType, TransactionStatus } from "../common/schemas/transaction.schema"
import { Product, type ProductDocument } from "../common/schemas/product.schema"
import { User, type UserDocument } from "../common/schemas/user.schema"
import { Outlet, type OutletDocument } from "../common/schemas/outlet.schema"
import type { CreateTransactionDto } from "./dto/create-transaction.dto"
import type { CreateBulkSaleDto } from "./dto/create-bulk-sale.dto"
import { ProductsService } from "../products/products.service"
import { OutletsService } from "../outlets/outlets.service"
import { AuthService } from "../auth/auth.service"

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Outlet.name) private outletModel: Model<OutletDocument>,
    private productsService: ProductsService,
    private outletsService: OutletsService,
    private authService: AuthService,
  ) {}

  async createSale(createTransactionDto: CreateTransactionDto, userId: string) {
    const { outletId, items, paymentMethod, customerName, customerPhone, notes } = createTransactionDto

    // Validate outlet exists
    const outlet = await this.outletModel.findById(outletId)
    if (!outlet) {
      throw new NotFoundException("Outlet not found")
    }

    // Validate user exists
    const user = await this.userModel.findById(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Validate stock availability and calculate totals
    let subtotal = 0
    const processedItems = []

    for (const item of items) {
      const product = await this.productModel.findById(item.productId)
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`)
      }

      // Check stock availability
      const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)

      if (!outletInventory || outletInventory.quantity < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`)
      }

      const unitPrice = product.retailPrice
      const totalPrice = unitPrice * item.quantity

      processedItems.push({
        product: product._id,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
        discount: item.discount || 0,
      })

      subtotal += totalPrice - (item.discount || 0)
    }

    // Calculate tax (Sierra Leone VAT is 15%)
    const tax = subtotal * 0.15
    const total = subtotal + tax

    // Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber(outletId)

    // Create transaction
    const transaction = new this.transactionModel({
      type: TransactionType.SALE,
      staff: userId,
      outlet: outletId,
      items: processedItems,
      subtotal,
      tax,
      total,
      paymentMethod,
      status: TransactionStatus.COMPLETED,
      customerName,
      customerPhone,
      notes,
      invoiceNumber,
    })

    await transaction.save()

    // Update inventory
    for (const item of items) {
      await this.productsService.adjustStock(item.productId, {
        outletId,
        quantity: item.quantity,
        adjustmentType: "subtract" as any,
        reason: `Sale - Invoice ${invoiceNumber}`,
      })
    }

    // Update user shift sales
    await this.authService.updateShiftSales(userId, total, paymentMethod)

    // Update outlet metrics
    await this.outletsService.updateMetrics(outletId, total)

    return transaction.populate(["staff", "outlet", "items.product"])
  }

  async createBulkSale(createBulkSaleDto: CreateBulkSaleDto, userId: string) {
    const { outletId, items, paymentMethod, customerName, customerPhone, notes, discount } = createBulkSaleDto

    // Validate outlet exists
    const outlet = await this.outletModel.findById(outletId)
    if (!outlet) {
      throw new NotFoundException("Outlet not found")
    }

    // Validate user has permission for bulk sales
    const user = await this.userModel.findById(userId)
    if (!user || !["admin", "manager"].includes(user.role)) {
      throw new BadRequestException("Insufficient permissions for bulk sales")
    }

    // Process items with wholesale pricing
    let subtotal = 0
    const processedItems = []

    for (const item of items) {
      const product = await this.productModel.findById(item.productId)
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`)
      }

      // Check stock availability
      const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)

      if (!outletInventory || outletInventory.quantity < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`)
      }

      // Use wholesale price for bulk sales
      const unitPrice = product.wholesalePrice
      const totalPrice = unitPrice * item.quantity

      processedItems.push({
        product: product._id,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
        discount: item.discount || 0,
      })

      subtotal += totalPrice - (item.discount || 0)
    }

    // Apply bulk discount
    const discountAmount = discount || 0
    const tax = (subtotal - discountAmount) * 0.15
    const total = subtotal - discountAmount + tax

    // Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber(outletId, "BULK")

    // Create bulk sale transaction
    const transaction = new this.transactionModel({
      type: TransactionType.BULK_SALE,
      staff: userId,
      outlet: outletId,
      items: processedItems,
      subtotal,
      tax,
      discount: discountAmount,
      total,
      paymentMethod,
      status: TransactionStatus.COMPLETED,
      customerName,
      customerPhone,
      notes,
      invoiceNumber,
    })

    await transaction.save()

    // Update inventory
    for (const item of items) {
      await this.productsService.adjustStock(item.productId, {
        outletId,
        quantity: item.quantity,
        adjustmentType: "subtract" as any,
        reason: `Bulk Sale - Invoice ${invoiceNumber}`,
      })
    }

    // Update user shift sales
    await this.authService.updateShiftSales(userId, total, paymentMethod)

    // Update outlet metrics
    await this.outletsService.updateMetrics(outletId, total)

    return transaction.populate(["staff", "outlet", "items.product"])
  }

  async findAll(outletId?: string, startDate?: Date, endDate?: Date, type?: TransactionType) {
    const query: any = {}

    if (outletId) {
      query.outlet = outletId
    }

    if (type) {
      query.type = type
    }

    if (startDate || endDate) {
      query.createdAt = {}
      if (startDate) query.createdAt.$gte = startDate
      if (endDate) query.createdAt.$lte = endDate
    }

    return this.transactionModel.find(query).populate(["staff", "outlet", "items.product"]).sort({ createdAt: -1 })
  }

  async findById(id: string) {
    const transaction = await this.transactionModel.findById(id).populate(["staff", "outlet", "items.product"])

    if (!transaction) {
      throw new NotFoundException("Transaction not found")
    }

    return transaction
  }

  async getTransactionsByStaff(staffId: string, outletId?: string) {
    const query: any = { staff: staffId }
    if (outletId) {
      query.outlet = outletId
    }

    return this.transactionModel.find(query).populate(["outlet", "items.product"]).sort({ createdAt: -1 })
  }

  async getDailySales(outletId: string, date: Date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const transactions = await this.transactionModel.find({
      outlet: outletId,
      status: TransactionStatus.COMPLETED,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    })

    const totalSales = transactions.reduce((sum, transaction) => sum + transaction.total, 0)
    const totalTransactions = transactions.length
    const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0

    return {
      date,
      totalSales,
      totalTransactions,
      averageTransaction,
      transactions,
    }
  }

  private async generateInvoiceNumber(outletId: string, prefix = "INV"): Promise<string> {
    const outlet = await this.outletModel.findById(outletId)
    const outletCode = outlet?.name.substring(0, 3).toUpperCase() || "POS"

    const today = new Date()
    const dateString = today.toISOString().slice(0, 10).replace(/-/g, "")

    // Get count of transactions today
    const startOfDay = new Date(today)
    startOfDay.setHours(0, 0, 0, 0)

    const count = await this.transactionModel.countDocuments({
      outlet: outletId,
      createdAt: { $gte: startOfDay },
    })

    return `${prefix}-${outletCode}-${dateString}-${String(count + 1).padStart(4, "0")}`
  }

  async cancelTransaction(id: string, reason: string) {
    const transaction = await this.transactionModel.findById(id)
    if (!transaction) {
      throw new NotFoundException("Transaction not found")
    }

    if (transaction.status === TransactionStatus.CANCELLED) {
      throw new BadRequestException("Transaction already cancelled")
    }

    // Restore inventory
    for (const item of transaction.items) {
      await this.productsService.adjustStock(item.product.toString(), {
        outletId: transaction.outlet.toString(),
        quantity: item.quantity,
        adjustmentType: "add" as any,
        reason: `Transaction cancelled - ${reason}`,
      })
    }

    transaction.status = TransactionStatus.CANCELLED
    transaction.notes = `${transaction.notes || ""}\nCancelled: ${reason}`

    await transaction.save()
    return transaction
  }

  async generateReceipt(transactionId: string) {
    const transaction = await this.transactionModel
      .findById(transactionId)
      .populate(["staff", "outlet", "items.product"])

    if (!transaction) {
      throw new NotFoundException("Transaction not found")
    }

    // Generate receipt data structure
    const receipt = {
      transactionId: transaction._id,
      invoiceNumber: transaction.invoiceNumber,
      outlet: {
        name: (transaction.outlet as any).name,
        address: (transaction.outlet as any).address,
        phone: (transaction.outlet as any).phone,
      },
      staff: {
        name: (transaction.staff as any).firstName + " " + (transaction.staff as any).lastName,
        id: (transaction.staff as any)._id,
      },
      customer: {
        name: transaction.customerName,
        phone: transaction.customerPhone,
      },
      items: transaction.items.map(item => ({
        name: (item.product as any).name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        discount: item.discount || 0,
      })),
      totals: {
        subtotal: transaction.subtotal,
        discount: transaction.discount || 0,
        tax: transaction.tax,
        total: transaction.total,
      },
      payment: {
        method: transaction.paymentMethod,
        status: transaction.status,
      },
      date: (transaction as any).createdAt,
      notes: transaction.notes,
    }

    return receipt
  }

  async getBulkSalesAnalytics(outletId?: string, startDate?: Date, endDate?: Date) {
    const query: any = { type: TransactionType.BULK_SALE }

    if (outletId) {
      query.outlet = outletId
    }

    if (startDate || endDate) {
      query.createdAt = {}
      if (startDate) query.createdAt.$gte = startDate
      if (endDate) query.createdAt.$lte = endDate
    }

    const bulkSales = await this.transactionModel.find(query).populate(["outlet", "staff"])

    const analytics = {
      totalBulkSales: bulkSales.length,
      totalRevenue: bulkSales.reduce((sum, sale) => sum + sale.total, 0),
      averageOrderValue: bulkSales.length > 0 
        ? bulkSales.reduce((sum, sale) => sum + sale.total, 0) / bulkSales.length 
        : 0,
      totalDiscount: bulkSales.reduce((sum, sale) => sum + (sale.discount || 0), 0),
      topCustomers: this.getTopBulkCustomers(bulkSales),
      salesByOutlet: this.groupBulkSalesByOutlet(bulkSales),
      salesByMonth: this.groupBulkSalesByMonth(bulkSales),
      recentBulkSales: bulkSales.slice(0, 10),
    }

    return analytics
  }

  private getTopBulkCustomers(bulkSales: TransactionDocument[]) {
    const customerMap = new Map()

    bulkSales.forEach(sale => {
      if (sale.customerName) {
        const existing = customerMap.get(sale.customerName) || {
          name: sale.customerName,
          phone: sale.customerPhone,
          totalOrders: 0,
          totalSpent: 0,
        }
        existing.totalOrders++
        existing.totalSpent += sale.total
        customerMap.set(sale.customerName, existing)
      }
    })

    return Array.from(customerMap.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10)
  }

  private groupBulkSalesByOutlet(bulkSales: TransactionDocument[]) {
    const outletMap = new Map()

    bulkSales.forEach(sale => {
      const outletName = (sale.outlet as any).name || "Unknown"
      const existing = outletMap.get(outletName) || {
        outlet: outletName,
        totalSales: 0,
        totalRevenue: 0,
      }
      existing.totalSales++
      existing.totalRevenue += sale.total
      outletMap.set(outletName, existing)
    })

    return Array.from(outletMap.values())
  }

  private groupBulkSalesByMonth(bulkSales: TransactionDocument[]) {
    const monthMap = new Map()

    bulkSales.forEach(sale => {
      const month = (sale as any).createdAt.toISOString().substring(0, 7) // YYYY-MM
      const existing = monthMap.get(month) || {
        month,
        totalSales: 0,
        totalRevenue: 0,
      }
      existing.totalSales++
      existing.totalRevenue += sale.total
      monthMap.set(month, existing)
    })

    return Array.from(monthMap.values()).sort((a, b) => a.month.localeCompare(b.month))
  }
}
