import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    get(userId: string, year: string): Promise<import("@nestjs/common").NotFoundException | (import("mongoose").FlattenMaps<{
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
                taskIds: string[];
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
}
