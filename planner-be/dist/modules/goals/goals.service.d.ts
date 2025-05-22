import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { GoalModel } from 'src/models/goal.model';
import { CreateGoalDto, UpdateGoalDto } from './dto/ManageGoalDto';
import { DateService } from '../date/date.service';
import { TaskService } from '../tasks/tasks.service';
export declare class GoalsService {
    private readonly goalModel;
    private readonly dateService;
    private readonly taskService;
    MAX_GOALS: number;
    constructor(goalModel: ModelType<GoalModel>, dateService: DateService, taskService: TaskService);
    getActiveGoals(userId: string): Promise<{
        activeGoals: {
            _id: Types.ObjectId;
            title: string;
            emoji: string;
            isActive: boolean;
            pendingTasks: number;
        }[];
        dates: string[];
        tasks: (import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../../models/tasks.model").TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("../../models/tasks.model").TaskModel & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[];
    }>;
    create(dto: CreateGoalDto, userId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GoalModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<GoalModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    update(dto: UpdateGoalDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GoalModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<GoalModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    delete(goalId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, GoalModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<GoalModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}
