import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @Auth()
  async get(@User('id') userId: string, @Query('year') year: string) {
    return await this.statisticsService.getYearlyStatistics(userId, year);
  }
}
