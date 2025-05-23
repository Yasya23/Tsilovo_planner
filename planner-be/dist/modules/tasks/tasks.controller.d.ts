import { TaskService } from './tasks.service';
import { CreateTaskDto, TaskDto } from './dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(userId: string, dto: CreateTaskDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./model/tasks.model").TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("./model/tasks.model").TaskModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    update(dto: TaskDto): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./model/tasks.model").TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("./model/tasks.model").TaskModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
    delete(taskId: string): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, import("./model/tasks.model").TaskModel, import("@typegoose/typegoose/lib/types").BeAnyObject> & Omit<import("./model/tasks.model").TaskModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}
