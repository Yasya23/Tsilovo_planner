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
exports.GoalsService = void 0;
const goal_model_1 = require("./model/goal.model");
const date_service_1 = require("../date/date.service");
const tasks_service_1 = require("../tasks/tasks.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let GoalsService = class GoalsService {
    constructor(goalModel, dateService, taskService) {
        this.goalModel = goalModel;
        this.dateService = dateService;
        this.taskService = taskService;
        this.MAX_GOALS = 5;
    }
    async getActiveGoals(userId) {
        const { currentWeek, nextWeek } = this.dateService.getWeekData();
        const weekStart = new Date(currentWeek.weekStart);
        const weekEnd = new Date(nextWeek ? nextWeek.weekEnd : currentWeek.weekEnd);
        const goals = await this.goalModel.find({ userId, isActive: true }).exec();
        const goalIds = goals.map((goal) => goal._id);
        const tasks = await this.taskService.getTasksByGoalIdsAndDateRange(goalIds, weekStart, weekEnd);
        const activeGoals = goals.map((goal) => {
            const futureUncompletedTasks = tasks.filter((task) => task.goalId.toString() === goal._id.toString() &&
                !task.isCompleted &&
                new Date(task.date) > new Date(currentWeek.weekStart)).length;
            return {
                _id: goal._id,
                title: goal.title,
                emoji: goal.emoji,
                isActive: goal.isActive,
                pendingTasks: futureUncompletedTasks,
            };
        });
        const dates = [...currentWeek.weekDates, ...(nextWeek?.weekDates || [])];
        return {
            activeGoals,
            dates,
            tasks,
        };
    }
    async create(dto, userId) {
        const goals = await this.goalModel.find({ userId, isActive: true }).exec();
        if (goals.length >= this.MAX_GOALS) {
            throw new common_1.BadRequestException('Maximum number of goals reached');
        }
        const goal = new this.goalModel({
            ...dto,
            userId,
            isActive: dto.isActive ?? true,
        });
        await goal.save();
    }
    async update(dto) {
        const taskId = new mongoose_1.Types.ObjectId(dto._id);
        const goal = await this.goalModel.findById(taskId);
        if (!goal) {
            throw new common_1.NotFoundException('Goal not found');
        }
        goal.title = dto.title;
        goal.emoji = dto.emoji;
        goal.isActive = dto.isActive;
        await goal.save();
    }
    async delete(goalId) {
        const goal = await this.goalModel.findById(goalId);
        if (!goal) {
            throw new common_1.NotFoundException('Goal not found');
        }
        goal.isActive = false;
        await goal.save();
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(goal_model_1.GoalModel)),
    __metadata("design:paramtypes", [Object, date_service_1.DateService,
        tasks_service_1.TaskService])
], GoalsService);
//# sourceMappingURL=goals.service.js.map