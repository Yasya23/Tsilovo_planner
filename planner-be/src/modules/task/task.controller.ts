import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { TaskDto } from 'src/typing/dto';
import { TaskModel } from 'src/models/task.model';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Auth()
  async getAll(
    @User('id') userId: string,
    @Query() query: { status?: string; dueDate?: string },
  ) {
    return this.taskService.getAll(userId, query);
  }

  @Post()
  @Auth()
  async create(@User('id') userId: string, @Body() dto: TaskDto) {
    return this.taskService.create(userId, dto);
  }

  @Put(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: TaskDto) {
    await this.taskService.update(id, dto);
    return { message: 'Task updated successfully' };
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    await this.taskService.delete(id);
    return { message: 'Task deleted successfully' };
  }
}
