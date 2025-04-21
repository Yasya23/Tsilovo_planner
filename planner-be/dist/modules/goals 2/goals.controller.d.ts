import { GoalsService } from './goals.service';
import { UpdateGoalDto, CreateGoalDto } from './dto/ManageGoalDto';
export declare class GoalsController {
    private readonly goalService;
    constructor(goalService: GoalsService);
    getActiveGoals(userId: string): Promise<{
        activeGoals: {
            _id: import("mongoose").Types.ObjectId;
            title: string;
            emoji: string;
            isActive: boolean;
            pendingTasks: number;
        }[];
        weeklyTasks: {
            date: string;
            tasks: (import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../../models/tasks.model").TaskModel> & Omit<import("../../models/tasks.model").TaskModel & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction)[];
        }[];
        weeklyStatistics: {
            completedTasks: number;
            notCompletedTasks: number;
        };
    }>;
    createGoal(userId: string, dto: CreateGoalDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../../models/goal.model").GoalModel> & Omit<import("../../models/goal.model").GoalModel & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    updateGoal(dto: UpdateGoalDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../../models/goal.model").GoalModel> & Omit<import("../../models/goal.model").GoalModel & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    deleteGoal(dto: UpdateGoalDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("../../models/goal.model").GoalModel> & Omit<import("../../models/goal.model").GoalModel & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}
