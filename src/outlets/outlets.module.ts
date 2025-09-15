import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { OutletsService } from "./outlets.service"
import { OutletsController } from "./outlets.controller"
import { Outlet, OutletSchema } from "../common/schemas/outlet.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: Outlet.name, schema: OutletSchema }])],
  providers: [OutletsService],
  controllers: [OutletsController],
  exports: [OutletsService],
})
export class OutletsModule {}
