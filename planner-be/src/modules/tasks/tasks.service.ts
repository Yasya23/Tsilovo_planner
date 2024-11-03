import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { WeekTasksModel } from 'src/models/tasks.model';
import { WeekTasksDto } from 'src/typing/dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';

const defaultWeeklyTasks = [
  { day: 'Monday', tasks: [] },
  { day: 'Tuesday', tasks: [] },
  { day: 'Wednesday', tasks: [] },
  { day: 'Thursday', tasks: [] },
  { day: 'Friday', tasks: [] },
  { day: 'Saturday', tasks: [] },
  { day: 'Sunday', tasks: [] },
];

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(WeekTasksModel)
    private readonly weekTasksModel: ModelType<WeekTasksModel>,
  ) {}

  async getCurrentWeekData(userId: string, week: number) {
    const weekTask = await this.weekTasksModel
      .findOneAndUpdate(
        { userId, week },
        {
          $setOnInsert: {
            userId,
            week,
            notes: [],
            tasks: defaultWeeklyTasks,
            statistics: { completedTasks: 0, totalTasks: 0 },
          },
        },
        { new: true, upsert: true },
      )
      .exec();

    return weekTask;
  }

  async getAllData(userId: string) {
    const result = await this.weekTasksModel.aggregate([
      {
        $match: { userId: new Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: null,
          totalCompletedTasks: { $sum: '$statistics.completedTasks' },
          totalTasks: { $sum: '$statistics.totalTasks' },
        },
      },
    ]);

    const totalCompletedTasks = result[0]?.totalCompletedTasks || 0;
    const totalTasks = result[0]?.totalTasks || 0;

    const weeklyTasks = await this.weekTasksModel.find({ userId }).exec();

    return {
      userId,
      completedTasks: totalCompletedTasks,
      totalTasks: totalTasks,
      tasksList: weeklyTasks,
    };
  }

  async update(dto: WeekTasksDto) {
    const taskId = new Types.ObjectId(dto.id);

    const calculatedStatistics = {
      completedTasks: dto.dailyTasks.reduce(
        (sum, dailyTask) =>
          sum + dailyTask.tasks.filter((task) => task.isCompleted).length,
        0,
      ),
      totalTasks: dto.dailyTasks.reduce(
        (sum, dailyTask) => sum + dailyTask.tasks.length,
        0,
      ),
    };

    const updatedWeekTask = await this.weekTasksModel
      .findByIdAndUpdate(
        taskId,
        { ...dto, statistics: calculatedStatistics },
        { new: true },
      )
      .exec();

    if (!updatedWeekTask) {
      throw new NotFoundException(`Week task with ID ${taskId} not found`);
    }

    return updatedWeekTask;
  }
}
