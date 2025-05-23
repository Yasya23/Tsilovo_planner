import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TaskModel } from 'src/modules/tasks/model/tasks.model';
import { Types } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel)
    private readonly taskModel: ModelType<TaskModel>,
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

  async getUserTasksForStatistic(
    userId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const tasks = await this.taskModel
      .find({
        userId: userId,
        isCompleted: true,
        date: { $gte: startDate, $lte: endDate },
      })
      .select('_id title goalId')
      .populate({
        path: 'goalId',
        select: '_id emoji title',
      })
      .exec();

    return tasks;
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

  async update(dto: TaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(dto._id, dto, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${dto._id} not found`);
    }

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
