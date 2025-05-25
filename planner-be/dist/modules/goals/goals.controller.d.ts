import { ActiveGoalsResponse } from './dto';
import { CreateGoalDto, UpdateGoalDto } from './dto/ManageGoalDto';
import { GoalsService } from './goals.service';
export declare class GoalsController {
    private readonly goalService;
    constructor(goalService: GoalsService);
    getActiveGoals(userId: string): Promise<ActiveGoalsResponse>;
    createGoal(userId: string, dto: CreateGoalDto): Promise<void>;
    updateGoal(dto: UpdateGoalDto): Promise<void>;
    deleteGoal(goalId: string): Promise<void>;
}
