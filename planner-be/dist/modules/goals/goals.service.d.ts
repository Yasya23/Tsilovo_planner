import { ActiveGoalsResponse, CreateGoalDto, UpdateGoalDto } from './dto';
import { GoalModel } from './model/goal.model';
import { DateService } from '@/date/date.service';
import { TaskService } from '@/tasks/tasks.service';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class GoalsService {
    private readonly goalModel;
    private readonly dateService;
    private readonly taskService;
    MAX_GOALS: number;
    constructor(goalModel: ModelType<GoalModel>, dateService: DateService, taskService: TaskService);
    getActiveGoals(userId: string): Promise<ActiveGoalsResponse>;
    create(dto: CreateGoalDto, userId: string): Promise<void>;
    update(dto: UpdateGoalDto): Promise<void>;
    delete(goalId: string): Promise<void>;
    deleteAllGoals(userId: string): Promise<void>;
}
