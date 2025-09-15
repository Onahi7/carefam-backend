import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { Supplier, type SupplierDocument } from "../common/schemas/supplier.schema"
import type { CreateSupplierDto } from "./dto/create-supplier.dto"
import type { UpdateSupplierDto } from "./dto/update-supplier.dto"

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const existingSupplier = await this.supplierModel.findOne({
      $or: [{ email: createSupplierDto.email }, { phone: createSupplierDto.phone }],
    })

    if (existingSupplier) {
      throw new BadRequestException("Supplier with this email or phone already exists")
    }

    const supplier = new this.supplierModel(createSupplierDto)
    return supplier.save()
  }

  async findAll() {
    return this.supplierModel.find({ isActive: true }).sort({ name: 1 })
  }

  async findById(id: string) {
    const supplier = await this.supplierModel.findById(id)
    if (!supplier) {
      throw new NotFoundException("Supplier not found")
    }
    return supplier
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierModel.findByIdAndUpdate(id, updateSupplierDto, { new: true })

    if (!supplier) {
      throw new NotFoundException("Supplier not found")
    }
    return supplier
  }

  async updatePerformance(supplierId: string, orderValue: number, deliveryTime: number) {
    const supplier = await this.supplierModel.findById(supplierId)
    if (supplier) {
      supplier.performance.totalOrders += 1
      supplier.performance.totalValue += orderValue

      // Update average delivery time
      const currentAvg = supplier.performance.averageDeliveryTime
      const totalOrders = supplier.performance.totalOrders
      supplier.performance.averageDeliveryTime = (currentAvg * (totalOrders - 1) + deliveryTime) / totalOrders

      await supplier.save()
    }
  }

  async getTopSuppliers(limit = 10) {
    return this.supplierModel.find({ isActive: true }).sort({ "performance.totalValue": -1 }).limit(limit)
  }

  async delete(id: string) {
    const supplier = await this.supplierModel.findByIdAndUpdate(id, { isActive: false }, { new: true })

    if (!supplier) {
      throw new NotFoundException("Supplier not found")
    }
    return supplier
  }
}
