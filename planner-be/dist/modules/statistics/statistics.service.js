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
var StatisticsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const statistics_model_1 = require("./model/statistics.model");
const date_service_1 = require("../date/date.service");
const tasks_service_1 = require("../tasks/tasks.service");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let StatisticsService = StatisticsService_1 = class StatisticsService {
    constructor(statisticsModel, userService, dateService, taskService) {
        this.statisticsModel = statisticsModel;
        this.userService = userService;
        this.dateService = dateService;
        this.taskService = taskService;
        this.logger = new common_1.Logger(StatisticsService_1.name);
    }
    async getYearlyStatistics(userId, year) {
        const staistics = await this.statisticsModel
            .findOne({ userId, year })
            .select('-__v -_id -createdAt -updatedAt -userId')
            .lean();
        if (!staistics)
            throw new common_1.NotFoundException(`Staristics for year ${year} not found`);
        return staistics;
    }
    async deleteStatistics(userId) {
        await this.statisticsModel.deleteMany({ userId });
    }
    async updateWeeklyStatistics() {
        this.logger.log('Updating weekly statistics...');
        const { weekStart, weekEnd } = this.dateService.getLastWeekData();
        const users = await this.userService.getAllUsers();
        for (const user of users) {
            const userId = user._id.toString();
            const tasks = await this.taskService.getUserTasksForStatistic(userId, new Date(weekStart), new Date(weekEnd));
            if (!tasks.length) {
                this.logger.warn(`No completed tasks for user ${userId}`);
                continue;
            }
            await this.saveStatistics(userId, tasks);
        }
    }
    async saveStatistics(userId, tasks) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const goalMap = new Map();
        for (const task of tasks) {
            const goalId = task.goalId._id.toString();
            const emoji = task.goalId.emoji;
            if (!goalMap.has(goalId)) {
                goalMap.set(goalId, {
                    completedTasks: 0,
                    tasks: [],
                    title: task.goalId.title,
                    emoji: emoji,
                });
            }
            const goalStats = goalMap.get(goalId);
            const taskId = task._id.toString();
            const existingTaskIds = new Set(goalStats.tasks.map((t) => t._id.toString()));
            if (!existingTaskIds.has(taskId)) {
                goalStats.tasks.push(task);
                goalStats.completedTasks = goalStats.tasks.length;
            }
        }
        const goalStatsArray = Array.from(goalMap.entries()).map(([goalId, data]) => ({
            goalId,
            completedTasks: data.completedTasks,
            title: data.title,
            emoji: data.emoji,
            tasks: data.tasks,
        }));
        const userStats = await this.statisticsModel.findOne({ userId });
        const monthlyStats = {
            month: currentMonth,
            totalCompleted: tasks.length,
            totalGoals: goalStatsArray.length,
            goals: goalStatsArray,
        };
        const createUserStatistics = async () => {
            return await this.statisticsModel.create({
                userId,
                year: currentYear,
                totalCompleted: tasks.length,
                totalGoals: goalStatsArray.length,
                availableYears: [currentYear],
                monthlyStats: [monthlyStats],
            });
        };
        const addNewMonthStats = () => userStats.monthlyStats.push(monthlyStats);
        const updateUserStatistics = async () => {
            const monthStats = userStats.monthlyStats.find((m) => m.month === currentMonth);
            if (monthStats) {
                for (const newGoal of goalStatsArray) {
                    const existingGoal = monthStats.goals.find((g) => g.goalId === newGoal.goalId);
                    if (!existingGoal)
                        monthStats.goals.push(newGoal);
                }
                monthStats.totalCompleted = monthStats.goals.reduce((acc, m) => acc + m.completedTasks, 0);
                monthStats.totalGoals = monthStats.goals.length;
            }
            else {
                addNewMonthStats();
            }
            userStats.totalCompleted = userStats.monthlyStats.reduce((acc, m) => acc + m.totalCompleted, 0);
            userStats.totalGoals = userStats.monthlyStats.reduce((acc, m) => acc + m.totalGoals, 0);
            if (!userStats.availableYears.includes(currentYear)) {
                userStats.availableYears.push(currentYear);
            }
            await userStats.save();
        };
        if (!userStats) {
            await createUserStatistics();
        }
        else {
            await updateUserStatistics();
        }
    }
};
exports.StatisticsService = StatisticsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsService.prototype, "updateWeeklyStatistics", null);
exports.StatisticsService = StatisticsService = StatisticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(statistics_model_1.StatisticsModel)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        date_service_1.DateService,
        tasks_service_1.TaskService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map