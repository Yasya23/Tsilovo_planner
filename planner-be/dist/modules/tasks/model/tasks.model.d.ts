import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
export interface TaskModel extends Base {
}
export declare class TaskModel extends TimeStamps {
    title: string;
    goalId: Ref<Types.ObjectId>;
    userId: Types.ObjectId;
    date: Date;
    isCompleted: boolean;
}
