import { Controller, Get, Body, Put, Delete, Post } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { CreateTaskDto, TaskDto } from 'src/typing/dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Auth()
  async getWeekData(@User('id') userId: string, @Body() weekDates: Date[]) {
    return this.taskService.get(userId, weekDates);
  }

  @Post()
  @Auth()
  async create(@User('id') userId: string, @Body() dto: CreateTaskDto[]) {
    return await this.taskService.create(userId, dto);
  }

  @Put()
  @Auth()
  async update(@Body() dto: TaskDto[]) {
    return await this.taskService.update(dto);
  }

  @Delete()
  @Auth()
  async delete(@Body() dto: TaskDto[]) {
    return await this.taskService.delete(dto);
  }
}
