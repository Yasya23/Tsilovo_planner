import { StatisticsModel } from './model/statistics.model';
import { TaskType } from './types/task.type';
import { DateService } from '@/date/date.service';
import { TaskService } from '@/tasks/tasks.service';
import { UserService } from '@/user/user.service';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class StatisticsService {
    private readonly statisticsModel;
    private readonly userService;
    private readonly dateService;
    private readonly taskService;
    private readonly logger;
    constructor(statisticsModel: ModelType<StatisticsModel>, userService: UserService, dateService: DateService, taskService: TaskService);
    getYearlyStatistics(userId: string, year: string): Promise<StatisticsModel>;
    deleteStatistics(userId: string): Promise<void>;
    updateWeeklyStatistics(): Promise<void>;
    saveStatistics(userId: string, tasks: TaskType[]): Promise<void>;
}
