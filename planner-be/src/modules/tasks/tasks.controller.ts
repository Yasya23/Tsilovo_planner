import { Controller, Get, Body, Put, Query } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { WeekTasksDto } from 'src/typing/dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Auth()
  async getCurrentWeek(
    @User('id') userId: string,
    @Query('currentweek') week: number,
  ) {
    return this.taskService.getCurrentWeekData(userId, week);
  }

  @Get('statistics')
  @Auth()
  async getAll(@User('id') userId: string) {
    return this.taskService.getAllData(userId);
  }

  @Put()
  @Auth()
  async update(@Body() dto: WeekTasksDto) {
    await this.taskService.update(dto);
    return { message: 'Tasks updated successfully' };
  }
}
