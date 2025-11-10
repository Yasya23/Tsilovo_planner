import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    get(userId: string, year: string): Promise<import("./model/statistics.model").StatisticsByYearResponse>;
}
