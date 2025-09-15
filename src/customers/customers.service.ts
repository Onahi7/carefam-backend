import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Customer, CustomerDocument, CustomerType, CreditStatus } from "../common/schemas/customer.schema"
import { CreateCustomerDto, UpdateCustomerDto, CustomerFilterDto } from "./dto/customer.dto"

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
  ) {}

  async create(createCustomerDto: CreateCustomerDto, userId: string): Promise<Customer> {
    // Validate business requirements
    if (createCustomerDto.customerType === CustomerType.B2B) {
      if (!createCustomerDto.businessName) {
        throw new BadRequestException("Business name is required for B2B customers")
      }
      if (!createCustomerDto.businessRegistrationNumber) {
        throw new BadRequestException("Business registration number is required for B2B customers")
      }
    }

    // Check for duplicate phone number
    if (createCustomerDto.phone) {
      const existingCustomer = await this.customerModel.findOne({ 
        phone: createCustomerDto.phone,
        isActive: true 
      })
      if (existingCustomer) {
        throw new BadRequestException("A customer with this phone number already exists")
      }
    }

    // Check for duplicate email
    if (createCustomerDto.email) {
      const existingCustomer = await this.customerModel.findOne({ 
        email: createCustomerDto.email,
        isActive: true 
      })
      if (existingCustomer) {
        throw new BadRequestException("A customer with this email already exists")
      }
    }

    // Check for duplicate business registration number
    if (createCustomerDto.businessRegistrationNumber) {
      const existingCustomer = await this.customerModel.findOne({ 
        businessRegistrationNumber: createCustomerDto.businessRegistrationNumber,
        isActive: true 
      })
      if (existingCustomer) {
        throw new BadRequestException("A customer with this business registration number already exists")
      }
    }

    const customer = new this.customerModel({
      ...createCustomerDto,
      createdBy: userId,
      lastModifiedBy: userId
    })

    return customer.save()
  }

  async findAll(filterDto: CustomerFilterDto): Promise<{ customers: Customer[], total: number }> {
    const { 
      page = 1, 
      limit = 10, 
      customerType, 
      creditStatus, 
      assignedOutlet,
      search,
      isActive = true 
    } = filterDto

    const query: any = { isActive }

    if (customerType) {
      query.customerType = customerType
    }

    if (creditStatus) {
      query.creditStatus = creditStatus
    }

    if (assignedOutlet) {
      query.assignedOutlet = assignedOutlet
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { businessName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { businessRegistrationNumber: { $regex: search, $options: "i" } }
      ]
    }

    const skip = (page - 1) * limit

    const [customers, total] = await Promise.all([
      this.customerModel
        .find(query)
        .populate("assignedOutlet", "name location")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.customerModel.countDocuments(query)
    ])

    return { customers, total }
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel
      .findById(id)
      .populate("assignedOutlet", "name location")
      .populate("createdBy", "name email")
      .populate("lastModifiedBy", "name email")
      .populate("creditApprovedBy", "name email")
      .exec()

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`)
    }

    return customer
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto, userId: string): Promise<Customer> {
    const customer = await this.findOne(id)

    // Validate business requirements for B2B customers
    if (updateCustomerDto.customerType === CustomerType.B2B || customer.customerType === CustomerType.B2B) {
      if (updateCustomerDto.customerType === CustomerType.B2B) {
        if (!updateCustomerDto.businessName && !customer.businessName) {
          throw new BadRequestException("Business name is required for B2B customers")
        }
        if (!updateCustomerDto.businessRegistrationNumber && !customer.businessRegistrationNumber) {
          throw new BadRequestException("Business registration number is required for B2B customers")
        }
      }
    }

    // Check for duplicate phone number (excluding current customer)
    if (updateCustomerDto.phone && updateCustomerDto.phone !== customer.phone) {
      const existingCustomer = await this.customerModel.findOne({ 
        phone: updateCustomerDto.phone,
        _id: { $ne: id },
        isActive: true 
      })
      if (existingCustomer) {
        throw new BadRequestException("A customer with this phone number already exists")
      }
    }

    // Check for duplicate email (excluding current customer)
    if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
      const existingCustomer = await this.customerModel.findOne({ 
        email: updateCustomerDto.email,
        _id: { $ne: id },
        isActive: true 
      })
      if (existingCustomer) {
        throw new BadRequestException("A customer with this email already exists")
      }
    }

    // Check for duplicate business registration number (excluding current customer)
    if (updateCustomerDto.businessRegistrationNumber && 
        updateCustomerDto.businessRegistrationNumber !== customer.businessRegistrationNumber) {
      const existingCustomer = await this.customerModel.findOne({ 
        businessRegistrationNumber: updateCustomerDto.businessRegistrationNumber,
        _id: { $ne: id },
        isActive: true 
      })
      if (existingCustomer) {
        throw new BadRequestException("A customer with this business registration number already exists")
      }
    }

    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      { 
        ...updateCustomerDto, 
        lastModifiedBy: userId 
      },
      { new: true, runValidators: true }
    )
    .populate("assignedOutlet", "name location")
    .populate("createdBy", "name email")
    .populate("lastModifiedBy", "name email")
    .populate("creditApprovedBy", "name email")
    .exec()

    return updatedCustomer
  }

  async updateCreditLimit(
    customerId: string, 
    newCreditLimit: number, 
    approvedBy: string
  ): Promise<Customer> {
    const customer = await this.findOne(customerId)

    if (customer.customerType !== CustomerType.B2B) {
      throw new BadRequestException("Credit limits can only be set for B2B customers")
    }

    if (newCreditLimit < 0) {
      throw new BadRequestException("Credit limit cannot be negative")
    }

    // Check if new limit is below current balance
    if (newCreditLimit < customer.currentCreditBalance) {
      throw new BadRequestException(
        `New credit limit (${newCreditLimit}) cannot be less than current credit balance (${customer.currentCreditBalance})`
      )
    }

    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      customerId,
      {
        creditLimit: newCreditLimit,
        creditApprovedBy: approvedBy,
        creditApprovedDate: new Date(),
        lastModifiedBy: approvedBy
      },
      { new: true, runValidators: true }
    )
    .populate("assignedOutlet", "name location")
    .populate("creditApprovedBy", "name email")
    .exec()

    return updatedCustomer
  }

  async updateCreditBalance(customerId: string, amount: number): Promise<Customer> {
    const customer = await this.customerModel.findByIdAndUpdate(
      customerId,
      { 
        $inc: { currentCreditBalance: amount },
        $set: { lastModifiedBy: customerId } // This should be set by the calling service
      },
      { new: true, runValidators: true }
    ).exec()

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`)
    }

    // Update credit status based on balance and terms
    await this.updateCreditStatus(customer)

    return customer
  }

  async updateCreditStatus(customer: Customer): Promise<void> {
    let newStatus = customer.creditStatus

    // Determine credit status based on balance and payment history
    if (customer.currentCreditBalance > customer.creditLimit) {
      newStatus = CreditStatus.SUSPENDED
    } else if (customer.currentCreditBalance > 0) {
      // Check for overdue invoices (this would require invoice service integration)
      // For now, we'll keep the existing status if balance is positive but within limit
      if (customer.creditStatus === CreditStatus.BLOCKED) {
        newStatus = CreditStatus.OVERDUE
      }
    } else {
      newStatus = CreditStatus.GOOD
    }

    if (newStatus !== customer.creditStatus) {
      await this.customerModel.findByIdAndUpdate(
        (customer as any)._id,
        { creditStatus: newStatus }
      ).exec()
    }
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id)
    
    // Soft delete - mark as inactive instead of removing
    await this.customerModel.findByIdAndUpdate(
      id,
      { isActive: false }
    ).exec()
  }

  async getCustomersByOutlet(outletId: string): Promise<Customer[]> {
    return this.customerModel
      .find({ 
        assignedOutlet: outletId,
        isActive: true 
      })
      .sort({ name: 1 })
      .exec()
  }

  async getCreditCustomers(): Promise<Customer[]> {
    return this.customerModel
      .find({ 
        customerType: CustomerType.B2B,
        creditLimit: { $gt: 0 },
        isActive: true 
      })
      .populate("assignedOutlet", "name location")
      .sort({ name: 1 })
      .exec()
  }

  async getOverdueCustomers(): Promise<Customer[]> {
    return this.customerModel
      .find({ 
        creditStatus: { $in: [CreditStatus.OVERDUE, CreditStatus.SUSPENDED] },
        isActive: true 
      })
      .populate("assignedOutlet", "name location")
      .sort({ currentCreditBalance: -1 })
      .exec()
  }
}