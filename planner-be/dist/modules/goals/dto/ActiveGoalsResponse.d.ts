import { TaskModel } from '@/modules/tasks/model/tasks.model';
import { Types } from 'mongoose';
export declare class ActiveGoalsResponse {
    activeGoals: {
        _id: Types.ObjectId;
        title: string;
        emoji: string;
        isActive: boolean;
        pendingTasks: number;
    }[];
    dates: string[];
    tasks: TaskModel[];
}
