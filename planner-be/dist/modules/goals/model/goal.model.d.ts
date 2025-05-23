import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { TaskModel } from '../../tasks/model/tasks.model';
export interface GoalModel extends Base {
}
export declare class GoalModel extends TimeStamps {
    title: string;
    userId: Types.ObjectId;
    tasks: Ref<TaskModel>[];
    emoji: string;
    isActive: boolean;
}
