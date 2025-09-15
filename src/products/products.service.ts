import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Product, type ProductDocument } from "../common/schemas/product.schema"
import { Outlet, type OutletDocument } from "../common/schemas/outlet.schema"
import type { CreateProductDto } from "./dto/create-product.dto"
import type { UpdateProductDto } from "./dto/update-product.dto"
import type { StockAdjustmentDto } from "./dto/stock-adjustment.dto"

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Outlet.name) private outletModel: Model<OutletDocument>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productModel.findOne({
      barcode: createProductDto.barcode,
    })

    if (existingProduct) {
      throw new BadRequestException("Product with this barcode already exists")
    }

    const product = new this.productModel(createProductDto)
    return product.save()
  }

  async findAll(outletId?: string, category?: string, search?: string) {
    const query: any = { isActive: true }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { barcode: { $regex: search, $options: "i" } },
        { manufacturer: { $regex: search, $options: "i" } },
      ]
    }

    let products = await this.productModel.find(query).populate("supplier").sort({ name: 1 })

    if (outletId) {
      products = products.map((product) => {
        const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)
        return {
          ...product.toObject(),
          currentStock: outletInventory?.quantity || 0,
          reorderPoint: outletInventory?.reorderPoint || 0,
        }
      })
    }

    return products
  }

  async findByBarcode(barcode: string, outletId?: string) {
    const product = await this.productModel
      .findOne({
        barcode,
        isActive: true,
      })
      .populate("supplier")

    if (!product) {
      throw new NotFoundException("Product not found")
    }

    if (outletId) {
      const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)
      return {
        ...product.toObject(),
        currentStock: outletInventory?.quantity || 0,
        reorderPoint: outletInventory?.reorderPoint || 0,
      }
    }

    return product
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).populate("supplier")
    if (!product) {
      throw new NotFoundException("Product not found")
    }
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).populate("supplier")

    if (!product) {
      throw new NotFoundException("Product not found")
    }
    return product
  }

  async adjustStock(productId: string, adjustmentDto: StockAdjustmentDto | { outletId: string; quantity: number; adjustmentType: "add" | "subtract"; reason: string }) {
    const product = await this.productModel.findById(productId)
    if (!product) {
      throw new NotFoundException("Product not found")
    }

    const { outletId, quantity, reason, adjustmentType } = adjustmentDto

    const inventoryIndex = product.inventory.findIndex((inv) => inv.outlet.toString() === outletId)

    if (inventoryIndex === -1) {
      // Create new inventory entry for this outlet
      product.inventory.push({
        outlet: outletId as any,
        quantity: adjustmentType === "add" ? quantity : 0,
        reorderPoint: 10, // Default reorder point
        lastUpdated: new Date(),
      })
    } else {
      // Update existing inventory
      const currentQuantity = product.inventory[inventoryIndex].quantity

      if (adjustmentType === "add") {
        product.inventory[inventoryIndex].quantity = currentQuantity + quantity
      } else if (adjustmentType === "subtract") {
        const newQuantity = currentQuantity - quantity
        if (newQuantity < 0) {
          throw new BadRequestException("Insufficient stock")
        }
        product.inventory[inventoryIndex].quantity = newQuantity
      } else {
        product.inventory[inventoryIndex].quantity = quantity
      }

      product.inventory[inventoryIndex].lastUpdated = new Date()
    }

    await product.save()

    // Log the adjustment (you would typically save this to an audit trail)
    console.log(`Stock adjustment: ${reason} - ${adjustmentType} ${quantity} for product ${product.name}`)

    return product
  }

  async getLowStockProducts(outletId: string) {
    const products = await this.productModel.find({ isActive: true })

    const lowStockProducts = products.filter((product) => {
      const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)

      if (!outletInventory) return false

      return outletInventory.quantity <= outletInventory.reorderPoint
    })

    return lowStockProducts.map((product) => {
      const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)
      return {
        ...product.toObject(),
        currentStock: outletInventory?.quantity || 0,
        reorderPoint: outletInventory?.reorderPoint || 0,
      }
    })
  }

  async getExpiringProducts(outletId: string, days = 30) {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + days)

    const products = await this.productModel.find({
      isActive: true,
      expiryDate: { $lte: futureDate, $gte: new Date() },
    })

    return products
      .filter((product) => {
        const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)
        return outletInventory && outletInventory.quantity > 0
      })
      .map((product) => {
        const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId)
        return {
          ...product.toObject(),
          currentStock: outletInventory?.quantity || 0,
          daysToExpiry: Math.ceil((product.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
        }
      })
  }

  async getCategories() {
    const categories = await this.productModel.distinct("category", { isActive: true })
    return categories.sort()
  }

  async getProductTypes() {
    const types = await this.productModel.distinct("productType", { isActive: true })
    return types.sort()
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndUpdate(id, { isActive: false }, { new: true })

    if (!product) {
      throw new NotFoundException("Product not found")
    }
    return product
  }

  async createStockAdjustment(
    productId: string,
    adjustmentDto: {
      outletId: string
      quantity: number
      adjustmentType: "add" | "subtract"
      reason: string
    }
  ) {
    return this.adjustStock(productId, adjustmentDto)
  }

  async getStockAdjustmentHistory(productId?: string, outletId?: string) {
    // This would typically query a stock_adjustments collection
    // For now, returning a mock structure that matches what the frontend expects
    const mockHistory = [
      {
        id: "1",
        productId: productId || "mock-product-1",
        productName: "Sample Product",
        outletId: outletId || "mock-outlet-1",
        outletName: "Main Store",
        previousQuantity: 100,
        newQuantity: 150,
        adjustmentQuantity: 50,
        adjustmentType: "add" as const,
        reason: "Stock replenishment",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        adjustedBy: "Admin User"
      },
      {
        id: "2",
        productId: productId || "mock-product-2",
        productName: "Another Product",
        outletId: outletId || "mock-outlet-1",
        outletName: "Main Store",
        previousQuantity: 75,
        newQuantity: 70,
        adjustmentQuantity: 5,
        adjustmentType: "subtract" as const,
        reason: "Damaged goods",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        adjustedBy: "Manager User"
      }
    ]

    // Filter by productId and outletId if provided
    return mockHistory.filter(adjustment => {
      if (productId && adjustment.productId !== productId) return false
      if (outletId && adjustment.outletId !== outletId) return false
      return true
    })
  }
}
