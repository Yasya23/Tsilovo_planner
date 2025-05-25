import { CreateTaskDto, TaskDto } from './dto';
import { TaskService } from './tasks.service';
import { Auth } from '@/auth/decorator/auth.decorator';
import { User } from '@/user/decorator/user.decorator';
import { Body, Controller, Delete, Post, Put } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth()
  async create(
    @User('id') userId: string,
    @Body() dto: CreateTaskDto,
  ): Promise<void> {
    await this.taskService.create(userId, dto);
  }

  @Put()
  @Auth()
  async update(@Body() dto: TaskDto): Promise<void> {
    await this.taskService.update(dto);
  }

  @Delete()
  @Auth()
  async delete(@Body() taskId: string): Promise<void> {
    await this.taskService.delete(taskId);
  }
}
