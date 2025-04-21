"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
const statistics_controller_1 = require("./statistics.controller");
const statistics_model_1 = require("../../models/statistics.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../user/user.module");
const date_module_1 = require("../date/date.module");
const tasks_module_1 = require("../tasks/tasks.module");
let StatisticsModule = class StatisticsModule {
};
exports.StatisticsModule = StatisticsModule;
exports.StatisticsModule = StatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: statistics_model_1.StatisticsModel,
                    schemaOptions: {
                        collection: 'Statistics',
                    },
                },
            ]),
            (0, common_1.forwardRef)(() => tasks_module_1.TaskModule),
            config_1.ConfigModule,
            user_module_1.UserModule,
            date_module_1.DateModule,
        ],
        providers: [statistics_service_1.StatisticsService],
        controllers: [statistics_controller_1.StatisticsController],
        exports: [statistics_service_1.StatisticsService],
    })
], StatisticsModule);
//# sourceMappingURL=statistics.module.js.map