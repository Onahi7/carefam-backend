import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { ShiftHistoryController } from "./shift-history.controller"
import { ShiftMigrationController } from "./shift-migration.controller"
import { ShiftHistoryService } from "./shift-history.service"
import { ShiftMigrationService } from "./shift-migration.service"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"
import { User, UserSchema } from "../common/schemas/user.schema"
import { ShiftHistory, ShiftHistorySchema } from "../common/schemas/shift-history.schema"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN", "7d"),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ShiftHistory.name, schema: ShiftHistorySchema }
    ]),
    UsersModule,
  ],
  providers: [AuthService, ShiftHistoryService, ShiftMigrationService, JwtStrategy, LocalStrategy],
  controllers: [AuthController, ShiftHistoryController, ShiftMigrationController],
  exports: [AuthService, ShiftHistoryService, ShiftMigrationService],
})
export class AuthModule {}
