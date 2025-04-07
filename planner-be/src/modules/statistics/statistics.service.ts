import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserService } from '../user/user.service';
import { StatisticsModel } from 'src/models/statistics.model';
import { TaskService } from '../tasks/tasks.service';
import { DateService } from '../date/date.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TaskType } from './types/task.type';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  constructor(
    @InjectModel(StatisticsModel)
    private readonly statisticsModel: ModelType<StatisticsModel>,
    private readonly userService: UserService,
    private readonly dateService: DateService,
    private readonly taskService: TaskService,
  ) {}

  async getYearlyStatistics(userId: string, year?: number) {
    const currentYear = year || new Date().getFullYear();
    const staistics = await this.statisticsModel
      .findOne({ userId, year: currentYear })
      .select('-__v -_id -createdAt -updatedAt')
      .lean();
    return staistics;
  }

  @Cron(CronExpression.EVERY_WEEK)
  async updateWeeklyStatistics() {
    this.logger.log('Updating weekly statistics...');

    const { weekStart, weekEnd } = this.dateService.getLastWeekData();
    const users = await this.userService.getAllUsers();

    for (const user of users) {
      const userId = user._id.toString();
      const tasks = await this.taskService.getUserTasksForStatistic(
        userId,
        new Date(weekStart),
        new Date(weekEnd),
      );

      if (!tasks.length) {
        this.logger.warn(`No completed tasks for user ${userId}`);
        continue;
      }

      await this.saveStatistics(userId, tasks);
    }
  }

  async saveStatistics(userId: string, tasks: TaskType[]) {
    console.log(tasks.length);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const goalMap = new Map<
      string,
      { completedTasks: number; taskIds: Set<string> }
    >();

    for (const task of tasks) {
      const goalId = task.goalId.toString();
      const taskId = task._id.toString();

      if (!goalMap.has(goalId)) {
        goalMap.set(goalId, { completedTasks: 0, taskIds: new Set() });
      }

      const goalStats = goalMap.get(goalId);
      goalStats.completedTasks += 1;
      goalStats.taskIds.add(taskId);
    }

    const goalStatsArray = Array.from(goalMap.entries()).map(
      ([goalId, data]) => ({
        goalId,
        completedTasks: data.completedTasks,
        taskIds: Array.from(data.taskIds),
      }),
    );

    let userStats = await this.statisticsModel.findOne({ userId });

    const createUserStatistics = async () => {
      return await this.statisticsModel.create({
        userId,
        year: currentYear,
        totalCompleted: tasks.length,
        totalGoals: goalStatsArray.length,
        availableYears: [currentYear],
        monthlyStats: [
          {
            month: currentMonth,
            totalCompleted: tasks.length,
            totalGoals: goalStatsArray.length,
            goals: goalStatsArray,
          },
        ],
      });
    };

    const addNewMonthStats = () => {
      userStats.monthlyStats.push({
        month: currentMonth,
        totalCompleted: tasks.length,
        totalGoals: goalStatsArray.length,
        goals: goalStatsArray,
      });
    };

    const updateUserStatistics = async () => {
      const monthStats = userStats.monthlyStats.find(
        (m) => m.month === currentMonth,
      );

      if (monthStats) {
        for (const newGoal of goalStatsArray) {
          const existingGoal = monthStats.goals.find(
            (g) => g.goalId === newGoal.goalId,
          );

          if (existingGoal) {
            const existingTaskIds = new Set(existingGoal.taskIds);
            for (const id of newGoal.taskIds) {
              existingTaskIds.add(id);
            }
            existingGoal.taskIds = Array.from(existingTaskIds);
            existingGoal.completedTasks = existingGoal.taskIds.length;
          } else {
            monthStats.goals.push(newGoal);
          }
        }
        monthStats.totalCompleted = tasks.length;
        monthStats.totalGoals = monthStats.goals.length;
      } else {
        addNewMonthStats();
      }

      userStats.totalCompleted = userStats.monthlyStats.reduce(
        (acc, m) => acc + m.totalCompleted,
        0,
      );
      userStats.totalGoals = userStats.monthlyStats.reduce(
        (acc, m) => acc + m.totalGoals,
        0,
      );

      if (!userStats.availableYears.includes(currentYear)) {
        userStats.availableYears.push(currentYear);
      }

      await userStats.save();
    };

    if (!userStats) {
      await createUserStatistics();
    } else {
      await updateUserStatistics();
    }
  }
}
