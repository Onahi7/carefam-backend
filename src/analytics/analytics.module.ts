import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AnalyticsService } from "./analytics.service"
import { AnalyticsController } from "./analytics.controller"
import { Transaction, TransactionSchema } from "../common/schemas/transaction.schema"
import { Product, ProductSchema } from "../common/schemas/product.schema"
import { User, UserSchema } from "../common/schemas/user.schema"
import { Outlet, OutletSchema } from "../common/schemas/outlet.schema"
import { Supplier, SupplierSchema } from "../common/schemas/supplier.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Outlet.name, schema: OutletSchema },
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
