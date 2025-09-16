"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsByYearResponse = exports.StatisticsModel = exports.YearlyStats = exports.MonthlyStats = exports.GoalStats = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class GoalStats {
}
exports.GoalStats = GoalStats;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], GoalStats.prototype, "goalId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], GoalStats.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], GoalStats.prototype, "emoji", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], GoalStats.prototype, "completedTasks", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], GoalStats.prototype, "tasks", void 0);
class MonthlyStats {
}
exports.MonthlyStats = MonthlyStats;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], MonthlyStats.prototype, "month", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], MonthlyStats.prototype, "totalGoals", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], MonthlyStats.prototype, "totalCompleted", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [GoalStats], default: [] }),
    __metadata("design:type", Array)
], MonthlyStats.prototype, "goals", void 0);
class YearlyStats {
}
exports.YearlyStats = YearlyStats;
__decorate([
    (0, typegoose_1.prop)({ required: true, default: () => new Date().getFullYear() }),
    __metadata("design:type", Number)
], YearlyStats.prototype, "year", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], YearlyStats.prototype, "totalCompleted", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], YearlyStats.prototype, "totalGoals", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [MonthlyStats], default: [] }),
    __metadata("design:type", Array)
], YearlyStats.prototype, "monthlyStats", void 0);
class StatisticsModel extends defaultClasses_1.TimeStamps {
}
exports.StatisticsModel = StatisticsModel;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], StatisticsModel.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String], default: [] }),
    __metadata("design:type", Array)
], StatisticsModel.prototype, "availableYears", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [YearlyStats], default: [] }),
    __metadata("design:type", Array)
], StatisticsModel.prototype, "yearlyStats", void 0);
class StatisticsByYearResponse extends defaultClasses_1.TimeStamps {
}
exports.StatisticsByYearResponse = StatisticsByYearResponse;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], StatisticsByYearResponse.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String], default: [] }),
    __metadata("design:type", Array)
], StatisticsByYearResponse.prototype, "availableYears", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: () => new Date().getFullYear() }),
    __metadata("design:type", Number)
], StatisticsByYearResponse.prototype, "year", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], StatisticsByYearResponse.prototype, "totalCompleted", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], StatisticsByYearResponse.prototype, "totalGoals", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [MonthlyStats], default: [] }),
    __metadata("design:type", Array)
], StatisticsByYearResponse.prototype, "monthlyStats", void 0);
//# sourceMappingURL=statistics.model.js.map