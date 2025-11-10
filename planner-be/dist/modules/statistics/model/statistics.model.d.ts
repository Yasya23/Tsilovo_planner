import { TaskType } from '@/statistics/types/task.type';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface StatisticsModel extends Base {
}
export declare class GoalStats {
    goalId: string;
    title: string;
    emoji: string;
    completedTasks: number;
    tasks: TaskType[];
}
export declare class MonthlyStats {
    month: number;
    totalGoals: number;
    totalCompleted: number;
    goals: GoalStats[];
}
export declare class YearlyStats {
    year: number;
    totalCompleted: number;
    totalGoals: number;
    monthlyStats: MonthlyStats[];
}
export declare class StatisticsModel extends TimeStamps {
    userId: string;
    availableYears: string[];
    yearlyStats: YearlyStats[];
}
export declare class StatisticsByYearResponse extends TimeStamps {
    userId: string;
    availableYears: string[];
    year: number;
    totalCompleted: number;
    totalGoals: number;
    monthlyStats: MonthlyStats[];
}
