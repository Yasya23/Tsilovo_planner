import { StatisticsModel } from './model/statistics.model';
import { TaskType } from './types/task.type';
import { DateService } from '@/date/date.service';
import { TaskService } from '@/tasks/tasks.service';
import { UserService } from '@/user/user.service';
import { NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class StatisticsService {
    private readonly statisticsModel;
    private readonly userService;
    private readonly dateService;
    private readonly taskService;
    private readonly logger;
    constructor(statisticsModel: ModelType<StatisticsModel>, userService: UserService, dateService: DateService, taskService: TaskService);
    getYearlyStatistics(userId: string, year: string): Promise<NotFoundException | (import("mongoose").FlattenMaps<{
        userId: string;
        year: number;
        totalCompleted: number;
        totalGoals: number;
        availableYears: number[];
        monthlyStats: {
            month: number;
            totalGoals: number;
            totalCompleted: number;
            goals: {
                goalId: string;
                title: string;
                emoji: string;
                completedTasks: number;
                tasks: {
                    _id: Types.ObjectId;
                    goalId: Types.ObjectId;
                    userId: Types.ObjectId;
                    title: string;
                }[];
            }[];
        }[];
        createdAt?: Date;
        updatedAt?: Date;
        _id: import("mongoose").Types.ObjectId;
        id: string;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })>;
    updateWeeklyStatistics(): Promise<void>;
    saveStatistics(userId: string, tasks: TaskType[]): Promise<void>;
}
