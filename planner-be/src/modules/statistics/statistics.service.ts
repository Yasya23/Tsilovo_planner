import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { StatisticsModel } from 'src/models/statistics.model';
import { TaskDto } from '../tasks/dto/task.dto';
@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(StatisticsModel)
    private readonly statisticsModel: ModelType<StatisticsModel>,
  ) {}

  async getYearlyStatistics(userId: string, year?: number) {
    const currentYear = year || new Date().getFullYear();

    return await this.statisticsModel.findOne({ userId }).lean();
  }

  async updateAvailableYears(userId: string, year: number) {
    await this.statisticsModel.findOneAndUpdate(
      { userId },
      { $addToSet: { availableYears: year } },
      { upsert: true },
    );
  }

  async updateTaskStatistics(
    userId: string,
    task: any,
    prevIsCompleted: boolean,
  ) {
    const year = new Date(task.date).getFullYear();
    const month = new Date(task.date).getMonth() + 1;
    const goalId = task.goalId;

    if (task.isCompleted && !prevIsCompleted) {
      await this.saveStatistics(userId, year, month, goalId, task._id);
    }
  }

  async saveStatistics(
    userId: string,
    year: number,
    month: number,
    goalId: string,
    taskId: string,
  ) {
    await this.statisticsModel.updateOne(
      { userId, year },
      { $setOnInsert: { monthlyStats: [] } },
      { upsert: true },
    );

    let statistics = await this.statisticsModel.findOne({ userId, year });

    if (!statistics) {
      throw new Error('Failed to retrieve statistics after upsert.');
    }

    await this.updateAvailableYears(userId, year);

    let monthStats = statistics.monthlyStats.find((m) => m.month === month);
    if (!monthStats) {
      monthStats = { month, goals: [] };
      statistics.monthlyStats.push(monthStats);
    }

    let goalStats = monthStats.goals.find((g) => g.goalId === goalId);

    if (goalStats) {
      goalStats.taskIds = Array.from(new Set([...goalStats.taskIds, taskId]));
      goalStats.completedTasks = goalStats.taskIds.length;
    } else {
      monthStats.goals.push({ goalId, taskIds: [taskId], completedTasks: 1 });
    }

    await this.statisticsModel.updateOne(
      { userId, year },
      { $set: { monthlyStats: statistics.monthlyStats } },
    );

    return goalStats ? goalStats.taskIds.length : 1;
  }
}
