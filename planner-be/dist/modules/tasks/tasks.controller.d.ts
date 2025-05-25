import { CreateTaskDto, TaskDto } from './dto';
import { TaskService } from './tasks.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(userId: string, dto: CreateTaskDto): Promise<void>;
    update(dto: TaskDto): Promise<void>;
    delete(taskId: string): Promise<void>;
}
