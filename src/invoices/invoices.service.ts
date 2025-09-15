import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Invoice, InvoiceDocument, InvoiceType, InvoiceStatus, PaymentMethod } from "../common/schemas/invoice.schema"
import { Customer, CustomerDocument, CustomerType } from "../common/schemas/customer.schema"
import { Product, ProductDocument } from "../common/schemas/product.schema"
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceFilterDto, AddPaymentDto } from "./dto/invoice.dto"
import { CustomersService } from "../customers/customers.service"

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private customersService: CustomersService
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, userId: string): Promise<Invoice> {
    // Validate customer exists
    const customer = await this.customerModel.findById(createInvoiceDto.customer)
    if (!customer) {
      throw new NotFoundException("Customer not found")
    }

    // Validate products exist and calculate totals
    const calculatedInvoice = await this.calculateInvoiceTotals(createInvoiceDto)

    // Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber(createInvoiceDto.invoiceType)

    // Set due date for credit sales
    let dueDate: Date | undefined
    if (createInvoiceDto.isCreditSale && customer.customerType === CustomerType.B2B) {
      const dueDateCalc = new Date(createInvoiceDto.issueDate)
      dueDateCalc.setDate(dueDateCalc.getDate() + (customer.creditTermDays || 30))
      dueDate = dueDateCalc
    }

    // Check credit limit for B2B credit sales
    if (createInvoiceDto.isCreditSale && customer.customerType === CustomerType.B2B) {
      const newCreditBalance = customer.currentCreditBalance + calculatedInvoice.totalAmount
      if (newCreditBalance > customer.creditLimit) {
        throw new BadRequestException(
          `Credit limit exceeded. Available credit: ${customer.creditLimit - customer.currentCreditBalance}`
        )
      }
    }

    const invoice = new this.invoiceModel({
      ...calculatedInvoice,
      invoiceNumber,
      dueDate,
      amountDue: calculatedInvoice.totalAmount,
      createdBy: userId,
      lastModifiedBy: userId
    })

    const savedInvoice = await invoice.save()

    // Update customer credit balance for credit sales
    if (createInvoiceDto.isCreditSale && customer.customerType === CustomerType.B2B) {
      await this.customersService.updateCreditBalance(
        customer._id.toString(),
        calculatedInvoice.totalAmount
      )
    }

    return savedInvoice
  }

  async findAll(filterDto: InvoiceFilterDto): Promise<{ invoices: Invoice[], total: number }> {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      invoiceType,
      customer,
      outlet,
      startDate,
      endDate,
      search
    } = filterDto

    const query: any = {}

    if (status) {
      query.status = status
    }

    if (invoiceType) {
      query.invoiceType = invoiceType
    }

    if (customer) {
      query.customer = customer
    }

    if (outlet) {
      query.outlet = outlet
    }

    if (startDate || endDate) {
      query.issueDate = {}
      if (startDate) {
        query.issueDate.$gte = new Date(startDate)
      }
      if (endDate) {
        query.issueDate.$lte = new Date(endDate)
      }
    }

    if (search) {
      query.$or = [
        { invoiceNumber: { $regex: search, $options: "i" } },
        { purchaseOrderNumber: { $regex: search, $options: "i" } }
      ]
    }

    const skip = (page - 1) * limit

    const [invoices, total] = await Promise.all([
      this.invoiceModel
        .find(query)
        .populate("customer", "name businessName customerType")
        .populate("outlet", "name location")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.invoiceModel.countDocuments(query)
    ])

    return { invoices, total }
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel
      .findById(id)
      .populate("customer")
      .populate("outlet", "name location")
      .populate("createdBy", "name email")
      .populate("approvedBy", "name email")
      .populate("lastModifiedBy", "name email")
      .populate("items.product")
      .exec()

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`)
    }

    return invoice
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto, userId: string): Promise<Invoice> {
    const invoice = await this.findOne(id)

    // Only allow updates for draft invoices
    if (invoice.status !== InvoiceStatus.DRAFT) {
      throw new BadRequestException("Only draft invoices can be updated")
    }

    // Recalculate totals if items changed
    let calculatedData = updateInvoiceDto
    if (updateInvoiceDto.items) {
      calculatedData = await this.calculateInvoiceTotals(updateInvoiceDto as CreateInvoiceDto)
    }

    const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(
      id,
      { 
        ...calculatedData, 
        lastModifiedBy: userId 
      },
      { new: true, runValidators: true }
    )
    .populate("customer")
    .populate("outlet", "name location")
    .populate("items.product")
    .exec()

    return updatedInvoice
  }

  async approve(id: string, userId: string): Promise<Invoice> {
    const invoice = await this.findOne(id)

    if (invoice.status !== InvoiceStatus.DRAFT && invoice.status !== InvoiceStatus.PENDING) {
      throw new BadRequestException("Only draft or pending invoices can be approved")
    }

    const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(
      id,
      {
        status: InvoiceStatus.APPROVED,
        approvedBy: userId,
        approvedDate: new Date(),
        lastModifiedBy: userId
      },
      { new: true }
    )
    .populate("customer")
    .populate("outlet", "name location")
    .exec()

    return updatedInvoice
  }

  async addPayment(id: string, addPaymentDto: AddPaymentDto, userId: string): Promise<Invoice> {
    const invoice = await this.findOne(id)

    if (invoice.status === InvoiceStatus.PAID || invoice.status === InvoiceStatus.CANCELLED) {
      throw new BadRequestException("Cannot add payment to this invoice")
    }

    const { amount, paymentMethod, paymentReference, paymentNotes } = addPaymentDto

    if (amount <= 0) {
      throw new BadRequestException("Payment amount must be greater than zero")
    }

    if (amount > invoice.amountDue) {
      throw new BadRequestException("Payment amount cannot exceed amount due")
    }

    const paymentRecord = {
      amount,
      paymentMethod,
      paymentDate: new Date(),
      paymentReference,
      paymentNotes,
      recordedBy: userId
    }

    const newAmountPaid = invoice.amountPaid + amount
    const newAmountDue = invoice.totalAmount - newAmountPaid

    let newStatus: InvoiceStatus = invoice.status as InvoiceStatus
    if (newAmountDue === 0) {
      newStatus = InvoiceStatus.PAID
    } else if (newAmountPaid > 0) {
      newStatus = InvoiceStatus.PARTIALLY_PAID
    }

    const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(
      id,
      {
        $push: { payments: paymentRecord },
        amountPaid: newAmountPaid,
        amountDue: newAmountDue,
        status: newStatus,
        lastModifiedBy: userId
      },
      { new: true }
    )
    .populate("customer")
    .populate("outlet", "name location")
    .exec()

    // Update customer credit balance for credit sales
    if (invoice.isCreditSale) {
      await this.customersService.updateCreditBalance(
        invoice.customer._id.toString(),
        -amount // Reduce credit balance
      )
    }

    return updatedInvoice
  }

  async cancel(id: string, userId: string): Promise<Invoice> {
    const invoice = await this.findOne(id)

    if (invoice.status === InvoiceStatus.PAID || invoice.status === InvoiceStatus.CANCELLED) {
      throw new BadRequestException("Cannot cancel this invoice")
    }

    // If it's a credit sale, reverse the credit balance
    if (invoice.isCreditSale && invoice.amountPaid === 0) {
      await this.customersService.updateCreditBalance(
        invoice.customer._id.toString(),
        -invoice.totalAmount
      )
    }

    const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(
      id,
      {
        status: InvoiceStatus.CANCELLED,
        lastModifiedBy: userId
      },
      { new: true }
    )
    .populate("customer")
    .populate("outlet", "name location")
    .exec()

    return updatedInvoice
  }

  async convertProformaToInvoice(proformaId: string, userId: string): Promise<Invoice> {
    const proforma = await this.findOne(proformaId)

    if (proforma.invoiceType !== InvoiceType.PROFORMA) {
      throw new BadRequestException("Only proforma invoices can be converted")
    }

    if (proforma.status !== InvoiceStatus.APPROVED) {
      throw new BadRequestException("Proforma must be approved before conversion")
    }

    // Create new invoice based on proforma
    const invoiceData = {
      ...(proforma as any).toObject(),
      invoiceType: InvoiceType.INVOICE,
      status: InvoiceStatus.PENDING,
      proformaInvoice: (proforma as any)._id,
      createdBy: userId,
      lastModifiedBy: userId
    }

    delete invoiceData._id
    delete invoiceData.createdAt
    delete invoiceData.updatedAt
    delete invoiceData.invoiceNumber

    const invoiceNumber = await this.generateInvoiceNumber(InvoiceType.INVOICE)
    invoiceData.invoiceNumber = invoiceNumber

    const invoice = new this.invoiceModel(invoiceData)
    return invoice.save()
  }

  private async calculateInvoiceTotals(invoiceData: CreateInvoiceDto): Promise<any> {
    let subtotal = 0

    // Calculate line totals
    const calculatedItems = []
    for (const item of invoiceData.items) {
      const product = await this.productModel.findById(item.product)
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.product} not found`)
      }

      const lineTotal = (item.quantity * item.unitPrice) * (1 - (item.discountPercentage || 0) / 100)
      calculatedItems.push({
        ...item,
        productName: product.name,
        lineTotal
      })
      subtotal += lineTotal
    }

    // Apply invoice-level discount
    const discountAmount = subtotal * ((invoiceData.discountPercentage || 0) / 100)
    const discountedSubtotal = subtotal - discountAmount

    // Calculate taxes
    const taxes = invoiceData.taxes || []
    let totalTaxAmount = 0
    const calculatedTaxes = taxes.map(tax => {
      const taxableAmount = tax.taxableAmount || discountedSubtotal
      const taxAmount = taxableAmount * (tax.taxRate / 100)
      totalTaxAmount += taxAmount
      return {
        ...tax,
        taxableAmount,
        taxAmount
      }
    })

    const totalAmount = discountedSubtotal + totalTaxAmount

    return {
      ...invoiceData,
      items: calculatedItems,
      subtotal,
      discountAmount,
      taxes: calculatedTaxes,
      totalTaxAmount,
      totalAmount
    }
  }

  private async generateInvoiceNumber(invoiceType: InvoiceType): Promise<string> {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")

    let prefix = ""
    switch (invoiceType) {
      case InvoiceType.PROFORMA:
        prefix = "PF"
        break
      case InvoiceType.INVOICE:
        prefix = "INV"
        break
      case InvoiceType.CREDIT_NOTE:
        prefix = "CN"
        break
      case InvoiceType.DEBIT_NOTE:
        prefix = "DN"
        break
    }

    const baseNumber = `${prefix}${year}${month}`
    
    // Find the highest number for this month and type
    const lastInvoice = await this.invoiceModel
      .findOne({
        invoiceNumber: { $regex: `^${baseNumber}` },
        invoiceType
      })
      .sort({ invoiceNumber: -1 })
      .exec()

    let sequence = 1
    if (lastInvoice) {
      const lastSequence = parseInt(lastInvoice.invoiceNumber.slice(-4))
      sequence = lastSequence + 1
    }

    return `${baseNumber}${String(sequence).padStart(4, "0")}`
  }

  async getInvoicesByCustomer(customerId: string): Promise<Invoice[]> {
    return this.invoiceModel
      .find({ customer: customerId })
      .populate("outlet", "name location")
      .sort({ createdAt: -1 })
      .exec()
  }

  async getOverdueInvoices(): Promise<Invoice[]> {
    const today = new Date()
    return this.invoiceModel
      .find({
        status: { $in: [InvoiceStatus.APPROVED, InvoiceStatus.SENT, InvoiceStatus.PARTIALLY_PAID] },
        dueDate: { $lt: today },
        amountDue: { $gt: 0 }
      })
      .populate("customer", "name businessName")
      .populate("outlet", "name location")
      .sort({ dueDate: 1 })
      .exec()
  }
}