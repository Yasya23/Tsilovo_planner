import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { StatisticsModel } from 'src/models/statistics.model';
import { TaskService } from '../tasks/tasks.service';
import { DateService } from '../date/date.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TaskType } from './types/task.type';
import { console } from 'inspector';

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

  async getYearlyStatistics(userId: string, year: string) {
    const staistics = await this.statisticsModel
      .findOne({ userId, year })
      .select('-__v -_id -createdAt -updatedAt')
      .lean();

    if (!staistics)
      return new NotFoundException(`Staristics for year ${year} not found`);

    return staistics;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
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
      console.log('tasks', tasks);

      if (!tasks.length) {
        this.logger.warn(`No completed tasks for user ${userId}`);
        continue;
      }

      await this.saveStatistics(userId, tasks);
    }
  }

  async saveStatistics(userId: string, tasks: TaskType[]) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const goalMap = new Map<
      string,
      {
        completedTasks: number;
        tasks: TaskType[];
        title: string;
        emoji: string;
      }
    >();

    for (const task of tasks) {
      const goalId = task.goalId._id.toString();
      const emoji = task.goalId.emoji;

      if (!goalMap.has(goalId)) {
        goalMap.set(goalId, {
          completedTasks: 0,
          tasks: [],
          title: task.goalId.title,
          emoji: emoji,
        });
      }

      const goalStats = goalMap.get(goalId);
      const taskId = task._id.toString();
      const existingTaskIds = new Set(
        goalStats.tasks.map((t) => t._id.toString()),
      );

      if (!existingTaskIds.has(taskId)) {
        goalStats.tasks.push(task);
        goalStats.completedTasks = goalStats.tasks.length;
      }
    }

    const goalStatsArray = Array.from(goalMap.entries()).map(
      ([goalId, data]) => ({
        goalId,
        completedTasks: data.completedTasks,
        title: data.title,
        emoji: data.emoji,
        tasks: data.tasks,
      }),
    );

    let userStats = await this.statisticsModel.findOne({ userId });

    const monthlyStats = {
      month: currentMonth,
      totalCompleted: tasks.length,
      totalGoals: goalStatsArray.length,
      goals: goalStatsArray,
    };

    const createUserStatistics = async () => {
      return await this.statisticsModel.create({
        userId,
        year: currentYear,
        totalCompleted: tasks.length,
        totalGoals: goalStatsArray.length,
        availableYears: [currentYear],
        monthlyStats: [monthlyStats],
      });
    };

    const addNewMonthStats = () => userStats.monthlyStats.push(monthlyStats);
    const updateUserStatistics = async () => {
      const monthStats = userStats.monthlyStats.find(
        (m) => m.month === currentMonth,
      );
      console.log(monthStats);

      if (monthStats) {
        console.log(1);

        for (const newGoal of goalStatsArray) {
          const existingGoal = monthStats.goals.find(
            (g) => g.goalId === newGoal.goalId,
          );

          if (!existingGoal) monthStats.goals.push(newGoal);
          console.log('existingGoal', newGoal);
        }

        monthStats.totalCompleted = monthStats.goals.reduce(
          (acc, m) => acc + m.completedTasks,
          0,
        );
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
