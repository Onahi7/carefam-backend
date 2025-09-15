import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ProductsService } from "./products.service"
import { ProductsController } from "./products.controller"
import { Product, ProductSchema } from "../common/schemas/product.schema"
import { Outlet, OutletSchema } from "../common/schemas/outlet.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Outlet.name, schema: OutletSchema },
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
