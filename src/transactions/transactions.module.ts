import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { TransactionsService } from "./transactions.service"
import { TransactionsController } from "./transactions.controller"
import { Transaction, TransactionSchema } from "../common/schemas/transaction.schema"
import { Product, ProductSchema } from "../common/schemas/product.schema"
import { User, UserSchema } from "../common/schemas/user.schema"
import { Outlet, OutletSchema } from "../common/schemas/outlet.schema"
import { ProductsModule } from "../products/products.module"
import { OutletsModule } from "../outlets/outlets.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Outlet.name, schema: OutletSchema },
    ]),
    ProductsModule,
    OutletsModule,
    AuthModule,
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
