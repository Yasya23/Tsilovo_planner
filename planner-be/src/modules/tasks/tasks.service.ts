import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskModel } from 'src/models/tasks.model';
import { Types } from 'mongoose';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel)
    private readonly taskModel: ModelType<TaskModel>,
    private readonly statisticsService: StatisticsService,
  ) {}

  async getTasksByGoalIdsAndDateRange(
    goalIds: Types.ObjectId[],
    startDate: Date,
    endDate: Date,
  ) {
    return await this.taskModel
      .find({
        goalId: { $in: goalIds.map((id) => new Types.ObjectId(id)) },
        date: { $gte: startDate, $lte: endDate },
      })
      .select('goalId title date isCompleted')
      .exec();
  }

  async create(userId: string, dto: CreateTaskDto) {
    if (!userId || !dto.goalId || !dto.title || !dto.date) {
      throw new BadRequestException('Missing required fields');
    }

    return await this.taskModel.create({
      ...dto,
      userId: new Types.ObjectId(userId),
      goalId: new Types.ObjectId(dto.goalId),
    });
  }

  async update(userId: string, dto: TaskDto) {
    const prevTask = await this.taskModel.findById(dto._id);
    if (!prevTask) {
      throw new NotFoundException(`Task with id ${dto._id} not found`);
    }

    const task = await this.taskModel.findByIdAndUpdate(dto._id, dto, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${dto._id} not found`);
    }

    await this.statisticsService.updateTaskStatistics(
      userId,
      task,
      prevTask.isCompleted,
    );

    return task;
  }

  async delete(taskId: string) {
    const task = await this.taskModel.findByIdAndDelete(taskId);

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return task;
  }
}
