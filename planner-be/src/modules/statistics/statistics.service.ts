import { StatisticsModel } from './model/statistics.model';
import { TaskType } from './types/task.type';
import { DateService } from '@/date/date.service';
import { TaskService } from '@/tasks/tasks.service';
import { UserService } from '@/user/user.service';
import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  constructor(
    @InjectModel(StatisticsModel)
    private readonly statisticsModel: ModelType<StatisticsModel>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly dateService: DateService,
    private readonly taskService: TaskService,
  ) {}

  async getYearlyStatistics(
    userId: string,
    year: string,
  ): Promise<StatisticsModel> {
    const staistics = await this.statisticsModel
      .findOne({ userId, year })
      .select('-__v -_id -createdAt -updatedAt -userId')
      .lean();

    if (!staistics)
      throw new NotFoundException(`Staristics for year ${year} not found`);

    return staistics;
  }

  async deleteStatistics(userId: string): Promise<void> {
    await this.statisticsModel.deleteMany({ userId });
  }

  @Cron('30 1 * * 1')
  async updateWeeklyStatistics(): Promise<void> {
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

  async saveStatistics(userId: string, tasks: TaskType[]): Promise<void> {
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

    const userStats = await this.statisticsModel.findOne({ userId });

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

      if (monthStats) {
        for (const newGoal of goalStatsArray) {
          const existingGoal = monthStats.goals.find(
            (g) => g.goalId === newGoal.goalId,
          );

          if (!existingGoal) monthStats.goals.push(newGoal);
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
