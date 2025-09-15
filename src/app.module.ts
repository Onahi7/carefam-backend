import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { ThrottlerModule } from "@nestjs/throttler"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { ProductsModule } from "./products/products.module"
import { OutletsModule } from "./outlets/outlets.module"
import { TransactionsModule } from "./transactions/transactions.module"
import { SuppliersModule } from "./suppliers/suppliers.module"
import { AnalyticsModule } from "./analytics/analytics.module"
import { CustomersModule } from "./customers/customers.module"
import { InvoicesModule } from "./invoices/invoices.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || "mongodb://localhost:27017/pharmacy-pos"),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    UsersModule,
    ProductsModule,
    OutletsModule,
    TransactionsModule,
    SuppliersModule,
    AnalyticsModule,
    CustomersModule,
    InvoicesModule,
  ],
})
export class AppModule {}
