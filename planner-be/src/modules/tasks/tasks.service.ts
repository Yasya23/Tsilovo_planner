import { CreateTaskDto, TaskDto } from './dto';
import { TaskModel } from './model/tasks.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

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
  ): Promise<TaskModel[]> {
    return this.taskModel
      .find({
        goalId: { $in: goalIds },
        date: { $gte: startDate, $lte: endDate },
      })
      .select('goalId title date isCompleted')
      .exec();
  }

  async getUserTasksForStatistic(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TaskModel[]> {
    return this.taskModel
      .find({
        userId: new Types.ObjectId(userId),
        isCompleted: true,
        date: { $gte: startDate, $lte: endDate },
      })
      .select('_id title goalId date')
      .populate({
        path: 'goalId',
        select: '_id emoji title',
      })
      .sort({ timestamp: 1 })
      .exec();
  }

  async create(userId: string, dto: CreateTaskDto): Promise<TaskModel> {
    if (!dto.goalId || !dto.title || !dto.date) {
      throw new BadRequestException('Missing required fields');
    }

    return this.taskModel.create({
      ...dto,
      userId: new Types.ObjectId(userId),
      goalId: new Types.ObjectId(dto.goalId),
    });
  }

  async update(dto: TaskDto): Promise<TaskModel> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(dto._id, dto, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }

    return updatedTask;
  }

  async delete(taskId: string): Promise<void> {
    const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }
  }

  async deleteAllTasks(userId: string): Promise<void> {
    await this.taskModel.deleteMany({ userId });
  }
}
