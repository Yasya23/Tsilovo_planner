import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskModel } from 'src/models/tasks.model';
import { Types } from 'mongoose';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: ModelType<TaskModel>);
    getTasksByGoalIdsAndDateRange(goalIds: Types.ObjectId[], startDate: Date, endDate: Date): Promise<(import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<TaskModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[]>;
    getUserTasksForStatistic(userId: string, startDate: Date, endDate: Date): Promise<(import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<TaskModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[]>;
    create(userId: string, dto: CreateTaskDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<TaskModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    update(dto: TaskDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<TaskModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    delete(taskId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<TaskModel & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}
