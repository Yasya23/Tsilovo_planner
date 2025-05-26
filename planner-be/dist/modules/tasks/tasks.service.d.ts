import { CreateTaskDto, TaskDto } from './dto';
import { TaskModel } from './model/tasks.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: ModelType<TaskModel>);
    getTasksByGoalIdsAndDateRange(goalIds: Types.ObjectId[], startDate: Date, endDate: Date): Promise<TaskModel[]>;
    getUserTasksForStatistic(userId: string, startDate: Date, endDate: Date): Promise<TaskModel[]>;
    create(userId: string, dto: CreateTaskDto): Promise<TaskModel>;
    update(dto: TaskDto): Promise<TaskModel>;
    delete(taskId: string): Promise<void>;
    deleteAllTasks(userId: string): Promise<void>;
}
