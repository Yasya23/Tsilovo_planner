import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserService } from '../user/user.service';
import { StatisticsModel } from 'src/models/statistics.model';
import { TaskService } from '../tasks/tasks.service';
import { DateService } from '../date/date.service';
import { TaskType } from './types/task.type';
export declare class StatisticsService {
    private readonly statisticsModel;
    private readonly userService;
    private readonly dateService;
    private readonly taskService;
    private readonly logger;
    constructor(statisticsModel: ModelType<StatisticsModel>, userService: UserService, dateService: DateService, taskService: TaskService);
    getYearlyStatistics(userId: string, year: string): Promise<any>;
    updateWeeklyStatistics(): Promise<void>;
    saveStatistics(userId: string, tasks: TaskType[]): Promise<void>;
}
