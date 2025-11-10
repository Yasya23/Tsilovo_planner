import { StatisticsService } from './statistics.service';
import { Auth } from '@/auth/decorator/auth.decorator';
import { User } from '@/user/decorator/user.decorator';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @Auth()
  async get(@User('id') userId: string, @Query('year') year: string) {
    return await this.statisticsService.getYearlyStatistics(userId, year);
  }

  @Get('cron')
  async updateStatistics() {
    return await this.statisticsService.updateWeeklyStatistics();
  }
}
