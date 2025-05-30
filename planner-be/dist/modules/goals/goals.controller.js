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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsController = void 0;
const ManageGoalDto_1 = require("./dto/ManageGoalDto");
const goals_service_1 = require("./goals.service");
const auth_decorator_1 = require("../auth/decorator/auth.decorator");
const user_decorator_1 = require("../user/decorator/user.decorator");
const common_1 = require("@nestjs/common");
let GoalsController = class GoalsController {
    constructor(goalService) {
        this.goalService = goalService;
    }
    async getActiveGoals(userId) {
        return this.goalService.getActiveGoals(userId);
    }
    async createGoal(userId, dto) {
        await this.goalService.create(dto, userId);
    }
    async updateGoal(dto) {
        await this.goalService.update(dto);
    }
    async deleteGoal(goalId) {
        await this.goalService.delete(goalId);
    }
};
exports.GoalsController = GoalsController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "getActiveGoals", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ManageGoalDto_1.CreateGoalDto]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "createGoal", null);
__decorate([
    (0, common_1.Put)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ManageGoalDto_1.UpdateGoalDto]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "updateGoal", null);
__decorate([
    (0, common_1.Delete)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalsController.prototype, "deleteGoal", null);
exports.GoalsController = GoalsController = __decorate([
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [goals_service_1.GoalsService])
], GoalsController);
//# sourceMappingURL=goals.controller.js.map