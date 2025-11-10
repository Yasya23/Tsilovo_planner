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
        const statistics = await this.statisticsModel
            .findOne({ userId, 'yearlyStats.year': year }, { 'yearlyStats.$': 1, availableYears: 1, _id: 0 })
            .select('-__v -_id -createdAt -updatedAt -userId')
            .lean();
        if (!statistics)
            throw new common_1.NotFoundException(`Statistics for year ${year} not found`);
        const { availableYears, yearlyStats } = statistics;
        const [yearStats] = yearlyStats;
        yearStats.monthlyStats.sort((a, b) => b.month - a.month);
        const response = {
            userId,
            availableYears,
            ...yearStats,
        };
        return response;
    }
    async deleteStatistics(userId) {
        await this.statisticsModel.deleteMany({ userId });
    }
    async updateWeeklyStatistics() {
        this.logger.log('Updating weekly statistics...');
        const weekEnd = new Date();
        const weekStart = new Date(weekEnd);
        weekStart.setDate(weekEnd.getDate() - 7);
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
        const userStats = await this.statisticsModel.findOne({ userId });
        if (!userStats) {
            await this.createUserStatistics(userId, tasks);
        }
        else {
            await this.updateUserStatistics(userStats, tasks);
        }
    }
    async createUserStatistics(userId, tasks) {
        const filteredTasks = this.groupTasksByYearMonth(tasks);
        this.logger.log(`tasks: ${tasks}:`, filteredTasks);
        const allYears = Object.keys(filteredTasks);
        const yearlyStats = allYears.map((year) => {
            const monthlyStats = this.createMonthlyStatsByYear(filteredTasks[year]);
            const totalCompleted = monthlyStats.reduce((acc, m) => acc + m.totalCompleted, 0);
            const totalGoals = monthlyStats.reduce((acc, m) => acc + m.totalGoals, 0);
            return {
                year: Number(year),
                totalGoals,
                totalCompleted,
                monthlyStats,
            };
        });
        await this.statisticsModel.create({
            userId,
            availableYears: allYears,
            yearlyStats,
        });
    }
    async updateUserStatistics(userStats, tasks) {
        const filteredTasks = this.groupTasksByYearMonth(tasks);
        for (const [year, months] of Object.entries(filteredTasks)) {
            let yearStats = userStats.yearlyStats.find((ys) => ys.year === +year);
            if (!yearStats) {
                yearStats = {
                    year: +year,
                    totalGoals: 0,
                    totalCompleted: 0,
                    monthlyStats: [],
                };
                userStats.yearlyStats.push(yearStats);
                userStats.availableYears.push(year);
            }
            for (const [month, monthTasks] of Object.entries(months)) {
                let monthStats = yearStats.monthlyStats.find((ms) => ms.month === +month);
                const goals = this.filterTasksByGoals(monthTasks);
                const totalCompleted = goals.reduce((acc, g) => acc + g.completedTasks, 0);
                const totalGoals = goals.length;
                if (!monthStats) {
                    yearStats.monthlyStats.push({
                        month: +month,
                        totalGoals,
                        totalCompleted,
                        goals,
                    });
                }
                else {
                    monthStats.goals = goals;
                    monthStats.totalGoals = totalGoals;
                    monthStats.totalCompleted = totalCompleted;
                }
            }
            yearStats.totalGoals = yearStats.monthlyStats.reduce((acc, m) => acc + m.totalGoals, 0);
            yearStats.totalCompleted = yearStats.monthlyStats.reduce((acc, m) => acc + m.totalCompleted, 0);
        }
        await userStats.save();
    }
    createMonthlyStatsByYear(tasks) {
        const newTasks = Object.entries(tasks);
        const monthlyStatistics = [];
        newTasks.forEach((data) => {
            const [month, monthlyTasks] = data;
            const monthStatsTemplate = {
                month: +month,
                totalGoals: 0,
                totalCompleted: 0,
                goals: [],
            };
            const filteredGoals = this.filterTasksByGoals(monthlyTasks);
            monthStatsTemplate.goals = [...filteredGoals];
            monthStatsTemplate.totalCompleted = filteredGoals.reduce((acc, m) => acc + m.completedTasks, 0);
            monthStatsTemplate.totalGoals = monthStatsTemplate.goals.length;
            monthlyStatistics.push(monthStatsTemplate);
        });
        return monthlyStatistics;
    }
    groupTasksByYearMonth(tasks) {
        return tasks.reduce((acc, task) => {
            const year = task.date.getFullYear();
            const monthIndex = task.date.getMonth();
            const month = monthIndex + 1;
            if (!acc[year])
                acc[year] = {};
            if (!acc[year][month])
                acc[year][month] = [];
            acc[year][month].push(task);
            return acc;
        }, {});
    }
    filterTasksByGoals(tasks) {
        const goalsData = {};
        tasks.forEach((task) => {
            const { _id, title: taskTitle } = task;
            const { _id: goalId, emoji, title } = task.goalId;
            if (!goalsData[goalId]) {
                goalsData[goalId] = {
                    goalId,
                    title,
                    emoji,
                    completedTasks: 0,
                    tasks: [],
                };
            }
            const alreadyExists = goalsData[goalId].tasks.some((t) => t.id.toString() === _id.toString());
            if (!alreadyExists) {
                goalsData[goalId].tasks.push({ id: _id, title: taskTitle });
                goalsData[goalId].completedTasks += 1;
            }
        });
        return Object.values(goalsData);
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = StatisticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(statistics_model_1.StatisticsModel)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        date_service_1.DateService,
        tasks_service_1.TaskService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map