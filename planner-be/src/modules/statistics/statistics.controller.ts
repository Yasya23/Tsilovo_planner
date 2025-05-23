import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from 'src/modules/auth/decorator/auth.decorator';
import { User } from 'src/modules/user/decorator/user.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @Auth()
  async get(@User('id') userId: string, @Query('year') year: string) {
    return await this.statisticsService.getYearlyStatistics(userId, year);
  }
}
