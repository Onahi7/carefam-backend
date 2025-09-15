/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const throttler_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(7);
const users_module_1 = __webpack_require__(30);
const products_module_1 = __webpack_require__(33);
const outlets_module_1 = __webpack_require__(38);
const transactions_module_1 = __webpack_require__(43);
const suppliers_module_1 = __webpack_require__(47);
const analytics_module_1 = __webpack_require__(51);
const customers_module_1 = __webpack_require__(54);
const invoices_module_1 = __webpack_require__(59);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || "mongodb://localhost:27017/pharmacy-pos"),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            outlets_module_1.OutletsModule,
            transactions_module_1.TransactionsModule,
            suppliers_module_1.SuppliersModule,
            analytics_module_1.AnalyticsModule,
            customers_module_1.CustomersModule,
            invoices_module_1.InvoicesModule,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(9);
const config_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(5);
const auth_service_1 = __webpack_require__(10);
const auth_controller_1 = __webpack_require__(16);
const shift_history_controller_1 = __webpack_require__(20);
const shift_migration_controller_1 = __webpack_require__(24);
const shift_history_service_1 = __webpack_require__(14);
const shift_migration_service_1 = __webpack_require__(25);
const jwt_strategy_1 = __webpack_require__(26);
const local_strategy_1 = __webpack_require__(28);
const user_schema_1 = __webpack_require__(12);
const shift_history_schema_1 = __webpack_require__(15);
const users_module_1 = __webpack_require__(30);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get("JWT_SECRET"),
                    signOptions: {
                        expiresIn: configService.get("JWT_EXPIRES_IN", "7d"),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: shift_history_schema_1.ShiftHistory.name, schema: shift_history_schema_1.ShiftHistorySchema }
            ]),
            users_module_1.UsersModule,
        ],
        providers: [auth_service_1.AuthService, shift_history_service_1.ShiftHistoryService, shift_migration_service_1.ShiftMigrationService, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy],
        controllers: [auth_controller_1.AuthController, shift_history_controller_1.ShiftHistoryController, shift_migration_controller_1.ShiftMigrationController],
        exports: [auth_service_1.AuthService, shift_history_service_1.ShiftHistoryService, shift_migration_service_1.ShiftMigrationService],
    })
], AuthModule);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(8);
const bcrypt = __webpack_require__(11);
const user_schema_1 = __webpack_require__(12);
const shift_history_service_1 = __webpack_require__(14);
let AuthService = class AuthService {
    constructor(userModel, jwtService, shiftHistoryService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.shiftHistoryService = shiftHistoryService;
    }
    async validateUser(emailOrUsername, password) {
        const user = await this.userModel.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ],
            isActive: true
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const payload = {
            email: user.email,
            sub: user._id,
            role: user.role,
            outlets: user.assignedOutlets,
        };
        return {
            token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                assignedOutlets: user.assignedOutlets,
                currentShift: user.currentShift,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.userModel.findOne({
            $or: [
                { email: registerDto.email },
                { username: registerDto.username }
            ]
        });
        if (existingUser) {
            throw new common_1.BadRequestException("User with this email or username already exists");
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);
        const user = new this.userModel({
            ...registerDto,
            password: hashedPassword,
            assignedOutlets: registerDto.outletId ? [registerDto.outletId] : registerDto.assignedOutlets || [],
        });
        await user.save();
        const { password, ...result } = user.toObject();
        return result;
    }
    async startShift(userId, startShiftDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        if (user.currentShift?.status === user_schema_1.ShiftStatus.ACTIVE) {
            throw new common_1.BadRequestException("User already has an active shift");
        }
        user.currentShift = {
            status: user_schema_1.ShiftStatus.ACTIVE,
            startTime: new Date(),
            openingCash: startShiftDto.openingCash,
            totalSales: 0,
            cashSales: 0,
            cardSales: 0,
            mobileSales: 0,
            transactionCount: 0,
            totalCashIn: 0,
            totalCashOut: 0,
            expectedCash: startShiftDto.openingCash,
            notes: startShiftDto.notes
        };
        await user.save();
        return { message: "Shift started successfully", shift: user.currentShift };
    }
    async endShift(userId, endShiftDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        if (user.currentShift?.status !== user_schema_1.ShiftStatus.ACTIVE) {
            throw new common_1.BadRequestException("No active shift found");
        }
        const expectedCash = user.currentShift.openingCash +
            user.currentShift.cashSales +
            user.currentShift.totalCashIn -
            user.currentShift.totalCashOut;
        const variance = endShiftDto.actualCash - expectedCash;
        user.currentShift.status = user_schema_1.ShiftStatus.ENDED;
        user.currentShift.endTime = new Date();
        user.currentShift.expectedCash = expectedCash;
        user.currentShift.actualCash = endShiftDto.actualCash;
        user.currentShift.variance = variance;
        user.currentShift.notes = endShiftDto.notes;
        user.currentShift.managerApproval = endShiftDto.managerApproval;
        await this.shiftHistoryService.createShiftHistory(userId, user.currentShift);
        user.currentShift = undefined;
        await user.save();
        return {
            message: "Shift ended successfully",
            summary: {
                expectedCash,
                actualCash: endShiftDto.actualCash,
                variance
            }
        };
    }
    async updateShiftSales(userId, saleAmount, paymentMethod) {
        const user = await this.userModel.findById(userId);
        if (user && user.currentShift?.status === user_schema_1.ShiftStatus.ACTIVE) {
            user.currentShift.totalSales += saleAmount;
            user.currentShift.transactionCount += 1;
            switch (paymentMethod) {
                case 'cash':
                    user.currentShift.cashSales += saleAmount;
                    break;
                case 'card':
                    user.currentShift.cardSales += saleAmount;
                    break;
                case 'mobile':
                    user.currentShift.mobileSales += saleAmount;
                    break;
            }
            if (paymentMethod === 'cash') {
                user.currentShift.expectedCash += saleAmount;
            }
            await user.save();
        }
    }
    async addCashTransaction(userId, amount, type, reason) {
        const user = await this.userModel.findById(userId);
        if (user && user.currentShift?.status === user_schema_1.ShiftStatus.ACTIVE) {
            if (type === 'cash-in') {
                user.currentShift.totalCashIn += amount;
                user.currentShift.expectedCash += amount;
            }
            else {
                user.currentShift.totalCashOut += amount;
                user.currentShift.expectedCash -= amount;
            }
            await user.save();
        }
    }
    async getProfile(userId) {
        const user = await this.userModel.findById(userId).select("-password");
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof shift_history_service_1.ShiftHistoryService !== "undefined" && shift_history_service_1.ShiftHistoryService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = exports.ShiftStatus = exports.UserRole = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
var UserRole;
(function (UserRole) {
    UserRole["CASHIER"] = "cashier";
    UserRole["MANAGER"] = "manager";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var ShiftStatus;
(function (ShiftStatus) {
    ShiftStatus["ACTIVE"] = "active";
    ShiftStatus["ENDED"] = "ended";
})(ShiftStatus || (exports.ShiftStatus = ShiftStatus = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: UserRole }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: "Outlet" }] }),
    __metadata("design:type", Array)
], User.prototype, "assignedOutlets", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            status: { type: String, enum: ShiftStatus },
            startTime: Date,
            endTime: Date,
            openingCash: { type: Number, default: 0 },
            totalSales: { type: Number, default: 0 },
            cashSales: { type: Number, default: 0 },
            cardSales: { type: Number, default: 0 },
            mobileSales: { type: Number, default: 0 },
            transactionCount: { type: Number, default: 0 },
            totalCashIn: { type: Number, default: 0 },
            totalCashOut: { type: Number, default: 0 },
            expectedCash: { type: Number, default: 0 },
            actualCash: Number,
            variance: Number,
            notes: String,
            managerApproval: {
                managerId: String,
                managerName: String,
                timestamp: Date,
                approved: Boolean
            }
        },
    }),
    __metadata("design:type", Object)
], User.prototype, "currentShift", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShiftHistoryService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
const shift_history_schema_1 = __webpack_require__(15);
const user_schema_1 = __webpack_require__(12);
let ShiftHistoryService = class ShiftHistoryService {
    constructor(shiftHistoryModel, userModel) {
        this.shiftHistoryModel = shiftHistoryModel;
        this.userModel = userModel;
    }
    async createShiftHistory(userId, shiftData) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const shiftHistory = new this.shiftHistoryModel({
            userId,
            outletId: user.assignedOutlets?.[0],
            ...shiftData,
            completedAt: new Date()
        });
        return shiftHistory.save();
    }
    async getShiftHistory(filterDto) {
        const { userId, outletId, status, startDate, endDate, page = 1, limit = 10 } = filterDto;
        const query = {};
        if (userId)
            query.userId = userId;
        if (outletId)
            query.outletId = outletId;
        if (status)
            query.status = status;
        if (startDate || endDate) {
            query.startTime = {};
            if (startDate)
                query.startTime.$gte = new Date(startDate);
            if (endDate)
                query.startTime.$lte = new Date(endDate);
        }
        const skip = (page - 1) * limit;
        const [shifts, total] = await Promise.all([
            this.shiftHistoryModel
                .find(query)
                .populate("userId", "firstName lastName email role")
                .populate("outletId", "name location")
                .sort({ startTime: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.shiftHistoryModel.countDocuments(query)
        ]);
        return { shifts, total };
    }
    async getShiftById(shiftId) {
        const shift = await this.shiftHistoryModel
            .findById(shiftId)
            .populate("userId", "firstName lastName email role")
            .populate("outletId", "name location")
            .populate("managerApproval.managerId", "firstName lastName")
            .exec();
        if (!shift) {
            throw new Error("Shift not found");
        }
        return shift;
    }
    async getShiftStats(statsDto) {
        const { outletId, startDate, endDate, period } = statsDto;
        const matchStage = {
            status: shift_history_schema_1.ShiftStatus.ENDED
        };
        if (outletId)
            matchStage.outletId = outletId;
        if (startDate || endDate) {
            matchStage.startTime = {};
            if (startDate)
                matchStage.startTime.$gte = new Date(startDate);
            if (endDate)
                matchStage.startTime.$lte = new Date(endDate);
        }
        const stats = await this.shiftHistoryModel.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    totalShifts: { $sum: 1 },
                    totalSales: { $sum: "$totalSales" },
                    totalCashSales: { $sum: "$cashSales" },
                    totalCardSales: { $sum: "$cardSales" },
                    totalMobileSales: { $sum: "$mobileSales" },
                    totalTransactions: { $sum: "$transactionCount" },
                    totalVariance: { $sum: "$variance" },
                    averageShiftSales: { $avg: "$totalSales" },
                    averageTransactionsPerShift: { $avg: "$transactionCount" },
                    shiftsWithVariance: {
                        $sum: {
                            $cond: [{ $ne: ["$variance", 0] }, 1, 0]
                        }
                    },
                    largestVariance: { $max: { $abs: "$variance" } },
                    totalShiftDuration: {
                        $sum: {
                            $divide: [
                                { $subtract: ["$endTime", "$startTime"] },
                                1000 * 60 * 60
                            ]
                        }
                    }
                }
            }
        ]);
        const result = stats[0] || {
            totalShifts: 0,
            totalSales: 0,
            totalCashSales: 0,
            totalCardSales: 0,
            totalMobileSales: 0,
            totalTransactions: 0,
            totalVariance: 0,
            averageShiftSales: 0,
            averageTransactionsPerShift: 0,
            shiftsWithVariance: 0,
            largestVariance: 0,
            totalShiftDuration: 0
        };
        result.averageShiftDuration = result.totalShifts > 0 ? result.totalShiftDuration / result.totalShifts : 0;
        result.varianceRate = result.totalShifts > 0 ? (result.shiftsWithVariance / result.totalShifts) * 100 : 0;
        result.averageTransactionValue = result.totalTransactions > 0 ? result.totalSales / result.totalTransactions : 0;
        return result;
    }
    async getTopPerformers(outletId, period = "monthly") {
        const matchStage = {
            status: shift_history_schema_1.ShiftStatus.ENDED
        };
        if (outletId)
            matchStage.outletId = outletId;
        const now = new Date();
        if (period === "daily") {
            matchStage.startTime = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
        }
        else if (period === "weekly") {
            const weekStart = new Date(now.setDate(now.getDate() - 7));
            matchStage.startTime = { $gte: weekStart };
        }
        else if (period === "monthly") {
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            matchStage.startTime = { $gte: monthStart };
        }
        const performers = await this.shiftHistoryModel.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: "$userId",
                    totalShifts: { $sum: 1 },
                    totalSales: { $sum: "$totalSales" },
                    totalTransactions: { $sum: "$transactionCount" },
                    averageSales: { $avg: "$totalSales" },
                    totalVariance: { $sum: { $abs: "$variance" } }
                }
            },
            { $sort: { totalSales: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [
                        { $project: { firstName: 1, lastName: 1, email: 1, role: 1 } }
                    ]
                }
            },
            { $unwind: "$user" }
        ]);
        return performers;
    }
    async archiveOldShifts(daysOld = 365) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
        const result = await this.shiftHistoryModel.updateMany({
            endTime: { $lt: cutoffDate },
            isArchived: false
        }, { isArchived: true });
        return result.modifiedCount;
    }
};
exports.ShiftHistoryService = ShiftHistoryService;
exports.ShiftHistoryService = ShiftHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shift_history_schema_1.ShiftHistory.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], ShiftHistoryService);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShiftHistorySchema = exports.ShiftHistory = exports.ShiftStatus = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
var ShiftStatus;
(function (ShiftStatus) {
    ShiftStatus["ACTIVE"] = "active";
    ShiftStatus["ENDED"] = "ended";
    ShiftStatus["CANCELLED"] = "cancelled";
})(ShiftStatus || (exports.ShiftStatus = ShiftStatus = {}));
let ShiftHistory = class ShiftHistory {
};
exports.ShiftHistory = ShiftHistory;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], ShiftHistory.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Outlet", required: true }),
    __metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], ShiftHistory.prototype, "outletId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ShiftStatus }),
    __metadata("design:type", String)
], ShiftHistory.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ShiftHistory.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ShiftHistory.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "openingCash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "totalSales", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "cashSales", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "cardSales", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "mobileSales", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "transactionCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "totalCashIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "totalCashOut", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "expectedCash", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "actualCash", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ShiftHistory.prototype, "variance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShiftHistory.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            managerId: { type: mongoose_2.Types.ObjectId, ref: "User" },
            managerName: String,
            timestamp: Date,
            approved: Boolean,
            notes: String
        }
    }),
    __metadata("design:type", Object)
], ShiftHistory.prototype, "managerApproval", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ShiftHistory.prototype, "isArchived", void 0);
exports.ShiftHistory = ShiftHistory = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ShiftHistory);
exports.ShiftHistorySchema = mongoose_1.SchemaFactory.createForClass(ShiftHistory);
exports.ShiftHistorySchema.index({ userId: 1, startTime: -1 });
exports.ShiftHistorySchema.index({ outletId: 1, startTime: -1 });
exports.ShiftHistorySchema.index({ status: 1 });
exports.ShiftHistorySchema.index({ startTime: 1, endTime: 1 });


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async startShift(req, startShiftDto) {
        return this.authService.startShift(req.user.userId, startShiftDto);
    }
    async endShift(req, endShiftDto) {
        return this.authService.endShift(req.user.userId, endShiftDto);
    }
    async getProfile(req) {
        return this.authService.getProfile(req.user.userId);
    }
    async addCashTransaction(req, body) {
        return this.authService.addCashTransaction(req.user.userId, body.amount, body.type, body.reason);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("start-shift"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "startShift", null);
__decorate([
    (0, common_1.Post)('end-shift'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "endShift", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('cash-transaction'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "addCashTransaction", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(9);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(19);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.role?.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.ROLES_KEY = "roles";
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShiftHistoryController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(17);
const shift_history_service_1 = __webpack_require__(14);
const shift_filter_dto_1 = __webpack_require__(21);
let ShiftHistoryController = class ShiftHistoryController {
    constructor(shiftHistoryService) {
        this.shiftHistoryService = shiftHistoryService;
    }
    async getShiftHistory(filters, req) {
        const currentUserId = req.user.id;
        const userRole = req.user.role;
        const userId = (userRole === 'manager' || userRole === 'admin') ? filters.userId : currentUserId;
        return this.shiftHistoryService.getShiftHistory({
            ...filters,
            userId
        });
    }
    async getShiftStats(filters, req) {
        const currentUserId = req.user.id;
        const userRole = req.user.role;
        return this.shiftHistoryService.getShiftStats(filters);
    }
    async getTopPerformers(outletId, period = 'monthly', req) {
        const userRole = req?.user?.role;
        if (userRole !== 'manager' && userRole !== 'admin') {
            throw new Error('Unauthorized: Only managers and admins can view top performers');
        }
        return this.shiftHistoryService.getTopPerformers(outletId, period);
    }
    async getShiftById(shiftId, req) {
        const currentUserId = req.user.id;
        const userRole = req.user.role;
        const shift = await this.shiftHistoryService.getShiftById(shiftId);
        if (userRole !== 'manager' && userRole !== 'admin' && shift.userId.toString() !== currentUserId) {
            throw new Error('Unauthorized: You can only view your own shifts');
        }
        return shift;
    }
};
exports.ShiftHistoryController = ShiftHistoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof shift_filter_dto_1.ShiftFilterDto !== "undefined" && shift_filter_dto_1.ShiftFilterDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ShiftHistoryController.prototype, "getShiftHistory", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof shift_filter_dto_1.ShiftStatsDto !== "undefined" && shift_filter_dto_1.ShiftStatsDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], ShiftHistoryController.prototype, "getShiftStats", null);
__decorate([
    (0, common_1.Get)('top-performers'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('outletId')),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ShiftHistoryController.prototype, "getTopPerformers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShiftHistoryController.prototype, "getShiftById", null);
exports.ShiftHistoryController = ShiftHistoryController = __decorate([
    (0, common_1.Controller)('shift-history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof shift_history_service_1.ShiftHistoryService !== "undefined" && shift_history_service_1.ShiftHistoryService) === "function" ? _a : Object])
], ShiftHistoryController);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShiftStatsDto = exports.ShiftFilterDto = void 0;
const class_validator_1 = __webpack_require__(22);
const class_transformer_1 = __webpack_require__(23);
class ShiftFilterDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.ShiftFilterDto = ShiftFilterDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ShiftFilterDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ShiftFilterDto.prototype, "outletId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(["active", "ended", "cancelled"]),
    __metadata("design:type", String)
], ShiftFilterDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ShiftFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ShiftFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ShiftFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ShiftFilterDto.prototype, "limit", void 0);
class ShiftStatsDto {
    constructor() {
        this.period = "daily";
    }
}
exports.ShiftStatsDto = ShiftStatsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], ShiftStatsDto.prototype, "outletId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ShiftStatsDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ShiftStatsDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(["daily", "weekly", "monthly"]),
    __metadata("design:type", String)
], ShiftStatsDto.prototype, "period", void 0);


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShiftMigrationController = void 0;
const common_1 = __webpack_require__(2);
const shift_migration_service_1 = __webpack_require__(25);
const jwt_auth_guard_1 = __webpack_require__(17);
let ShiftMigrationController = class ShiftMigrationController {
    constructor(migrationService) {
        this.migrationService = migrationService;
    }
    async getMigrationStatus(req) {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            throw new Error('Unauthorized: Only admins can check migration status');
        }
        return this.migrationService.getMigrationStatus();
    }
    async migrateShiftData(req) {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            throw new Error('Unauthorized: Only admins can run migration');
        }
        return this.migrationService.migrateShiftData();
    }
    async validateMigration(req) {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            throw new Error('Unauthorized: Only admins can validate migration');
        }
        return this.migrationService.validateMigration();
    }
    async cleanupOldData(req) {
        const userRole = req.user.role;
        if (userRole !== 'admin') {
            throw new Error('Unauthorized: Only admins can cleanup old data');
        }
        return this.migrationService.cleanupOldShiftData();
    }
};
exports.ShiftMigrationController = ShiftMigrationController;
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShiftMigrationController.prototype, "getMigrationStatus", null);
__decorate([
    (0, common_1.Post)('migrate'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShiftMigrationController.prototype, "migrateShiftData", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShiftMigrationController.prototype, "validateMigration", null);
__decorate([
    (0, common_1.Post)('cleanup'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShiftMigrationController.prototype, "cleanupOldData", null);
exports.ShiftMigrationController = ShiftMigrationController = __decorate([
    (0, common_1.Controller)('shift-migration'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof shift_migration_service_1.ShiftMigrationService !== "undefined" && shift_migration_service_1.ShiftMigrationService) === "function" ? _a : Object])
], ShiftMigrationController);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ShiftMigrationService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShiftMigrationService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
const user_schema_1 = __webpack_require__(12);
const shift_history_schema_1 = __webpack_require__(15);
let ShiftMigrationService = ShiftMigrationService_1 = class ShiftMigrationService {
    constructor(userModel, shiftHistoryModel) {
        this.userModel = userModel;
        this.shiftHistoryModel = shiftHistoryModel;
        this.logger = new common_1.Logger(ShiftMigrationService_1.name);
    }
    async migrateShiftData() {
        this.logger.log('Starting shift data migration...');
        let migrated = 0;
        const errors = [];
        try {
            const usersWithShifts = await this.userModel.find({
                currentShift: { $exists: true, $ne: null }
            }).exec();
            this.logger.log(`Found ${usersWithShifts.length} users with current shift data`);
            for (const user of usersWithShifts) {
                try {
                    if (user.currentShift) {
                        await this.migrateIndividualShift(user._id.toString(), user.currentShift);
                        migrated++;
                    }
                    this.logger.log(`Migrated shifts for user: ${user.email}`);
                }
                catch (error) {
                    const errorMessage = `Failed to migrate shifts for user ${user.email}: ${error.message}`;
                    this.logger.error(errorMessage);
                    errors.push(errorMessage);
                }
            }
            this.logger.log(`Migration completed. Migrated: ${migrated}, Errors: ${errors.length}`);
            return { migrated, errors };
        }
        catch (error) {
            this.logger.error('Migration failed:', error);
            throw error;
        }
    }
    async migrateIndividualShift(userId, shift) {
        try {
            const existingShift = await this.shiftHistoryModel.findOne({
                userId,
                startTime: shift.startTime
            }).exec();
            if (existingShift) {
                this.logger.debug(`Shift already exists for user ${userId} at ${shift.startTime}`);
                return;
            }
            const shiftHistory = new this.shiftHistoryModel({
                userId,
                outletId: shift.outletId,
                status: shift.status || user_schema_1.ShiftStatus.ENDED,
                startTime: shift.startTime,
                endTime: shift.endTime,
                openingCash: shift.openingCash || 0,
                closingCash: shift.actualCash || 0,
                expectedCash: shift.expectedCash || 0,
                actualCash: shift.actualCash || 0,
                variance: shift.variance || 0,
                totalSales: shift.totalSales || 0,
                cashSales: shift.cashSales || 0,
                cardSales: shift.cardSales || 0,
                transactionCount: shift.transactionCount || 0,
                totalCashIn: shift.totalCashIn || 0,
                totalCashOut: shift.totalCashOut || 0,
                cashInTransactions: shift.cashInTransactions || [],
                cashOutTransactions: shift.cashOutTransactions || [],
                notes: shift.notes,
                managerApproval: shift.managerApproval ? {
                    required: true,
                    approved: shift.managerApproval.approved || false,
                    managerId: shift.managerApproval.managerId,
                    timestamp: shift.managerApproval.timestamp || new Date(),
                    reason: shift.managerApproval.reason
                } : undefined,
                createdAt: shift.startTime || new Date(),
                updatedAt: shift.endTime || new Date()
            });
            await shiftHistory.save();
            this.logger.debug(`Migrated shift for user ${userId}: ${shift.startTime}`);
        }
        catch (error) {
            this.logger.error(`Failed to migrate individual shift: ${error.message}`);
            throw error;
        }
    }
    async cleanupOldShiftData() {
        this.logger.warn('Starting cleanup of migrated shift data from user documents...');
        let cleaned = 0;
        const errors = [];
        try {
            const result = await this.userModel.updateMany({
                'currentShift.status': user_schema_1.ShiftStatus.ENDED,
                'currentShift.endTime': { $exists: true, $ne: null }
            }, { $unset: { currentShift: 1 } }).exec();
            cleaned = result.modifiedCount;
            this.logger.log(`Cleaned up ${cleaned} ended shifts from user documents`);
            return { cleaned, errors };
        }
        catch (error) {
            const errorMessage = `Failed to cleanup old shift data: ${error.message}`;
            this.logger.error(errorMessage);
            errors.push(errorMessage);
            throw error;
        }
    }
    async validateMigration() {
        try {
            const userShiftCount = await this.userModel.countDocuments({
                currentShift: { $exists: true, $ne: null }
            }).exec();
            const historyShiftCount = await this.shiftHistoryModel.countDocuments().exec();
            const isValid = historyShiftCount >= 0;
            this.logger.log(`Migration validation - User shifts: ${userShiftCount}, History shifts: ${historyShiftCount}, Valid: ${isValid}`);
            return {
                userShiftCount,
                historyShiftCount,
                isValid
            };
        }
        catch (error) {
            this.logger.error('Validation failed:', error);
            throw error;
        }
    }
    async getMigrationStatus() {
        try {
            const totalHistoryShifts = await this.shiftHistoryModel.countDocuments().exec();
            const usersWithOldData = await this.userModel.countDocuments({
                'currentShift.status': user_schema_1.ShiftStatus.ENDED,
                'currentShift.endTime': { $exists: true, $ne: null }
            }).exec();
            const activeShifts = await this.userModel.countDocuments({
                'currentShift.status': user_schema_1.ShiftStatus.ACTIVE
            }).exec();
            const needsMigration = usersWithOldData > 0;
            return {
                totalHistoryShifts,
                usersWithOldShiftData: usersWithOldData,
                activeShifts,
                needsMigration
            };
        }
        catch (error) {
            this.logger.error('Failed to get migration status:', error);
            throw error;
        }
    }
};
exports.ShiftMigrationService = ShiftMigrationService;
exports.ShiftMigrationService = ShiftMigrationService = ShiftMigrationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(shift_history_schema_1.ShiftHistory.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], ShiftMigrationService);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(27);
const passport_1 = __webpack_require__(9);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET"),
        });
        this.configService = configService;
    }
    async validate(payload) {
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
            outlets: payload.outlets,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(29);
const passport_1 = __webpack_require__(9);
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(10);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: "email" });
        this.authService = authService;
    }
    async validate(email, password) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const users_service_1 = __webpack_require__(31);
const users_controller_1 = __webpack_require__(32);
const user_schema_1 = __webpack_require__(12);
const roles_guard_1 = __webpack_require__(18);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }])],
        providers: [users_service_1.UsersService, roles_guard_1.RolesGuard],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const user_schema_1 = __webpack_require__(12);
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findAll() {
        return this.userModel
            .find({ isActive: true })
            .populate('assignedOutlets', 'name address city')
            .select("-password")
            .lean()
            .then(users => users.map(user => ({
            ...user,
            outletId: user.assignedOutlets?.[0]?._id || null,
            outletName: user.assignedOutlets?.[0]?.name || null
        })));
    }
    async findById(id) {
        const user = await this.userModel.findById(id).select("-password");
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async updateUser(id, updateData) {
        const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async deactivateUser(id) {
        const user = await this.userModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("-password");
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object])
], UsersService);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(2);
const users_service_1 = __webpack_require__(31);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async findById(id) {
        return this.usersService.findById(id);
    }
    async updateUser(id, updateData) {
        return this.usersService.updateUser(id, updateData);
    }
    async deactivateUser(id) {
        return this.usersService.deactivateUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivateUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const products_service_1 = __webpack_require__(34);
const products_controller_1 = __webpack_require__(37);
const product_schema_1 = __webpack_require__(35);
const outlet_schema_1 = __webpack_require__(36);
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: outlet_schema_1.Outlet.name, schema: outlet_schema_1.OutletSchema },
            ]),
        ],
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsController],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const product_schema_1 = __webpack_require__(35);
const outlet_schema_1 = __webpack_require__(36);
let ProductsService = class ProductsService {
    constructor(productModel, outletModel) {
        this.productModel = productModel;
        this.outletModel = outletModel;
    }
    async create(createProductDto) {
        const existingProduct = await this.productModel.findOne({
            barcode: createProductDto.barcode,
        });
        if (existingProduct) {
            throw new common_1.BadRequestException("Product with this barcode already exists");
        }
        const product = new this.productModel(createProductDto);
        return product.save();
    }
    async findAll(outletId, category, search) {
        const query = { isActive: true };
        if (category) {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { barcode: { $regex: search, $options: "i" } },
                { manufacturer: { $regex: search, $options: "i" } },
            ];
        }
        let products = await this.productModel.find(query).populate("supplier").sort({ name: 1 });
        if (outletId) {
            products = products.map((product) => {
                const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
                return {
                    ...product.toObject(),
                    currentStock: outletInventory?.quantity || 0,
                    reorderPoint: outletInventory?.reorderPoint || 0,
                };
            });
        }
        return products;
    }
    async findByBarcode(barcode, outletId) {
        const product = await this.productModel
            .findOne({
            barcode,
            isActive: true,
        })
            .populate("supplier");
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        if (outletId) {
            const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
            return {
                ...product.toObject(),
                currentStock: outletInventory?.quantity || 0,
                reorderPoint: outletInventory?.reorderPoint || 0,
            };
        }
        return product;
    }
    async findById(id) {
        const product = await this.productModel.findById(id).populate("supplier");
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).populate("supplier");
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        return product;
    }
    async adjustStock(productId, adjustmentDto) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        const { outletId, quantity, reason, adjustmentType } = adjustmentDto;
        const inventoryIndex = product.inventory.findIndex((inv) => inv.outlet.toString() === outletId);
        if (inventoryIndex === -1) {
            product.inventory.push({
                outlet: outletId,
                quantity: adjustmentType === "add" ? quantity : 0,
                reorderPoint: 10,
                lastUpdated: new Date(),
            });
        }
        else {
            const currentQuantity = product.inventory[inventoryIndex].quantity;
            if (adjustmentType === "add") {
                product.inventory[inventoryIndex].quantity = currentQuantity + quantity;
            }
            else if (adjustmentType === "subtract") {
                const newQuantity = currentQuantity - quantity;
                if (newQuantity < 0) {
                    throw new common_1.BadRequestException("Insufficient stock");
                }
                product.inventory[inventoryIndex].quantity = newQuantity;
            }
            else {
                product.inventory[inventoryIndex].quantity = quantity;
            }
            product.inventory[inventoryIndex].lastUpdated = new Date();
        }
        await product.save();
        console.log(`Stock adjustment: ${reason} - ${adjustmentType} ${quantity} for product ${product.name}`);
        return product;
    }
    async getLowStockProducts(outletId) {
        const products = await this.productModel.find({ isActive: true });
        const lowStockProducts = products.filter((product) => {
            const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
            if (!outletInventory)
                return false;
            return outletInventory.quantity <= outletInventory.reorderPoint;
        });
        return lowStockProducts.map((product) => {
            const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
            return {
                ...product.toObject(),
                currentStock: outletInventory?.quantity || 0,
                reorderPoint: outletInventory?.reorderPoint || 0,
            };
        });
    }
    async getExpiringProducts(outletId, days = 30) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        const products = await this.productModel.find({
            isActive: true,
            expiryDate: { $lte: futureDate, $gte: new Date() },
        });
        return products
            .filter((product) => {
            const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
            return outletInventory && outletInventory.quantity > 0;
        })
            .map((product) => {
            const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
            return {
                ...product.toObject(),
                currentStock: outletInventory?.quantity || 0,
                daysToExpiry: Math.ceil((product.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
            };
        });
    }
    async getCategories() {
        const categories = await this.productModel.distinct("category", { isActive: true });
        return categories.sort();
    }
    async getProductTypes() {
        const types = await this.productModel.distinct("productType", { isActive: true });
        return types.sort();
    }
    async delete(id) {
        const product = await this.productModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        return product;
    }
    async createStockAdjustment(productId, adjustmentDto) {
        return this.adjustStock(productId, adjustmentDto);
    }
    async getStockAdjustmentHistory(productId, outletId) {
        const mockHistory = [
            {
                id: "1",
                productId: productId || "mock-product-1",
                productName: "Sample Product",
                outletId: outletId || "mock-outlet-1",
                outletName: "Main Store",
                previousQuantity: 100,
                newQuantity: 150,
                adjustmentQuantity: 50,
                adjustmentType: "add",
                reason: "Stock replenishment",
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                adjustedBy: "Admin User"
            },
            {
                id: "2",
                productId: productId || "mock-product-2",
                productName: "Another Product",
                outletId: outletId || "mock-outlet-1",
                outletName: "Main Store",
                previousQuantity: 75,
                newQuantity: 70,
                adjustmentQuantity: 5,
                adjustmentType: "subtract",
                reason: "Damaged goods",
                timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
                adjustedBy: "Manager User"
            }
        ];
        return mockHistory.filter(adjustment => {
            if (productId && adjustment.productId !== productId)
                return false;
            if (outletId && adjustment.outletId !== outletId)
                return false;
            return true;
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(outlet_schema_1.Outlet.name)),
    __metadata("design:paramtypes", [Object, Object])
], ProductsService);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = exports.ProductCategory = exports.ProductType = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
var ProductType;
(function (ProductType) {
    ProductType["DRUG"] = "drug";
    ProductType["LAB_EQUIPMENT"] = "lab_equipment";
    ProductType["MEDICAL_DEVICE"] = "medical_device";
    ProductType["GENERAL_PHARMACY"] = "general_pharmacy";
})(ProductType || (exports.ProductType = ProductType = {}));
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["PRESCRIPTION_DRUGS"] = "prescription_drugs";
    ProductCategory["OTC_DRUGS"] = "otc_drugs";
    ProductCategory["ANTIBIOTICS"] = "antibiotics";
    ProductCategory["VITAMINS_SUPPLEMENTS"] = "vitamins_supplements";
    ProductCategory["PAIN_RELIEF"] = "pain_relief";
    ProductCategory["CHRONIC_DISEASE"] = "chronic_disease";
    ProductCategory["PEDIATRIC"] = "pediatric";
    ProductCategory["DIAGNOSTIC_EQUIPMENT"] = "diagnostic_equipment";
    ProductCategory["TESTING_KITS"] = "testing_kits";
    ProductCategory["LAB_CONSUMABLES"] = "lab_consumables";
    ProductCategory["MICROSCOPY"] = "microscopy";
    ProductCategory["BLOOD_PRESSURE_MONITORS"] = "blood_pressure_monitors";
    ProductCategory["GLUCOMETERS"] = "glucometers";
    ProductCategory["SURGICAL_INSTRUMENTS"] = "surgical_instruments";
    ProductCategory["MONITORING_DEVICES"] = "monitoring_devices";
    ProductCategory["MOBILITY_AIDS"] = "mobility_aids";
    ProductCategory["WOUND_CARE"] = "wound_care";
    ProductCategory["RESPIRATORY_DEVICES"] = "respiratory_devices";
    ProductCategory["THERMOMETERS"] = "thermometers";
    ProductCategory["PERSONAL_CARE"] = "personal_care";
    ProductCategory["BABY_CARE"] = "baby_care";
    ProductCategory["FIRST_AID"] = "first_aid";
    ProductCategory["HYGIENE_PRODUCTS"] = "hygiene_products";
    ProductCategory["COSMETICS"] = "cosmetics";
    ProductCategory["HEALTH_ACCESSORIES"] = "health_accessories";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "barcode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ProductType }),
    __metadata("design:type", String)
], Product.prototype, "productType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ProductCategory }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "retailPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "wholesalePrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "costPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "manufacturer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "batchNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Product.prototype, "expiryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "warrantyPeriod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "requiresPrescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isControlledSubstance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "activeIngredient", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "strength", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "dosageForm", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "packSize", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "storageConditions", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                outlet: { type: mongoose_2.Types.ObjectId, ref: "Outlet" },
                quantity: Number,
                reorderPoint: Number,
                lastUpdated: Date,
            },
        ],
    }),
    __metadata("design:type", Array)
], Product.prototype, "inventory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Supplier" }),
    __metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], Product.prototype, "supplier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutletSchema = exports.Outlet = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
let Outlet = class Outlet {
};
exports.Outlet = Outlet;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Outlet.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Outlet.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Outlet.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Outlet.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Outlet.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Outlet.prototype, "managerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Outlet.prototype, "licenseNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Outlet.prototype, "licenseExpiry", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            open: String,
            close: String,
            timezone: { type: String, default: "Africa/Freetown" },
        },
    }),
    __metadata("design:type", Object)
], Outlet.prototype, "operatingHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Outlet.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            totalSales: { type: Number, default: 0 },
            totalTransactions: { type: Number, default: 0 },
            averageTransactionValue: { type: Number, default: 0 },
            lastSaleDate: Date,
        },
        default: {
            totalSales: 0,
            totalTransactions: 0,
            averageTransactionValue: 0,
            lastSaleDate: null,
        }
    }),
    __metadata("design:type", Object)
], Outlet.prototype, "metrics", void 0);
exports.Outlet = Outlet = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Outlet);
exports.OutletSchema = mongoose_1.SchemaFactory.createForClass(Outlet);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const common_1 = __webpack_require__(2);
const products_service_1 = __webpack_require__(34);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    async findAll(outletId, category, search) {
        return this.productsService.findAll(outletId, category, search);
    }
    async getCategories() {
        return this.productsService.getCategories();
    }
    async getProductTypes() {
        return this.productsService.getProductTypes();
    }
    async getLowStockProducts(outletId) {
        const targetOutletId = outletId || 'default';
        return this.productsService.getLowStockProducts(targetOutletId);
    }
    async getExpiringProducts(outletId, days) {
        const daysNumber = days ? Number.parseInt(days) : 30;
        const targetOutletId = outletId || 'default';
        return this.productsService.getExpiringProducts(targetOutletId, daysNumber);
    }
    async getStockAdjustments(outletId) {
        return this.productsService.getStockAdjustmentHistory(outletId);
    }
    async createStockAdjustment(productId, stockAdjustmentDto) {
        return this.productsService.adjustStock(productId, stockAdjustmentDto);
    }
    async findByBarcode(barcode, outletId) {
        return this.productsService.findByBarcode(barcode, outletId);
    }
    async findById(id) {
        return this.productsService.findById(id);
    }
    async update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    async adjustStock(id, stockAdjustmentDto) {
        return this.productsService.adjustStock(id, stockAdjustmentDto);
    }
    async delete(id) {
        return this.productsService.delete(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('outletId')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("categories"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)("types"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductTypes", null);
__decorate([
    (0, common_1.Get)('low-stock'),
    __param(0, (0, common_1.Query)('outletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getLowStockProducts", null);
__decorate([
    (0, common_1.Get)("expiring"),
    __param(0, (0, common_1.Query)('outletId')),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getExpiringProducts", null);
__decorate([
    (0, common_1.Get)("stock-adjustment"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Query)('outletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getStockAdjustments", null);
__decorate([
    (0, common_1.Post)(":id/stock-adjustment"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createStockAdjustment", null);
__decorate([
    (0, common_1.Get)("barcode/:barcode"),
    __param(0, (0, common_1.Param)('barcode')),
    __param(1, (0, common_1.Query)('outletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByBarcode", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(":id/adjust-stock"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "adjustStock", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "delete", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)("products"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsController);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutletsModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const outlets_service_1 = __webpack_require__(39);
const outlets_controller_1 = __webpack_require__(40);
const outlet_schema_1 = __webpack_require__(36);
let OutletsModule = class OutletsModule {
};
exports.OutletsModule = OutletsModule;
exports.OutletsModule = OutletsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: outlet_schema_1.Outlet.name, schema: outlet_schema_1.OutletSchema }])],
        providers: [outlets_service_1.OutletsService],
        controllers: [outlets_controller_1.OutletsController],
        exports: [outlets_service_1.OutletsService],
    })
], OutletsModule);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutletsService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const outlet_schema_1 = __webpack_require__(36);
let OutletsService = class OutletsService {
    constructor(outletModel) {
        this.outletModel = outletModel;
    }
    async create(createOutletDto) {
        const outlet = new this.outletModel(createOutletDto);
        return outlet.save();
    }
    async findAll() {
        return this.outletModel.find({ isActive: true }).sort({ name: 1 });
    }
    async findById(id) {
        const outlet = await this.outletModel.findById(id);
        if (!outlet) {
            throw new common_1.NotFoundException("Outlet not found");
        }
        return outlet;
    }
    async update(id, updateOutletDto) {
        const outlet = await this.outletModel.findByIdAndUpdate(id, updateOutletDto, { new: true });
        if (!outlet) {
            throw new common_1.NotFoundException("Outlet not found");
        }
        return outlet;
    }
    async updateMetrics(outletId, saleAmount) {
        const outlet = await this.outletModel.findById(outletId);
        if (outlet) {
            outlet.metrics.totalSales += saleAmount;
            outlet.metrics.totalTransactions += 1;
            outlet.metrics.averageTransactionValue = outlet.metrics.totalSales / outlet.metrics.totalTransactions;
            outlet.metrics.lastSaleDate = new Date();
            await outlet.save();
        }
    }
    async delete(id) {
        const outlet = await this.outletModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!outlet) {
            throw new common_1.NotFoundException("Outlet not found");
        }
        return outlet;
    }
    async getOutletComparison() {
        const outlets = await this.outletModel.find({ isActive: true });
        const comparison = outlets.map(outlet => ({
            id: outlet._id,
            name: outlet.name,
            location: `${outlet.address}, ${outlet.city || ''}`.trim(),
            totalSales: outlet.metrics?.totalSales || 0,
            totalTransactions: outlet.metrics?.totalTransactions || 0,
            averageTransaction: outlet.metrics?.averageTransactionValue || 0,
            lastSaleDate: outlet.metrics?.lastSaleDate,
            salesGrowth: Math.floor(Math.random() * 20) - 10,
            customerCount: Math.floor(Math.random() * 1000) + 100,
            topProduct: "Paracetamol 500mg",
            efficiency: Math.floor(Math.random() * 40) + 60,
        }));
        comparison.sort((a, b) => b.totalSales - a.totalSales);
        return {
            outlets: comparison,
            summary: {
                totalOutlets: outlets.length,
                totalSales: comparison.reduce((sum, outlet) => sum + outlet.totalSales, 0),
                averageSales: comparison.reduce((sum, outlet) => sum + outlet.totalSales, 0) / outlets.length,
                bestPerforming: comparison[0]?.name || "None",
                worstPerforming: comparison[comparison.length - 1]?.name || "None"
            }
        };
    }
};
exports.OutletsService = OutletsService;
exports.OutletsService = OutletsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(outlet_schema_1.Outlet.name)),
    __metadata("design:paramtypes", [Object])
], OutletsService);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutletsController = void 0;
const common_1 = __webpack_require__(2);
const outlets_service_1 = __webpack_require__(39);
const create_outlet_dto_1 = __webpack_require__(41);
const update_outlet_dto_1 = __webpack_require__(42);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let OutletsController = class OutletsController {
    constructor(outletsService) {
        this.outletsService = outletsService;
    }
    async create(createOutletDto) {
        return this.outletsService.create(createOutletDto);
    }
    async findAll() {
        return this.outletsService.findAll();
    }
    async getOutletComparison() {
        return this.outletsService.getOutletComparison();
    }
    async findById(id) {
        return this.outletsService.findById(id);
    }
    async update(id, updateOutletDto) {
        return this.outletsService.update(id, updateOutletDto);
    }
    async delete(id) {
        return this.outletsService.delete(id);
    }
};
exports.OutletsController = OutletsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_outlet_dto_1.CreateOutletDto !== "undefined" && create_outlet_dto_1.CreateOutletDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("comparison"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "getOutletComparison", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_outlet_dto_1.UpdateOutletDto !== "undefined" && update_outlet_dto_1.UpdateOutletDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "delete", null);
exports.OutletsController = OutletsController = __decorate([
    (0, common_1.Controller)("outlets"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof outlets_service_1.OutletsService !== "undefined" && outlets_service_1.OutletsService) === "function" ? _a : Object])
], OutletsController);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOutletDto = void 0;
const class_validator_1 = __webpack_require__(22);
class CreateOutletDto {
}
exports.CreateOutletDto = CreateOutletDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "managerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOutletDto.prototype, "licenseExpiry", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateOutletDto.prototype, "operatingHours", void 0);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOutletDto = void 0;
const class_validator_1 = __webpack_require__(22);
class UpdateOutletDto {
}
exports.UpdateOutletDto = UpdateOutletDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOutletDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOutletDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOutletDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOutletDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateOutletDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOutletDto.prototype, "licenseNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateOutletDto.prototype, "licenseExpiry", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateOutletDto.prototype, "operatingHours", void 0);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionsModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const transactions_service_1 = __webpack_require__(44);
const transactions_controller_1 = __webpack_require__(46);
const transaction_schema_1 = __webpack_require__(45);
const product_schema_1 = __webpack_require__(35);
const user_schema_1 = __webpack_require__(12);
const outlet_schema_1 = __webpack_require__(36);
const products_module_1 = __webpack_require__(33);
const outlets_module_1 = __webpack_require__(38);
const auth_module_1 = __webpack_require__(7);
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: transaction_schema_1.Transaction.name, schema: transaction_schema_1.TransactionSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: outlet_schema_1.Outlet.name, schema: outlet_schema_1.OutletSchema },
            ]),
            products_module_1.ProductsModule,
            outlets_module_1.OutletsModule,
            auth_module_1.AuthModule,
        ],
        providers: [transactions_service_1.TransactionsService],
        controllers: [transactions_controller_1.TransactionsController],
        exports: [transactions_service_1.TransactionsService],
    })
], TransactionsModule);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionsService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const transaction_schema_1 = __webpack_require__(45);
const product_schema_1 = __webpack_require__(35);
const user_schema_1 = __webpack_require__(12);
const outlet_schema_1 = __webpack_require__(36);
const products_service_1 = __webpack_require__(34);
const outlets_service_1 = __webpack_require__(39);
const auth_service_1 = __webpack_require__(10);
let TransactionsService = class TransactionsService {
    constructor(transactionModel, productModel, userModel, outletModel, productsService, outletsService, authService) {
        this.transactionModel = transactionModel;
        this.productModel = productModel;
        this.userModel = userModel;
        this.outletModel = outletModel;
        this.productsService = productsService;
        this.outletsService = outletsService;
        this.authService = authService;
    }
    async createSale(createTransactionDto, userId) {
        const { outletId, items, paymentMethod, customerName, customerPhone, notes } = createTransactionDto;
        const outlet = await this.outletModel.findById(outletId);
        if (!outlet) {
            throw new common_1.NotFoundException("Outlet not found");
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        let subtotal = 0;
        const processedItems = [];
        for (const item of items) {
            const product = await this.productModel.findById(item.productId);
            if (!product) {
                throw new common_1.NotFoundException(`Product ${item.productId} not found`);
            }
            const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
            if (!outletInventory || outletInventory.quantity < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${product.name}`);
            }
            const unitPrice = product.retailPrice;
            const totalPrice = unitPrice * item.quantity;
            processedItems.push({
                product: product._id,
                quantity: item.quantity,
                unitPrice,
                totalPrice,
                discount: item.discount || 0,
            });
            subtotal += totalPrice - (item.discount || 0);
        }
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const invoiceNumber = await this.generateInvoiceNumber(outletId);
        const transaction = new this.transactionModel({
            type: transaction_schema_1.TransactionType.SALE,
            staff: userId,
            outlet: outletId,
            items: processedItems,
            subtotal,
            tax,
            total,
            paymentMethod,
            status: transaction_schema_1.TransactionStatus.COMPLETED,
            customerName,
            customerPhone,
            notes,
            invoiceNumber,
        });
        await transaction.save();
        for (const item of items) {
            await this.productsService.adjustStock(item.productId, {
                outletId,
                quantity: item.quantity,
                adjustmentType: "subtract",
                reason: `Sale - Invoice ${invoiceNumber}`,
            });
        }
        await this.authService.updateShiftSales(userId, total, paymentMethod);
        await this.outletsService.updateMetrics(outletId, total);
        return transaction.populate(["staff", "outlet", "items.product"]);
    }
    async createBulkSale(createBulkSaleDto, userId) {
        const { outletId, items, paymentMethod, customerName, customerPhone, notes, discount } = createBulkSaleDto;
        const outlet = await this.outletModel.findById(outletId);
        if (!outlet) {
            throw new common_1.NotFoundException("Outlet not found");
        }
        const user = await this.userModel.findById(userId);
        if (!user || !["admin", "manager"].includes(user.role)) {
            throw new common_1.BadRequestException("Insufficient permissions for bulk sales");
        }
        let subtotal = 0;
        const processedItems = [];
        for (const item of items) {
            const product = await this.productModel.findById(item.productId);
            if (!product) {
                throw new common_1.NotFoundException(`Product ${item.productId} not found`);
            }
            const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
            if (!outletInventory || outletInventory.quantity < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${product.name}`);
            }
            const unitPrice = product.wholesalePrice;
            const totalPrice = unitPrice * item.quantity;
            processedItems.push({
                product: product._id,
                quantity: item.quantity,
                unitPrice,
                totalPrice,
                discount: item.discount || 0,
            });
            subtotal += totalPrice - (item.discount || 0);
        }
        const discountAmount = discount || 0;
        const tax = (subtotal - discountAmount) * 0.15;
        const total = subtotal - discountAmount + tax;
        const invoiceNumber = await this.generateInvoiceNumber(outletId, "BULK");
        const transaction = new this.transactionModel({
            type: transaction_schema_1.TransactionType.BULK_SALE,
            staff: userId,
            outlet: outletId,
            items: processedItems,
            subtotal,
            tax,
            discount: discountAmount,
            total,
            paymentMethod,
            status: transaction_schema_1.TransactionStatus.COMPLETED,
            customerName,
            customerPhone,
            notes,
            invoiceNumber,
        });
        await transaction.save();
        for (const item of items) {
            await this.productsService.adjustStock(item.productId, {
                outletId,
                quantity: item.quantity,
                adjustmentType: "subtract",
                reason: `Bulk Sale - Invoice ${invoiceNumber}`,
            });
        }
        await this.authService.updateShiftSales(userId, total, paymentMethod);
        await this.outletsService.updateMetrics(outletId, total);
        return transaction.populate(["staff", "outlet", "items.product"]);
    }
    async findAll(outletId, startDate, endDate, type) {
        const query = {};
        if (outletId) {
            query.outlet = outletId;
        }
        if (type) {
            query.type = type;
        }
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate)
                query.createdAt.$gte = startDate;
            if (endDate)
                query.createdAt.$lte = endDate;
        }
        return this.transactionModel.find(query).populate(["staff", "outlet", "items.product"]).sort({ createdAt: -1 });
    }
    async findById(id) {
        const transaction = await this.transactionModel.findById(id).populate(["staff", "outlet", "items.product"]);
        if (!transaction) {
            throw new common_1.NotFoundException("Transaction not found");
        }
        return transaction;
    }
    async getTransactionsByStaff(staffId, outletId) {
        const query = { staff: staffId };
        if (outletId) {
            query.outlet = outletId;
        }
        return this.transactionModel.find(query).populate(["outlet", "items.product"]).sort({ createdAt: -1 });
    }
    async getDailySales(outletId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const transactions = await this.transactionModel.find({
            outlet: outletId,
            status: transaction_schema_1.TransactionStatus.COMPLETED,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
        const totalSales = transactions.reduce((sum, transaction) => sum + transaction.total, 0);
        const totalTransactions = transactions.length;
        const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;
        return {
            date,
            totalSales,
            totalTransactions,
            averageTransaction,
            transactions,
        };
    }
    async generateInvoiceNumber(outletId, prefix = "INV") {
        const outlet = await this.outletModel.findById(outletId);
        const outletCode = outlet?.name.substring(0, 3).toUpperCase() || "POS";
        const today = new Date();
        const dateString = today.toISOString().slice(0, 10).replace(/-/g, "");
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);
        const count = await this.transactionModel.countDocuments({
            outlet: outletId,
            createdAt: { $gte: startOfDay },
        });
        return `${prefix}-${outletCode}-${dateString}-${String(count + 1).padStart(4, "0")}`;
    }
    async cancelTransaction(id, reason) {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction) {
            throw new common_1.NotFoundException("Transaction not found");
        }
        if (transaction.status === transaction_schema_1.TransactionStatus.CANCELLED) {
            throw new common_1.BadRequestException("Transaction already cancelled");
        }
        for (const item of transaction.items) {
            await this.productsService.adjustStock(item.product.toString(), {
                outletId: transaction.outlet.toString(),
                quantity: item.quantity,
                adjustmentType: "add",
                reason: `Transaction cancelled - ${reason}`,
            });
        }
        transaction.status = transaction_schema_1.TransactionStatus.CANCELLED;
        transaction.notes = `${transaction.notes || ""}\nCancelled: ${reason}`;
        await transaction.save();
        return transaction;
    }
    async generateReceipt(transactionId) {
        const transaction = await this.transactionModel
            .findById(transactionId)
            .populate(["staff", "outlet", "items.product"]);
        if (!transaction) {
            throw new common_1.NotFoundException("Transaction not found");
        }
        const receipt = {
            transactionId: transaction._id,
            invoiceNumber: transaction.invoiceNumber,
            outlet: {
                name: transaction.outlet.name,
                address: transaction.outlet.address,
                phone: transaction.outlet.phone,
            },
            staff: {
                name: transaction.staff.firstName + " " + transaction.staff.lastName,
                id: transaction.staff._id,
            },
            customer: {
                name: transaction.customerName,
                phone: transaction.customerPhone,
            },
            items: transaction.items.map(item => ({
                name: item.product.name,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
                discount: item.discount || 0,
            })),
            totals: {
                subtotal: transaction.subtotal,
                discount: transaction.discount || 0,
                tax: transaction.tax,
                total: transaction.total,
            },
            payment: {
                method: transaction.paymentMethod,
                status: transaction.status,
            },
            date: transaction.createdAt,
            notes: transaction.notes,
        };
        return receipt;
    }
    async getBulkSalesAnalytics(outletId, startDate, endDate) {
        const query = { type: transaction_schema_1.TransactionType.BULK_SALE };
        if (outletId) {
            query.outlet = outletId;
        }
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate)
                query.createdAt.$gte = startDate;
            if (endDate)
                query.createdAt.$lte = endDate;
        }
        const bulkSales = await this.transactionModel.find(query).populate(["outlet", "staff"]);
        const analytics = {
            totalBulkSales: bulkSales.length,
            totalRevenue: bulkSales.reduce((sum, sale) => sum + sale.total, 0),
            averageOrderValue: bulkSales.length > 0
                ? bulkSales.reduce((sum, sale) => sum + sale.total, 0) / bulkSales.length
                : 0,
            totalDiscount: bulkSales.reduce((sum, sale) => sum + (sale.discount || 0), 0),
            topCustomers: this.getTopBulkCustomers(bulkSales),
            salesByOutlet: this.groupBulkSalesByOutlet(bulkSales),
            salesByMonth: this.groupBulkSalesByMonth(bulkSales),
            recentBulkSales: bulkSales.slice(0, 10),
        };
        return analytics;
    }
    getTopBulkCustomers(bulkSales) {
        const customerMap = new Map();
        bulkSales.forEach(sale => {
            if (sale.customerName) {
                const existing = customerMap.get(sale.customerName) || {
                    name: sale.customerName,
                    phone: sale.customerPhone,
                    totalOrders: 0,
                    totalSpent: 0,
                };
                existing.totalOrders++;
                existing.totalSpent += sale.total;
                customerMap.set(sale.customerName, existing);
            }
        });
        return Array.from(customerMap.values())
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 10);
    }
    groupBulkSalesByOutlet(bulkSales) {
        const outletMap = new Map();
        bulkSales.forEach(sale => {
            const outletName = sale.outlet.name || "Unknown";
            const existing = outletMap.get(outletName) || {
                outlet: outletName,
                totalSales: 0,
                totalRevenue: 0,
            };
            existing.totalSales++;
            existing.totalRevenue += sale.total;
            outletMap.set(outletName, existing);
        });
        return Array.from(outletMap.values());
    }
    groupBulkSalesByMonth(bulkSales) {
        const monthMap = new Map();
        bulkSales.forEach(sale => {
            const month = sale.createdAt.toISOString().substring(0, 7);
            const existing = monthMap.get(month) || {
                month,
                totalSales: 0,
                totalRevenue: 0,
            };
            existing.totalSales++;
            existing.totalRevenue += sale.total;
            monthMap.set(month, existing);
        });
        return Array.from(monthMap.values()).sort((a, b) => a.month.localeCompare(b.month));
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(outlet_schema_1.Outlet.name)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object, typeof (_b = typeof outlets_service_1.OutletsService !== "undefined" && outlets_service_1.OutletsService) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object])
], TransactionsService);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionSchema = exports.Transaction = exports.TransactionStatus = exports.PaymentMethod = exports.TransactionType = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
var TransactionType;
(function (TransactionType) {
    TransactionType["SALE"] = "sale";
    TransactionType["BULK_SALE"] = "bulk_sale";
    TransactionType["RETURN"] = "return";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["CARD"] = "card";
    PaymentMethod["MOBILE"] = "mobile";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["COMPLETED"] = "completed";
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["CANCELLED"] = "cancelled";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
let Transaction = class Transaction {
};
exports.Transaction = Transaction;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: TransactionType }),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Transaction.prototype, "staff", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Outlet", required: true }),
    __metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], Transaction.prototype, "outlet", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                product: { type: mongoose_2.Types.ObjectId, ref: "Product" },
                quantity: Number,
                unitPrice: Number,
                totalPrice: Number,
                discount: { type: Number, default: 0 },
            },
        ],
    }),
    __metadata("design:type", Array)
], Transaction.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Transaction.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Transaction.prototype, "tax", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Transaction.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Transaction.prototype, "total", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: PaymentMethod }),
    __metadata("design:type", String)
], Transaction.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: TransactionStatus }),
    __metadata("design:type", String)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "customerName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "customerPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "receiptUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transaction.prototype, "invoiceNumber", void 0);
exports.Transaction = Transaction = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Transaction);
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionsController = void 0;
const common_1 = __webpack_require__(2);
const transactions_service_1 = __webpack_require__(44);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
const transaction_schema_1 = __webpack_require__(45);
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async createSale(createTransactionDto, req) {
        return this.transactionsService.createSale(createTransactionDto, req.user.userId);
    }
    async createBulkSale(createBulkSaleDto, req) {
        return this.transactionsService.createBulkSale(createBulkSaleDto, req.user.userId);
    }
    async findAll(outletId, startDate, endDate, type) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.transactionsService.findAll(outletId, start, end, type);
    }
    async getBulkSales(status, startDate, endDate, outletId) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.transactionsService.getBulkSalesAnalytics(outletId, start, end);
    }
    async getReceipt(transactionId) {
        return this.transactionsService.generateReceipt(transactionId);
    }
    async getDailySales(outletId, date) {
        const saleDate = date ? new Date(date) : new Date();
        return this.transactionsService.getDailySales(outletId, saleDate);
    }
    async getTransactionsByStaff(staffId, outletId) {
        return this.transactionsService.getTransactionsByStaff(staffId, outletId);
    }
    async findById(id) {
        return this.transactionsService.findById(id);
    }
    async cancelTransaction(id, reason) {
        return this.transactionsService.cancelTransaction(id, reason);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)("sale"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "createSale", null);
__decorate([
    (0, common_1.Post)("bulk-sale"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "createBulkSale", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('outletId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, typeof (_b = typeof transaction_schema_1.TransactionType !== "undefined" && transaction_schema_1.TransactionType) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("bulk"),
    __param(0, (0, common_1.Query)("status")),
    __param(1, (0, common_1.Query)("startDate")),
    __param(2, (0, common_1.Query)("endDate")),
    __param(3, (0, common_1.Query)("outletId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getBulkSales", null);
__decorate([
    (0, common_1.Get)('receipt/:transactionId'),
    __param(0, (0, common_1.Param)('transactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getReceipt", null);
__decorate([
    (0, common_1.Get)("daily-sales/:outletId"),
    __param(0, (0, common_1.Param)('outletId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getDailySales", null);
__decorate([
    (0, common_1.Get)("staff/:staffId"),
    __param(0, (0, common_1.Param)('staffId')),
    __param(1, (0, common_1.Query)('outletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getTransactionsByStaff", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(":id/cancel"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "cancelTransaction", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)("transactions"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof transactions_service_1.TransactionsService !== "undefined" && transactions_service_1.TransactionsService) === "function" ? _a : Object])
], TransactionsController);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const suppliers_service_1 = __webpack_require__(48);
const suppliers_controller_1 = __webpack_require__(50);
const supplier_schema_1 = __webpack_require__(49);
let SuppliersModule = class SuppliersModule {
};
exports.SuppliersModule = SuppliersModule;
exports.SuppliersModule = SuppliersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: supplier_schema_1.Supplier.name, schema: supplier_schema_1.SupplierSchema }])],
        providers: [suppliers_service_1.SuppliersService],
        controllers: [suppliers_controller_1.SuppliersController],
        exports: [suppliers_service_1.SuppliersService],
    })
], SuppliersModule);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const supplier_schema_1 = __webpack_require__(49);
let SuppliersService = class SuppliersService {
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
    }
    async create(createSupplierDto) {
        const existingSupplier = await this.supplierModel.findOne({
            $or: [{ email: createSupplierDto.email }, { phone: createSupplierDto.phone }],
        });
        if (existingSupplier) {
            throw new common_1.BadRequestException("Supplier with this email or phone already exists");
        }
        const supplier = new this.supplierModel(createSupplierDto);
        return supplier.save();
    }
    async findAll() {
        return this.supplierModel.find({ isActive: true }).sort({ name: 1 });
    }
    async findById(id) {
        const supplier = await this.supplierModel.findById(id);
        if (!supplier) {
            throw new common_1.NotFoundException("Supplier not found");
        }
        return supplier;
    }
    async update(id, updateSupplierDto) {
        const supplier = await this.supplierModel.findByIdAndUpdate(id, updateSupplierDto, { new: true });
        if (!supplier) {
            throw new common_1.NotFoundException("Supplier not found");
        }
        return supplier;
    }
    async updatePerformance(supplierId, orderValue, deliveryTime) {
        const supplier = await this.supplierModel.findById(supplierId);
        if (supplier) {
            supplier.performance.totalOrders += 1;
            supplier.performance.totalValue += orderValue;
            const currentAvg = supplier.performance.averageDeliveryTime;
            const totalOrders = supplier.performance.totalOrders;
            supplier.performance.averageDeliveryTime = (currentAvg * (totalOrders - 1) + deliveryTime) / totalOrders;
            await supplier.save();
        }
    }
    async getTopSuppliers(limit = 10) {
        return this.supplierModel.find({ isActive: true }).sort({ "performance.totalValue": -1 }).limit(limit);
    }
    async delete(id) {
        const supplier = await this.supplierModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!supplier) {
            throw new common_1.NotFoundException("Supplier not found");
        }
        return supplier;
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(supplier_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [Object])
], SuppliersService);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupplierSchema = exports.Supplier = void 0;
const mongoose_1 = __webpack_require__(5);
let Supplier = class Supplier {
};
exports.Supplier = Supplier;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "contactPerson", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supplier.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Supplier.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            creditDays: { type: Number, default: 30 },
            creditLimit: { type: Number, default: 0 },
            discount: { type: Number, default: 0 },
        },
    }),
    __metadata("design:type", Object)
], Supplier.prototype, "paymentTerms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            totalOrders: { type: Number, default: 0 },
            totalValue: { type: Number, default: 0 },
            averageDeliveryTime: { type: Number, default: 0 },
            rating: { type: Number, default: 5 },
        },
    }),
    __metadata("design:type", Object)
], Supplier.prototype, "performance", void 0);
exports.Supplier = Supplier = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Supplier);
exports.SupplierSchema = mongoose_1.SchemaFactory.createForClass(Supplier);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuppliersController = void 0;
const common_1 = __webpack_require__(2);
const suppliers_service_1 = __webpack_require__(48);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let SuppliersController = class SuppliersController {
    constructor(suppliersService) {
        this.suppliersService = suppliersService;
    }
    async create(createSupplierDto) {
        return this.suppliersService.create(createSupplierDto);
    }
    async findAll() {
        return this.suppliersService.findAll();
    }
    async getTopSuppliers(limit) {
        const limitNumber = limit ? Number.parseInt(limit) : 10;
        return this.suppliersService.getTopSuppliers(limitNumber);
    }
    async findById(id) {
        return this.suppliersService.findById(id);
    }
    async update(id, updateSupplierDto) {
        return this.suppliersService.update(id, updateSupplierDto);
    }
    async delete(id) {
        return this.suppliersService.delete(id);
    }
};
exports.SuppliersController = SuppliersController;
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("top"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "getTopSuppliers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "delete", null);
exports.SuppliersController = SuppliersController = __decorate([
    (0, common_1.Controller)("suppliers"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __metadata("design:paramtypes", [typeof (_a = typeof suppliers_service_1.SuppliersService !== "undefined" && suppliers_service_1.SuppliersService) === "function" ? _a : Object])
], SuppliersController);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const analytics_service_1 = __webpack_require__(52);
const analytics_controller_1 = __webpack_require__(53);
const transaction_schema_1 = __webpack_require__(45);
const product_schema_1 = __webpack_require__(35);
const user_schema_1 = __webpack_require__(12);
const outlet_schema_1 = __webpack_require__(36);
const supplier_schema_1 = __webpack_require__(49);
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: transaction_schema_1.Transaction.name, schema: transaction_schema_1.TransactionSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: outlet_schema_1.Outlet.name, schema: outlet_schema_1.OutletSchema },
                { name: supplier_schema_1.Supplier.name, schema: supplier_schema_1.SupplierSchema },
            ]),
        ],
        providers: [analytics_service_1.AnalyticsService],
        controllers: [analytics_controller_1.AnalyticsController],
        exports: [analytics_service_1.AnalyticsService],
    })
], AnalyticsModule);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const transaction_schema_1 = __webpack_require__(45);
const product_schema_1 = __webpack_require__(35);
const user_schema_1 = __webpack_require__(12);
const outlet_schema_1 = __webpack_require__(36);
const supplier_schema_1 = __webpack_require__(49);
let AnalyticsService = class AnalyticsService {
    constructor(transactionModel, productModel, userModel, outletModel, supplierModel) {
        this.transactionModel = transactionModel;
        this.productModel = productModel;
        this.userModel = userModel;
        this.outletModel = outletModel;
        this.supplierModel = supplierModel;
    }
    async getSystemOverview(outletId) {
        const [totalOutlets, totalProducts, totalUsers, totalSuppliers, todayTransactions, todaySales, lowStockCount, expiringCount,] = await Promise.all([
            this.outletModel.countDocuments({ isActive: true }),
            this.productModel.countDocuments({ isActive: true }),
            this.userModel.countDocuments({ isActive: true }),
            this.supplierModel.countDocuments({ isActive: true }),
            this.getTodayTransactionCount(outletId),
            this.getTodaySales(outletId),
            this.getLowStockCount(outletId),
            this.getExpiringProductsCount(),
        ]);
        return {
            totalOutlets,
            totalProducts,
            totalUsers,
            totalSuppliers,
            todayTransactions,
            todaySales,
            lowStockCount,
            expiringCount,
        };
    }
    async getSalesAnalytics(outletId, startDate, endDate) {
        const matchQuery = { status: transaction_schema_1.TransactionStatus.COMPLETED };
        if (outletId) {
            matchQuery.outlet = outletId;
        }
        if (startDate || endDate) {
            matchQuery.createdAt = {};
            if (startDate)
                matchQuery.createdAt.$gte = startDate;
            if (endDate)
                matchQuery.createdAt.$lte = endDate;
        }
        const [salesByDay, salesByOutlet, topProducts, paymentMethods] = await Promise.all([
            this.getSalesByDay(matchQuery),
            this.getSalesByOutlet(matchQuery),
            this.getTopSellingProducts(matchQuery),
            this.getPaymentMethodBreakdown(matchQuery),
        ]);
        return {
            salesByDay,
            salesByOutlet,
            topProducts,
            paymentMethods,
        };
    }
    async getStaffPerformance(outletId, startDate, endDate) {
        const matchQuery = { status: transaction_schema_1.TransactionStatus.COMPLETED };
        if (outletId) {
            matchQuery.outlet = outletId;
        }
        if (startDate || endDate) {
            matchQuery.createdAt = {};
            if (startDate)
                matchQuery.createdAt.$gte = startDate;
            if (endDate)
                matchQuery.createdAt.$lte = endDate;
        }
        const staffPerformance = await this.transactionModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: "$staff",
                    totalSales: { $sum: "$total" },
                    totalTransactions: { $count: {} },
                    averageTransaction: { $avg: "$total" },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "staff",
                },
            },
            { $unwind: "$staff" },
            {
                $project: {
                    staffId: "$_id",
                    staffName: { $concat: ["$staff.firstName", " ", "$staff.lastName"] },
                    totalSales: 1,
                    totalTransactions: 1,
                    averageTransaction: 1,
                },
            },
            { $sort: { totalSales: -1 } },
        ]);
        return staffPerformance;
    }
    async getInventoryAnalytics(outletId) {
        const products = await this.productModel.find({ isActive: true });
        let totalValue = 0;
        let lowStockItems = 0;
        let outOfStockItems = 0;
        let expiringItems = 0;
        const categoryBreakdown = {};
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        products.forEach((product) => {
            let productStock = 0;
            let productValue = 0;
            if (outletId) {
                const outletInventory = product.inventory.find((inv) => inv.outlet.toString() === outletId);
                productStock = outletInventory?.quantity || 0;
                productValue = productStock * product.costPrice;
            }
            else {
                productStock = product.inventory.reduce((sum, inv) => sum + inv.quantity, 0);
                productValue = productStock * product.costPrice;
            }
            totalValue += productValue;
            const reorderPoint = outletId
                ? product.inventory.find((inv) => inv.outlet.toString() === outletId)?.reorderPoint || 10
                : 10;
            if (productStock === 0) {
                outOfStockItems++;
            }
            else if (productStock <= reorderPoint) {
                lowStockItems++;
            }
            if (product.expiryDate && product.expiryDate <= thirtyDaysFromNow && productStock > 0) {
                expiringItems++;
            }
            if (!categoryBreakdown[product.category]) {
                categoryBreakdown[product.category] = { count: 0, value: 0 };
            }
            categoryBreakdown[product.category].count++;
            categoryBreakdown[product.category].value += productValue;
        });
        return {
            totalProducts: products.length,
            totalValue,
            lowStockItems,
            outOfStockItems,
            expiringItems,
            categoryBreakdown,
        };
    }
    async getFinancialReports(outletId, startDate, endDate) {
        const matchQuery = { status: transaction_schema_1.TransactionStatus.COMPLETED };
        if (outletId) {
            matchQuery.outlet = outletId;
        }
        if (startDate || endDate) {
            matchQuery.createdAt = {};
            if (startDate)
                matchQuery.createdAt.$gte = startDate;
            if (endDate)
                matchQuery.createdAt.$lte = endDate;
        }
        const [revenue, expenses, profitLoss] = await Promise.all([
            this.getRevenueBreakdown(matchQuery),
            this.getExpenseBreakdown(matchQuery),
            this.getProfitLossStatement(matchQuery),
        ]);
        return {
            revenue,
            expenses,
            profitLoss,
        };
    }
    async getTodayTransactionCount(outletId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const query = {
            status: transaction_schema_1.TransactionStatus.COMPLETED,
            createdAt: { $gte: today, $lt: tomorrow },
        };
        if (outletId) {
            query.outlet = outletId;
        }
        return this.transactionModel.countDocuments(query);
    }
    async getTodaySales(outletId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const matchQuery = {
            status: transaction_schema_1.TransactionStatus.COMPLETED,
            createdAt: { $gte: today, $lt: tomorrow },
        };
        if (outletId) {
            matchQuery.outlet = outletId;
        }
        const result = await this.transactionModel.aggregate([
            {
                $match: matchQuery,
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$total" },
                },
            },
        ]);
        return result[0]?.totalSales || 0;
    }
    async getLowStockCount(outletId) {
        const products = await this.productModel.find({ isActive: true });
        let count = 0;
        products.forEach((product) => {
            product.inventory.forEach((inv) => {
                if (outletId && inv.outlet.toString() !== outletId) {
                    return;
                }
                if (inv.quantity <= inv.reorderPoint) {
                    count++;
                }
            });
        });
        return count;
    }
    async getExpiringProductsCount() {
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return this.productModel.countDocuments({
            isActive: true,
            expiryDate: { $lte: thirtyDaysFromNow, $gte: new Date() },
        });
    }
    async getSalesByDay(matchQuery) {
        return this.transactionModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" },
                    },
                    totalSales: { $sum: "$total" },
                    totalTransactions: { $count: {} },
                },
            },
            {
                $project: {
                    date: {
                        $dateFromParts: {
                            year: "$_id.year",
                            month: "$_id.month",
                            day: "$_id.day",
                        },
                    },
                    totalSales: 1,
                    totalTransactions: 1,
                },
            },
            { $sort: { date: 1 } },
        ]);
    }
    async getSalesByOutlet(matchQuery) {
        return this.transactionModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: "$outlet",
                    totalSales: { $sum: "$total" },
                    totalTransactions: { $count: {} },
                },
            },
            {
                $lookup: {
                    from: "outlets",
                    localField: "_id",
                    foreignField: "_id",
                    as: "outlet",
                },
            },
            { $unwind: "$outlet" },
            {
                $project: {
                    outletName: "$outlet.name",
                    totalSales: 1,
                    totalTransactions: 1,
                },
            },
            { $sort: { totalSales: -1 } },
        ]);
    }
    async getTopSellingProducts(matchQuery) {
        return this.transactionModel.aggregate([
            { $match: matchQuery },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.product",
                    totalQuantity: { $sum: "$items.quantity" },
                    totalRevenue: { $sum: "$items.totalPrice" },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $project: {
                    productName: "$product.name",
                    totalQuantity: 1,
                    totalRevenue: 1,
                },
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 10 },
        ]);
    }
    async getPaymentMethodBreakdown(matchQuery) {
        return this.transactionModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: "$paymentMethod",
                    count: { $count: {} },
                    totalAmount: { $sum: "$total" },
                },
            },
            {
                $project: {
                    paymentMethod: "$_id",
                    count: 1,
                    totalAmount: 1,
                },
            },
        ]);
    }
    async getRevenueBreakdown(matchQuery) {
        return this.transactionModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$total" },
                    totalTax: { $sum: "$tax" },
                    totalDiscount: { $sum: "$discount" },
                    netRevenue: { $sum: { $subtract: ["$total", "$tax"] } },
                },
            },
        ]);
    }
    async getExpenseBreakdown(matchQuery) {
        return this.transactionModel.aggregate([
            { $match: matchQuery },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $group: {
                    _id: null,
                    costOfGoodsSold: {
                        $sum: { $multiply: ["$items.quantity", "$product.costPrice"] },
                    },
                },
            },
        ]);
    }
    async getProfitLossStatement(matchQuery) {
        const [revenue, expenses] = await Promise.all([
            this.getRevenueBreakdown(matchQuery),
            this.getExpenseBreakdown(matchQuery),
        ]);
        const totalRevenue = revenue[0]?.totalRevenue || 0;
        const costOfGoodsSold = expenses[0]?.costOfGoodsSold || 0;
        const grossProfit = totalRevenue - costOfGoodsSold;
        const netProfit = grossProfit;
        return {
            totalRevenue,
            costOfGoodsSold,
            grossProfit,
            netProfit,
            profitMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(outlet_schema_1.Outlet.name)),
    __param(4, (0, mongoose_1.InjectModel)(supplier_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AnalyticsService);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsController = void 0;
const common_1 = __webpack_require__(2);
const analytics_service_1 = __webpack_require__(52);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getSystemOverview(outletId) {
        return this.analyticsService.getSystemOverview(outletId);
    }
    async getSalesAnalytics(outletId, startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.analyticsService.getSalesAnalytics(outletId, start, end);
    }
    async getStaffPerformance(outletId, startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.analyticsService.getStaffPerformance(outletId, start, end);
    }
    async getInventoryAnalytics(outletId) {
        return this.analyticsService.getInventoryAnalytics(outletId);
    }
    async getFinancialReports(outletId, startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return this.analyticsService.getFinancialReports(outletId, start, end);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('system-overview'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Query)('outletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getSystemOverview", null);
__decorate([
    (0, common_1.Get)("sales"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Query)('outletId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getSalesAnalytics", null);
__decorate([
    (0, common_1.Get)("staff-performance"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Query)('outletId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getStaffPerformance", null);
__decorate([
    (0, common_1.Get)('inventory'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Query)('outletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getInventoryAnalytics", null);
__decorate([
    (0, common_1.Get)("financial"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Query)('outletId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getFinancialReports", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)("analytics"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof analytics_service_1.AnalyticsService !== "undefined" && analytics_service_1.AnalyticsService) === "function" ? _a : Object])
], AnalyticsController);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const customers_service_1 = __webpack_require__(55);
const customers_controller_1 = __webpack_require__(57);
const customer_schema_1 = __webpack_require__(56);
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: customer_schema_1.Customer.name, schema: customer_schema_1.CustomerSchema }
            ])
        ],
        controllers: [customers_controller_1.CustomersController],
        providers: [customers_service_1.CustomersService],
        exports: [customers_service_1.CustomersService]
    })
], CustomersModule);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
const customer_schema_1 = __webpack_require__(56);
let CustomersService = class CustomersService {
    constructor(customerModel) {
        this.customerModel = customerModel;
    }
    async create(createCustomerDto, userId) {
        if (createCustomerDto.customerType === customer_schema_1.CustomerType.B2B) {
            if (!createCustomerDto.businessName) {
                throw new common_1.BadRequestException("Business name is required for B2B customers");
            }
            if (!createCustomerDto.businessRegistrationNumber) {
                throw new common_1.BadRequestException("Business registration number is required for B2B customers");
            }
        }
        if (createCustomerDto.phone) {
            const existingCustomer = await this.customerModel.findOne({
                phone: createCustomerDto.phone,
                isActive: true
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException("A customer with this phone number already exists");
            }
        }
        if (createCustomerDto.email) {
            const existingCustomer = await this.customerModel.findOne({
                email: createCustomerDto.email,
                isActive: true
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException("A customer with this email already exists");
            }
        }
        if (createCustomerDto.businessRegistrationNumber) {
            const existingCustomer = await this.customerModel.findOne({
                businessRegistrationNumber: createCustomerDto.businessRegistrationNumber,
                isActive: true
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException("A customer with this business registration number already exists");
            }
        }
        const customer = new this.customerModel({
            ...createCustomerDto,
            createdBy: userId,
            lastModifiedBy: userId
        });
        return customer.save();
    }
    async findAll(filterDto) {
        const { page = 1, limit = 10, customerType, creditStatus, assignedOutlet, search, isActive = true } = filterDto;
        const query = { isActive };
        if (customerType) {
            query.customerType = customerType;
        }
        if (creditStatus) {
            query.creditStatus = creditStatus;
        }
        if (assignedOutlet) {
            query.assignedOutlet = assignedOutlet;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { businessName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { businessRegistrationNumber: { $regex: search, $options: "i" } }
            ];
        }
        const skip = (page - 1) * limit;
        const [customers, total] = await Promise.all([
            this.customerModel
                .find(query)
                .populate("assignedOutlet", "name location")
                .populate("createdBy", "name email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.customerModel.countDocuments(query)
        ]);
        return { customers, total };
    }
    async findOne(id) {
        const customer = await this.customerModel
            .findById(id)
            .populate("assignedOutlet", "name location")
            .populate("createdBy", "name email")
            .populate("lastModifiedBy", "name email")
            .populate("creditApprovedBy", "name email")
            .exec();
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
    async update(id, updateCustomerDto, userId) {
        const customer = await this.findOne(id);
        if (updateCustomerDto.customerType === customer_schema_1.CustomerType.B2B || customer.customerType === customer_schema_1.CustomerType.B2B) {
            if (updateCustomerDto.customerType === customer_schema_1.CustomerType.B2B) {
                if (!updateCustomerDto.businessName && !customer.businessName) {
                    throw new common_1.BadRequestException("Business name is required for B2B customers");
                }
                if (!updateCustomerDto.businessRegistrationNumber && !customer.businessRegistrationNumber) {
                    throw new common_1.BadRequestException("Business registration number is required for B2B customers");
                }
            }
        }
        if (updateCustomerDto.phone && updateCustomerDto.phone !== customer.phone) {
            const existingCustomer = await this.customerModel.findOne({
                phone: updateCustomerDto.phone,
                _id: { $ne: id },
                isActive: true
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException("A customer with this phone number already exists");
            }
        }
        if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
            const existingCustomer = await this.customerModel.findOne({
                email: updateCustomerDto.email,
                _id: { $ne: id },
                isActive: true
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException("A customer with this email already exists");
            }
        }
        if (updateCustomerDto.businessRegistrationNumber &&
            updateCustomerDto.businessRegistrationNumber !== customer.businessRegistrationNumber) {
            const existingCustomer = await this.customerModel.findOne({
                businessRegistrationNumber: updateCustomerDto.businessRegistrationNumber,
                _id: { $ne: id },
                isActive: true
            });
            if (existingCustomer) {
                throw new common_1.BadRequestException("A customer with this business registration number already exists");
            }
        }
        const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, {
            ...updateCustomerDto,
            lastModifiedBy: userId
        }, { new: true, runValidators: true })
            .populate("assignedOutlet", "name location")
            .populate("createdBy", "name email")
            .populate("lastModifiedBy", "name email")
            .populate("creditApprovedBy", "name email")
            .exec();
        return updatedCustomer;
    }
    async updateCreditLimit(customerId, newCreditLimit, approvedBy) {
        const customer = await this.findOne(customerId);
        if (customer.customerType !== customer_schema_1.CustomerType.B2B) {
            throw new common_1.BadRequestException("Credit limits can only be set for B2B customers");
        }
        if (newCreditLimit < 0) {
            throw new common_1.BadRequestException("Credit limit cannot be negative");
        }
        if (newCreditLimit < customer.currentCreditBalance) {
            throw new common_1.BadRequestException(`New credit limit (${newCreditLimit}) cannot be less than current credit balance (${customer.currentCreditBalance})`);
        }
        const updatedCustomer = await this.customerModel.findByIdAndUpdate(customerId, {
            creditLimit: newCreditLimit,
            creditApprovedBy: approvedBy,
            creditApprovedDate: new Date(),
            lastModifiedBy: approvedBy
        }, { new: true, runValidators: true })
            .populate("assignedOutlet", "name location")
            .populate("creditApprovedBy", "name email")
            .exec();
        return updatedCustomer;
    }
    async updateCreditBalance(customerId, amount) {
        const customer = await this.customerModel.findByIdAndUpdate(customerId, {
            $inc: { currentCreditBalance: amount },
            $set: { lastModifiedBy: customerId }
        }, { new: true, runValidators: true }).exec();
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${customerId} not found`);
        }
        await this.updateCreditStatus(customer);
        return customer;
    }
    async updateCreditStatus(customer) {
        let newStatus = customer.creditStatus;
        if (customer.currentCreditBalance > customer.creditLimit) {
            newStatus = customer_schema_1.CreditStatus.SUSPENDED;
        }
        else if (customer.currentCreditBalance > 0) {
            if (customer.creditStatus === customer_schema_1.CreditStatus.BLOCKED) {
                newStatus = customer_schema_1.CreditStatus.OVERDUE;
            }
        }
        else {
            newStatus = customer_schema_1.CreditStatus.GOOD;
        }
        if (newStatus !== customer.creditStatus) {
            await this.customerModel.findByIdAndUpdate(customer._id, { creditStatus: newStatus }).exec();
        }
    }
    async remove(id) {
        const customer = await this.findOne(id);
        await this.customerModel.findByIdAndUpdate(id, { isActive: false }).exec();
    }
    async getCustomersByOutlet(outletId) {
        return this.customerModel
            .find({
            assignedOutlet: outletId,
            isActive: true
        })
            .sort({ name: 1 })
            .exec();
    }
    async getCreditCustomers() {
        return this.customerModel
            .find({
            customerType: customer_schema_1.CustomerType.B2B,
            creditLimit: { $gt: 0 },
            isActive: true
        })
            .populate("assignedOutlet", "name location")
            .sort({ name: 1 })
            .exec();
    }
    async getOverdueCustomers() {
        return this.customerModel
            .find({
            creditStatus: { $in: [customer_schema_1.CreditStatus.OVERDUE, customer_schema_1.CreditStatus.SUSPENDED] },
            isActive: true
        })
            .populate("assignedOutlet", "name location")
            .sort({ currentCreditBalance: -1 })
            .exec();
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CustomersService);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerSchema = exports.Customer = exports.CreditStatus = exports.PaymentMethod = exports.CustomerType = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
var CustomerType;
(function (CustomerType) {
    CustomerType["WALK_IN"] = "walk_in";
    CustomerType["B2B"] = "b2b";
    CustomerType["INSTITUTIONAL"] = "institutional";
})(CustomerType || (exports.CustomerType = CustomerType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["AFRIMONEY"] = "afrimoney";
    PaymentMethod["MOBILE_MONEY"] = "mobile_money";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["CREDIT"] = "credit";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var CreditStatus;
(function (CreditStatus) {
    CreditStatus["GOOD"] = "good";
    CreditStatus["OVERDUE"] = "overdue";
    CreditStatus["SUSPENDED"] = "suspended";
    CreditStatus["BLOCKED"] = "blocked";
})(CreditStatus || (exports.CreditStatus = CreditStatus = {}));
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: CustomerType }),
    __metadata("design:type", String)
], Customer.prototype, "customerType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "businessName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "businessRegistrationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "taxIdentificationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            street: String,
            city: String,
            region: String,
            postalCode: String,
            country: String
        }
    }),
    __metadata("design:type", Object)
], Customer.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "contactPerson", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: String, enum: PaymentMethod }]),
    __metadata("design:type", Array)
], Customer.prototype, "preferredPaymentMethods", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "creditLimit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "currentCreditBalance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 30 }),
    __metadata("design:type", Number)
], Customer.prototype, "creditTermDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: CreditStatus, default: CreditStatus.GOOD }),
    __metadata("design:type", String)
], Customer.prototype, "creditStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Customer.prototype, "creditApprovedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Customer.prototype, "creditApprovedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isWholesaleCustomer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0, max: 50 }),
    __metadata("design:type", Number)
], Customer.prototype, "discountPercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Outlet" }),
    __metadata("design:type", typeof (_c = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _c : Object)
], Customer.prototype, "assignedOutlet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "totalPurchases", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "lifetimeValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Customer.prototype, "lastPurchaseDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "averageOrderValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", typeof (_e = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _e : Object)
], Customer.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", typeof (_f = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _f : Object)
], Customer.prototype, "lastModifiedBy", void 0);
exports.Customer = Customer = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Customer);
exports.CustomerSchema = mongoose_1.SchemaFactory.createForClass(Customer);
exports.CustomerSchema.index({ customerType: 1 });
exports.CustomerSchema.index({ phone: 1 });
exports.CustomerSchema.index({ email: 1 });
exports.CustomerSchema.index({ businessRegistrationNumber: 1 });
exports.CustomerSchema.index({ assignedOutlet: 1 });
exports.CustomerSchema.index({ creditStatus: 1 });


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomersController = void 0;
const common_1 = __webpack_require__(2);
const customers_service_1 = __webpack_require__(55);
const customer_dto_1 = __webpack_require__(58);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let CustomersController = class CustomersController {
    constructor(customersService) {
        this.customersService = customersService;
    }
    create(createCustomerDto, req) {
        return this.customersService.create(createCustomerDto, req.user.userId);
    }
    findAll(filterDto) {
        return this.customersService.findAll(filterDto);
    }
    findByOutlet(outletId) {
        return this.customersService.getCustomersByOutlet(outletId);
    }
    getCreditCustomers() {
        return this.customersService.getCreditCustomers();
    }
    getOverdueCustomers() {
        return this.customersService.getOverdueCustomers();
    }
    findOne(id) {
        return this.customersService.findOne(id);
    }
    update(id, updateCustomerDto, req) {
        return this.customersService.update(id, updateCustomerDto, req.user.userId);
    }
    updateCreditLimit(id, updateCreditLimitDto, req) {
        return this.customersService.updateCreditLimit(id, updateCreditLimitDto.creditLimit, req.user.userId);
    }
    remove(id) {
        return this.customersService.remove(id);
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof customer_dto_1.CreateCustomerDto !== "undefined" && customer_dto_1.CreateCustomerDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof customer_dto_1.CustomerFilterDto !== "undefined" && customer_dto_1.CustomerFilterDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("by-outlet/:outletId"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Param)("outletId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findByOutlet", null);
__decorate([
    (0, common_1.Get)("credit-customers"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "getCreditCustomers", null);
__decorate([
    (0, common_1.Get)("overdue-customers"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "getOverdueCustomers", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof customer_dto_1.UpdateCustomerDto !== "undefined" && customer_dto_1.UpdateCustomerDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id/credit-limit"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof customer_dto_1.UpdateCreditLimitDto !== "undefined" && customer_dto_1.UpdateCreditLimitDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "updateCreditLimit", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "remove", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)("customers"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof customers_service_1.CustomersService !== "undefined" && customers_service_1.CustomersService) === "function" ? _a : Object])
], CustomersController);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCreditLimitDto = exports.CustomerFilterDto = exports.UpdateCustomerDto = exports.CreateCustomerDto = exports.AddressDto = void 0;
const class_validator_1 = __webpack_require__(22);
const class_transformer_1 = __webpack_require__(23);
const customer_schema_1 = __webpack_require__(56);
class AddressDto {
}
exports.AddressDto = AddressDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressDto.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddressDto.prototype, "country", void 0);
class CreateCustomerDto {
    constructor() {
        this.creditLimit = 0;
        this.creditTermDays = 30;
        this.isWholesaleCustomer = false;
        this.discountPercentage = 0;
    }
}
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(customer_schema_1.CustomerType),
    __metadata("design:type", typeof (_a = typeof customer_schema_1.CustomerType !== "undefined" && customer_schema_1.CustomerType) === "function" ? _a : Object)
], CreateCustomerDto.prototype, "customerType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "businessName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "businessRegistrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "taxIdentificationNumber", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AddressDto)
], CreateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "contactPerson", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(customer_schema_1.PaymentMethod, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCustomerDto.prototype, "preferredPaymentMethods", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "creditLimit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(7),
    (0, class_validator_1.Max)(365),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "creditTermDays", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCustomerDto.prototype, "isWholesaleCustomer", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCustomerDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "assignedOutlet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "notes", void 0);
class UpdateCustomerDto {
}
exports.UpdateCustomerDto = UpdateCustomerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(customer_schema_1.CustomerType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof customer_schema_1.CustomerType !== "undefined" && customer_schema_1.CustomerType) === "function" ? _b : Object)
], UpdateCustomerDto.prototype, "customerType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "businessName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "businessRegistrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "taxIdentificationNumber", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AddressDto)
], UpdateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "contactPerson", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(customer_schema_1.PaymentMethod, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCustomerDto.prototype, "preferredPaymentMethods", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(7),
    (0, class_validator_1.Max)(365),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCustomerDto.prototype, "creditTermDays", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCustomerDto.prototype, "isWholesaleCustomer", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCustomerDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "assignedOutlet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCustomerDto.prototype, "isActive", void 0);
class CustomerFilterDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.isActive = true;
    }
}
exports.CustomerFilterDto = CustomerFilterDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CustomerFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CustomerFilterDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(customer_schema_1.CustomerType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof customer_schema_1.CustomerType !== "undefined" && customer_schema_1.CustomerType) === "function" ? _c : Object)
], CustomerFilterDto.prototype, "customerType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(customer_schema_1.CreditStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof customer_schema_1.CreditStatus !== "undefined" && customer_schema_1.CreditStatus) === "function" ? _d : Object)
], CustomerFilterDto.prototype, "creditStatus", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerFilterDto.prototype, "assignedOutlet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CustomerFilterDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CustomerFilterDto.prototype, "isActive", void 0);
class UpdateCreditLimitDto {
}
exports.UpdateCreditLimitDto = UpdateCreditLimitDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCreditLimitDto.prototype, "creditLimit", void 0);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicesModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const invoices_service_1 = __webpack_require__(60);
const invoices_controller_1 = __webpack_require__(62);
const invoice_schema_1 = __webpack_require__(61);
const customer_schema_1 = __webpack_require__(56);
const product_schema_1 = __webpack_require__(35);
const customers_module_1 = __webpack_require__(54);
let InvoicesModule = class InvoicesModule {
};
exports.InvoicesModule = InvoicesModule;
exports.InvoicesModule = InvoicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: invoice_schema_1.Invoice.name, schema: invoice_schema_1.InvoiceSchema },
                { name: customer_schema_1.Customer.name, schema: customer_schema_1.CustomerSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }
            ]),
            customers_module_1.CustomersModule
        ],
        controllers: [invoices_controller_1.InvoicesController],
        providers: [invoices_service_1.InvoicesService],
        exports: [invoices_service_1.InvoicesService]
    })
], InvoicesModule);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicesService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
const invoice_schema_1 = __webpack_require__(61);
const customer_schema_1 = __webpack_require__(56);
const product_schema_1 = __webpack_require__(35);
const customers_service_1 = __webpack_require__(55);
let InvoicesService = class InvoicesService {
    constructor(invoiceModel, customerModel, productModel, customersService) {
        this.invoiceModel = invoiceModel;
        this.customerModel = customerModel;
        this.productModel = productModel;
        this.customersService = customersService;
    }
    async create(createInvoiceDto, userId) {
        const customer = await this.customerModel.findById(createInvoiceDto.customer);
        if (!customer) {
            throw new common_1.NotFoundException("Customer not found");
        }
        const calculatedInvoice = await this.calculateInvoiceTotals(createInvoiceDto);
        const invoiceNumber = await this.generateInvoiceNumber(createInvoiceDto.invoiceType);
        let dueDate;
        if (createInvoiceDto.isCreditSale && customer.customerType === customer_schema_1.CustomerType.B2B) {
            const dueDateCalc = new Date(createInvoiceDto.issueDate);
            dueDateCalc.setDate(dueDateCalc.getDate() + (customer.creditTermDays || 30));
            dueDate = dueDateCalc;
        }
        if (createInvoiceDto.isCreditSale && customer.customerType === customer_schema_1.CustomerType.B2B) {
            const newCreditBalance = customer.currentCreditBalance + calculatedInvoice.totalAmount;
            if (newCreditBalance > customer.creditLimit) {
                throw new common_1.BadRequestException(`Credit limit exceeded. Available credit: ${customer.creditLimit - customer.currentCreditBalance}`);
            }
        }
        const invoice = new this.invoiceModel({
            ...calculatedInvoice,
            invoiceNumber,
            dueDate,
            amountDue: calculatedInvoice.totalAmount,
            createdBy: userId,
            lastModifiedBy: userId
        });
        const savedInvoice = await invoice.save();
        if (createInvoiceDto.isCreditSale && customer.customerType === customer_schema_1.CustomerType.B2B) {
            await this.customersService.updateCreditBalance(customer._id.toString(), calculatedInvoice.totalAmount);
        }
        return savedInvoice;
    }
    async findAll(filterDto) {
        const { page = 1, limit = 10, status, invoiceType, customer, outlet, startDate, endDate, search } = filterDto;
        const query = {};
        if (status) {
            query.status = status;
        }
        if (invoiceType) {
            query.invoiceType = invoiceType;
        }
        if (customer) {
            query.customer = customer;
        }
        if (outlet) {
            query.outlet = outlet;
        }
        if (startDate || endDate) {
            query.issueDate = {};
            if (startDate) {
                query.issueDate.$gte = new Date(startDate);
            }
            if (endDate) {
                query.issueDate.$lte = new Date(endDate);
            }
        }
        if (search) {
            query.$or = [
                { invoiceNumber: { $regex: search, $options: "i" } },
                { purchaseOrderNumber: { $regex: search, $options: "i" } }
            ];
        }
        const skip = (page - 1) * limit;
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
        ]);
        return { invoices, total };
    }
    async findOne(id) {
        const invoice = await this.invoiceModel
            .findById(id)
            .populate("customer")
            .populate("outlet", "name location")
            .populate("createdBy", "name email")
            .populate("approvedBy", "name email")
            .populate("lastModifiedBy", "name email")
            .populate("items.product")
            .exec();
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        return invoice;
    }
    async update(id, updateInvoiceDto, userId) {
        const invoice = await this.findOne(id);
        if (invoice.status !== invoice_schema_1.InvoiceStatus.DRAFT) {
            throw new common_1.BadRequestException("Only draft invoices can be updated");
        }
        let calculatedData = updateInvoiceDto;
        if (updateInvoiceDto.items) {
            calculatedData = await this.calculateInvoiceTotals(updateInvoiceDto);
        }
        const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, {
            ...calculatedData,
            lastModifiedBy: userId
        }, { new: true, runValidators: true })
            .populate("customer")
            .populate("outlet", "name location")
            .populate("items.product")
            .exec();
        return updatedInvoice;
    }
    async approve(id, userId) {
        const invoice = await this.findOne(id);
        if (invoice.status !== invoice_schema_1.InvoiceStatus.DRAFT && invoice.status !== invoice_schema_1.InvoiceStatus.PENDING) {
            throw new common_1.BadRequestException("Only draft or pending invoices can be approved");
        }
        const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, {
            status: invoice_schema_1.InvoiceStatus.APPROVED,
            approvedBy: userId,
            approvedDate: new Date(),
            lastModifiedBy: userId
        }, { new: true })
            .populate("customer")
            .populate("outlet", "name location")
            .exec();
        return updatedInvoice;
    }
    async addPayment(id, addPaymentDto, userId) {
        const invoice = await this.findOne(id);
        if (invoice.status === invoice_schema_1.InvoiceStatus.PAID || invoice.status === invoice_schema_1.InvoiceStatus.CANCELLED) {
            throw new common_1.BadRequestException("Cannot add payment to this invoice");
        }
        const { amount, paymentMethod, paymentReference, paymentNotes } = addPaymentDto;
        if (amount <= 0) {
            throw new common_1.BadRequestException("Payment amount must be greater than zero");
        }
        if (amount > invoice.amountDue) {
            throw new common_1.BadRequestException("Payment amount cannot exceed amount due");
        }
        const paymentRecord = {
            amount,
            paymentMethod,
            paymentDate: new Date(),
            paymentReference,
            paymentNotes,
            recordedBy: userId
        };
        const newAmountPaid = invoice.amountPaid + amount;
        const newAmountDue = invoice.totalAmount - newAmountPaid;
        let newStatus = invoice.status;
        if (newAmountDue === 0) {
            newStatus = invoice_schema_1.InvoiceStatus.PAID;
        }
        else if (newAmountPaid > 0) {
            newStatus = invoice_schema_1.InvoiceStatus.PARTIALLY_PAID;
        }
        const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, {
            $push: { payments: paymentRecord },
            amountPaid: newAmountPaid,
            amountDue: newAmountDue,
            status: newStatus,
            lastModifiedBy: userId
        }, { new: true })
            .populate("customer")
            .populate("outlet", "name location")
            .exec();
        if (invoice.isCreditSale) {
            await this.customersService.updateCreditBalance(invoice.customer._id.toString(), -amount);
        }
        return updatedInvoice;
    }
    async cancel(id, userId) {
        const invoice = await this.findOne(id);
        if (invoice.status === invoice_schema_1.InvoiceStatus.PAID || invoice.status === invoice_schema_1.InvoiceStatus.CANCELLED) {
            throw new common_1.BadRequestException("Cannot cancel this invoice");
        }
        if (invoice.isCreditSale && invoice.amountPaid === 0) {
            await this.customersService.updateCreditBalance(invoice.customer._id.toString(), -invoice.totalAmount);
        }
        const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, {
            status: invoice_schema_1.InvoiceStatus.CANCELLED,
            lastModifiedBy: userId
        }, { new: true })
            .populate("customer")
            .populate("outlet", "name location")
            .exec();
        return updatedInvoice;
    }
    async convertProformaToInvoice(proformaId, userId) {
        const proforma = await this.findOne(proformaId);
        if (proforma.invoiceType !== invoice_schema_1.InvoiceType.PROFORMA) {
            throw new common_1.BadRequestException("Only proforma invoices can be converted");
        }
        if (proforma.status !== invoice_schema_1.InvoiceStatus.APPROVED) {
            throw new common_1.BadRequestException("Proforma must be approved before conversion");
        }
        const invoiceData = {
            ...proforma.toObject(),
            invoiceType: invoice_schema_1.InvoiceType.INVOICE,
            status: invoice_schema_1.InvoiceStatus.PENDING,
            proformaInvoice: proforma._id,
            createdBy: userId,
            lastModifiedBy: userId
        };
        delete invoiceData._id;
        delete invoiceData.createdAt;
        delete invoiceData.updatedAt;
        delete invoiceData.invoiceNumber;
        const invoiceNumber = await this.generateInvoiceNumber(invoice_schema_1.InvoiceType.INVOICE);
        invoiceData.invoiceNumber = invoiceNumber;
        const invoice = new this.invoiceModel(invoiceData);
        return invoice.save();
    }
    async calculateInvoiceTotals(invoiceData) {
        let subtotal = 0;
        const calculatedItems = [];
        for (const item of invoiceData.items) {
            const product = await this.productModel.findById(item.product);
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${item.product} not found`);
            }
            const lineTotal = (item.quantity * item.unitPrice) * (1 - (item.discountPercentage || 0) / 100);
            calculatedItems.push({
                ...item,
                productName: product.name,
                lineTotal
            });
            subtotal += lineTotal;
        }
        const discountAmount = subtotal * ((invoiceData.discountPercentage || 0) / 100);
        const discountedSubtotal = subtotal - discountAmount;
        const taxes = invoiceData.taxes || [];
        let totalTaxAmount = 0;
        const calculatedTaxes = taxes.map(tax => {
            const taxableAmount = tax.taxableAmount || discountedSubtotal;
            const taxAmount = taxableAmount * (tax.taxRate / 100);
            totalTaxAmount += taxAmount;
            return {
                ...tax,
                taxableAmount,
                taxAmount
            };
        });
        const totalAmount = discountedSubtotal + totalTaxAmount;
        return {
            ...invoiceData,
            items: calculatedItems,
            subtotal,
            discountAmount,
            taxes: calculatedTaxes,
            totalTaxAmount,
            totalAmount
        };
    }
    async generateInvoiceNumber(invoiceType) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        let prefix = "";
        switch (invoiceType) {
            case invoice_schema_1.InvoiceType.PROFORMA:
                prefix = "PF";
                break;
            case invoice_schema_1.InvoiceType.INVOICE:
                prefix = "INV";
                break;
            case invoice_schema_1.InvoiceType.CREDIT_NOTE:
                prefix = "CN";
                break;
            case invoice_schema_1.InvoiceType.DEBIT_NOTE:
                prefix = "DN";
                break;
        }
        const baseNumber = `${prefix}${year}${month}`;
        const lastInvoice = await this.invoiceModel
            .findOne({
            invoiceNumber: { $regex: `^${baseNumber}` },
            invoiceType
        })
            .sort({ invoiceNumber: -1 })
            .exec();
        let sequence = 1;
        if (lastInvoice) {
            const lastSequence = parseInt(lastInvoice.invoiceNumber.slice(-4));
            sequence = lastSequence + 1;
        }
        return `${baseNumber}${String(sequence).padStart(4, "0")}`;
    }
    async getInvoicesByCustomer(customerId) {
        return this.invoiceModel
            .find({ customer: customerId })
            .populate("outlet", "name location")
            .sort({ createdAt: -1 })
            .exec();
    }
    async getOverdueInvoices() {
        const today = new Date();
        return this.invoiceModel
            .find({
            status: { $in: [invoice_schema_1.InvoiceStatus.APPROVED, invoice_schema_1.InvoiceStatus.SENT, invoice_schema_1.InvoiceStatus.PARTIALLY_PAID] },
            dueDate: { $lt: today },
            amountDue: { $gt: 0 }
        })
            .populate("customer", "name businessName")
            .populate("outlet", "name location")
            .sort({ dueDate: 1 })
            .exec();
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(1, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof customers_service_1.CustomersService !== "undefined" && customers_service_1.CustomersService) === "function" ? _d : Object])
], InvoicesService);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoiceSchema = exports.Invoice = exports.DeliveryAddress = exports.PaymentRecord = exports.TaxBreakdown = exports.InvoiceItem = exports.TaxType = exports.PaymentMethod = exports.InvoiceStatus = exports.InvoiceType = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(13);
var InvoiceType;
(function (InvoiceType) {
    InvoiceType["PROFORMA"] = "proforma";
    InvoiceType["INVOICE"] = "invoice";
    InvoiceType["CREDIT_NOTE"] = "credit_note";
    InvoiceType["DEBIT_NOTE"] = "debit_note";
})(InvoiceType || (exports.InvoiceType = InvoiceType = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "draft";
    InvoiceStatus["PENDING"] = "pending";
    InvoiceStatus["APPROVED"] = "approved";
    InvoiceStatus["SENT"] = "sent";
    InvoiceStatus["PAID"] = "paid";
    InvoiceStatus["PARTIALLY_PAID"] = "partially_paid";
    InvoiceStatus["OVERDUE"] = "overdue";
    InvoiceStatus["CANCELLED"] = "cancelled";
    InvoiceStatus["VOID"] = "void";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["AFRIMONEY"] = "afrimoney";
    PaymentMethod["MOBILE_MONEY"] = "mobile_money";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["CREDIT"] = "credit";
    PaymentMethod["CHEQUE"] = "cheque";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var TaxType;
(function (TaxType) {
    TaxType["VAT"] = "vat";
    TaxType["WITHHOLDING_TAX"] = "withholding_tax";
    TaxType["EXCISE_DUTY"] = "excise_duty";
    TaxType["IMPORT_DUTY"] = "import_duty";
})(TaxType || (exports.TaxType = TaxType = {}));
let InvoiceItem = class InvoiceItem {
};
exports.InvoiceItem = InvoiceItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Product", required: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], InvoiceItem.prototype, "product", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "productName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0, max: 100 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "discountPercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "lineTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], InvoiceItem.prototype, "notes", void 0);
exports.InvoiceItem = InvoiceItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], InvoiceItem);
let TaxBreakdown = class TaxBreakdown {
};
exports.TaxBreakdown = TaxBreakdown;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: TaxType }),
    __metadata("design:type", String)
], TaxBreakdown.prototype, "taxType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TaxBreakdown.prototype, "taxName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 100 }),
    __metadata("design:type", Number)
], TaxBreakdown.prototype, "taxRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TaxBreakdown.prototype, "taxableAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], TaxBreakdown.prototype, "taxAmount", void 0);
exports.TaxBreakdown = TaxBreakdown = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TaxBreakdown);
let PaymentRecord = class PaymentRecord {
};
exports.PaymentRecord = PaymentRecord;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], PaymentRecord.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: PaymentMethod }),
    __metadata("design:type", String)
], PaymentRecord.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PaymentRecord.prototype, "paymentDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentRecord.prototype, "paymentReference", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentRecord.prototype, "paymentNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", typeof (_c = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _c : Object)
], PaymentRecord.prototype, "recordedBy", void 0);
exports.PaymentRecord = PaymentRecord = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PaymentRecord);
let DeliveryAddress = class DeliveryAddress {
};
exports.DeliveryAddress = DeliveryAddress;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "postalCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "country", void 0);
exports.DeliveryAddress = DeliveryAddress = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DeliveryAddress);
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: InvoiceType }),
    __metadata("design:type", String)
], Invoice.prototype, "invoiceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: InvoiceStatus, default: InvoiceStatus.DRAFT }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Customer", required: true }),
    __metadata("design:type", typeof (_d = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _d : Object)
], Invoice.prototype, "customer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Outlet", required: true }),
    __metadata("design:type", typeof (_e = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _e : Object)
], Invoice.prototype, "outlet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Invoice.prototype, "issueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], Invoice.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], Invoice.prototype, "validUntil", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [InvoiceItem], required: true }),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0, max: 100 }),
    __metadata("design:type", Number)
], Invoice.prototype, "discountPercentage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [TaxBreakdown] }),
    __metadata("design:type", Array)
], Invoice.prototype, "taxes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalTaxAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "amountPaid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "amountDue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [PaymentRecord] }),
    __metadata("design:type", Array)
], Invoice.prototype, "payments", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: String, enum: PaymentMethod }]),
    __metadata("design:type", Array)
], Invoice.prototype, "acceptedPaymentMethods", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "isCreditSale", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 30 }),
    __metadata("design:type", Number)
], Invoice.prototype, "creditTermDays", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Invoice.prototype, "customerNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Invoice.prototype, "internalNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Invoice.prototype, "termsAndConditions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Invoice.prototype, "purchaseOrderNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Invoice" }),
    __metadata("design:type", typeof (_j = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _j : Object)
], Invoice.prototype, "originalInvoice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "Invoice" }),
    __metadata("design:type", typeof (_k = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _k : Object)
], Invoice.prototype, "proformaInvoice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", typeof (_l = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _l : Object)
], Invoice.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", typeof (_m = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _m : Object)
], Invoice.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_o = typeof Date !== "undefined" && Date) === "function" ? _o : Object)
], Invoice.prototype, "approvedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User" }),
    __metadata("design:type", typeof (_p = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _p : Object)
], Invoice.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "isPrinted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Invoice.prototype, "isEmailSent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: DeliveryAddress }),
    __metadata("design:type", DeliveryAddress)
], Invoice.prototype, "deliveryAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", typeof (_q = typeof Date !== "undefined" && Date) === "function" ? _q : Object)
], Invoice.prototype, "deliveryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Invoice.prototype, "deliveryNotes", void 0);
exports.Invoice = Invoice = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Invoice);
exports.InvoiceSchema = mongoose_1.SchemaFactory.createForClass(Invoice);
exports.InvoiceSchema.index({ invoiceNumber: 1 }, { unique: true });
exports.InvoiceSchema.index({ customer: 1 });
exports.InvoiceSchema.index({ outlet: 1 });
exports.InvoiceSchema.index({ status: 1 });
exports.InvoiceSchema.index({ invoiceType: 1 });
exports.InvoiceSchema.index({ issueDate: 1 });
exports.InvoiceSchema.index({ dueDate: 1 });
exports.InvoiceSchema.index({ createdBy: 1 });
exports.InvoiceSchema.index({ "customer": 1, "status": 1 });
exports.InvoiceSchema.index({ "outlet": 1, "issueDate": 1 });


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvoicesController = void 0;
const common_1 = __webpack_require__(2);
const invoices_service_1 = __webpack_require__(60);
const invoice_dto_1 = __webpack_require__(63);
const jwt_auth_guard_1 = __webpack_require__(17);
const roles_guard_1 = __webpack_require__(18);
const roles_decorator_1 = __webpack_require__(19);
const user_schema_1 = __webpack_require__(12);
let InvoicesController = class InvoicesController {
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    create(createInvoiceDto, req) {
        return this.invoicesService.create(createInvoiceDto, req.user.userId);
    }
    findAll(filterDto) {
        return this.invoicesService.findAll(filterDto);
    }
    getOverdueInvoices() {
        return this.invoicesService.getOverdueInvoices();
    }
    getInvoicesByCustomer(customerId) {
        return this.invoicesService.getInvoicesByCustomer(customerId);
    }
    findOne(id) {
        return this.invoicesService.findOne(id);
    }
    update(id, updateInvoiceDto, req) {
        return this.invoicesService.update(id, updateInvoiceDto, req.user.userId);
    }
    approve(id, req) {
        return this.invoicesService.approve(id, req.user.userId);
    }
    cancel(id, req) {
        return this.invoicesService.cancel(id, req.user.userId);
    }
    addPayment(id, addPaymentDto, req) {
        return this.invoicesService.addPayment(id, addPaymentDto, req.user.userId);
    }
    convertProformaToInvoice(id, req) {
        return this.invoicesService.convertProformaToInvoice(id, req.user.userId);
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof invoice_dto_1.CreateInvoiceDto !== "undefined" && invoice_dto_1.CreateInvoiceDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof invoice_dto_1.InvoiceFilterDto !== "undefined" && invoice_dto_1.InvoiceFilterDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("overdue"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "getOverdueInvoices", null);
__decorate([
    (0, common_1.Get)("customer/:customerId"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Param)("customerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "getInvoicesByCustomer", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof invoice_dto_1.UpdateInvoiceDto !== "undefined" && invoice_dto_1.UpdateInvoiceDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id/approve"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(":id/cancel"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(":id/payments"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER, user_schema_1.UserRole.CASHIER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof invoice_dto_1.AddPaymentDto !== "undefined" && invoice_dto_1.AddPaymentDto) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "addPayment", null);
__decorate([
    (0, common_1.Post)(":id/convert-to-invoice"),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.MANAGER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "convertProformaToInvoice", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, common_1.Controller)("invoices"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof invoices_service_1.InvoicesService !== "undefined" && invoices_service_1.InvoicesService) === "function" ? _a : Object])
], InvoicesController);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddPaymentDto = exports.InvoiceFilterDto = exports.UpdateInvoiceDto = exports.CreateInvoiceDto = exports.CreateTaxBreakdownDto = exports.CreateInvoiceItemDto = void 0;
const class_validator_1 = __webpack_require__(22);
const class_transformer_1 = __webpack_require__(23);
const invoice_schema_1 = __webpack_require__(61);
class CreateInvoiceItemDto {
    constructor() {
        this.discountPercentage = 0;
    }
}
exports.CreateInvoiceItemDto = CreateInvoiceItemDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateInvoiceItemDto.prototype, "product", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "unitPrice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceItemDto.prototype, "notes", void 0);
class CreateTaxBreakdownDto {
}
exports.CreateTaxBreakdownDto = CreateTaxBreakdownDto;
__decorate([
    (0, class_validator_1.IsEnum)(invoice_schema_1.TaxType),
    __metadata("design:type", typeof (_a = typeof invoice_schema_1.TaxType !== "undefined" && invoice_schema_1.TaxType) === "function" ? _a : Object)
], CreateTaxBreakdownDto.prototype, "taxType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaxBreakdownDto.prototype, "taxName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateTaxBreakdownDto.prototype, "taxRate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTaxBreakdownDto.prototype, "taxableAmount", void 0);
class CreateInvoiceDto {
    constructor() {
        this.discountPercentage = 0;
        this.isCreditSale = false;
        this.creditTermDays = 30;
    }
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, class_validator_1.IsEnum)(invoice_schema_1.InvoiceType),
    __metadata("design:type", typeof (_b = typeof invoice_schema_1.InvoiceType !== "undefined" && invoice_schema_1.InvoiceType) === "function" ? _b : Object)
], CreateInvoiceDto.prototype, "invoiceType", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "customer", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "outlet", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "issueDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "validUntil", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateInvoiceItemDto),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateTaxBreakdownDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "taxes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(invoice_schema_1.PaymentMethod, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "acceptedPaymentMethods", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateInvoiceDto.prototype, "isCreditSale", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "creditTermDays", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "customerNotes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "internalNotes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "termsAndConditions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "purchaseOrderNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateInvoiceDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "deliveryDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "deliveryNotes", void 0);
class UpdateInvoiceDto {
}
exports.UpdateInvoiceDto = UpdateInvoiceDto;
__decorate([
    (0, class_validator_1.IsEnum)(invoice_schema_1.InvoiceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof invoice_schema_1.InvoiceStatus !== "undefined" && invoice_schema_1.InvoiceStatus) === "function" ? _c : Object)
], UpdateInvoiceDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "issueDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "validUntil", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateInvoiceItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateInvoiceDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateInvoiceDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateTaxBreakdownDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateInvoiceDto.prototype, "taxes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(invoice_schema_1.PaymentMethod, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateInvoiceDto.prototype, "acceptedPaymentMethods", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "customerNotes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "internalNotes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "termsAndConditions", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "purchaseOrderNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateInvoiceDto.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "deliveryDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInvoiceDto.prototype, "deliveryNotes", void 0);
class InvoiceFilterDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.InvoiceFilterDto = InvoiceFilterDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], InvoiceFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], InvoiceFilterDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(invoice_schema_1.InvoiceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof invoice_schema_1.InvoiceStatus !== "undefined" && invoice_schema_1.InvoiceStatus) === "function" ? _d : Object)
], InvoiceFilterDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(invoice_schema_1.InvoiceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_e = typeof invoice_schema_1.InvoiceType !== "undefined" && invoice_schema_1.InvoiceType) === "function" ? _e : Object)
], InvoiceFilterDto.prototype, "invoiceType", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvoiceFilterDto.prototype, "customer", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvoiceFilterDto.prototype, "outlet", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvoiceFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvoiceFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvoiceFilterDto.prototype, "search", void 0);
class AddPaymentDto {
}
exports.AddPaymentDto = AddPaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AddPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(invoice_schema_1.PaymentMethod),
    __metadata("design:type", typeof (_f = typeof invoice_schema_1.PaymentMethod !== "undefined" && invoice_schema_1.PaymentMethod) === "function" ? _f : Object)
], AddPaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddPaymentDto.prototype, "paymentReference", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddPaymentDto.prototype, "paymentNotes", void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ["http://localhost:3000", "https://your-frontend-domain.com"],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix("api");
    const port = process.env.PORT ? Number(process.env.PORT) : 3001;
    await app.listen(port);
    console.log(`🚀 Pharmacy POS API running on port ${port}`);
}
bootstrap();

})();

/******/ })()
;