import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { SuppliersService } from "./suppliers.service"
import { SuppliersController } from "./suppliers.controller"
import { Supplier, SupplierSchema } from "../common/schemas/supplier.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema }])],
  providers: [SuppliersService],
  controllers: [SuppliersController],
  exports: [SuppliersService],
})
export class SuppliersModule {}
