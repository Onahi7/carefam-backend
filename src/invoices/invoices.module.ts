import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { InvoicesService } from "./invoices.service"
import { InvoicesController } from "./invoices.controller"
import { Invoice, InvoiceSchema } from "../common/schemas/invoice.schema"
import { Customer, CustomerSchema } from "../common/schemas/customer.schema"
import { Product, ProductSchema } from "../common/schemas/product.schema"
import { CustomersModule } from "../customers/customers.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Product.name, schema: ProductSchema }
    ]),
    CustomersModule
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService]
})
export class InvoicesModule {}