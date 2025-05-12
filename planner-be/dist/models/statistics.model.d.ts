import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { TaskType } from 'src/modules/statistics/types/task.type';
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
export declare class StatisticsModel extends TimeStamps {
    userId: string;
    year: number;
    totalCompleted: number;
    totalGoals: number;
    availableYears: number[];
    monthlyStats: MonthlyStats[];
}
