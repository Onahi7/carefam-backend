import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { User, UserSchema } from "../common/schemas/user.schema"
import { RolesGuard } from "../auth/guards/roles.guard"

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, RolesGuard],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
