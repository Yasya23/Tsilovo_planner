import {
  MonthlyStats,
  StatisticsByYearResponse,
  StatisticsModel,
  YearlyStats,
} from './model/statistics.model';
import {
  FilteredTasksByMonth,
  FilteredTasksByYears,
  GoalsStats,
  TaskType,
} from './types/task.type';
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
  ): Promise<StatisticsByYearResponse> {
    const statistics = await this.statisticsModel
      .findOne(
        { userId, 'yearlyStats.year': year },
        { 'yearlyStats.$': 1, availableYears: 1, _id: 0 },
      )
      .select('-__v -_id -createdAt -updatedAt -userId')
      .lean();

    if (!statistics)
      throw new NotFoundException(`Statistics for year ${year} not found`);

    const { availableYears, yearlyStats } = statistics;
    const [yearStats] = yearlyStats;

    yearStats.monthlyStats.sort((a, b) => b.month - a.month);

    const response = {
      userId,
      availableYears,
      ...yearStats,
    };
    return response;
  }

  async deleteStatistics(userId: string): Promise<void> {
    await this.statisticsModel.deleteMany({ userId });
  }

  async updateWeeklyStatistics(): Promise<void> {
    this.logger.log('Updating weekly statistics...');

    const weekEnd = new Date();
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 7);

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
    const userStats = await this.statisticsModel.findOne({ userId });

    if (!userStats) {
      await this.createUserStatistics(userId, tasks);
    } else {
      await this.updateUserStatistics(userStats, tasks);
    }
  }

  private async createUserStatistics(userId: string, tasks: TaskType[]) {
    const filteredTasks = this.groupTasksByYearMonth(tasks);
    this.logger.log(`tasks: ${tasks}:`, filteredTasks);
    const allYears = Object.keys(filteredTasks);

    const yearlyStats = allYears.map((year) => {
      const monthlyStats = this.createMonthlyStatsByYear(filteredTasks[year]);

      const totalCompleted = monthlyStats.reduce(
        (acc, m) => acc + m.totalCompleted,
        0,
      );
      const totalGoals = monthlyStats.reduce((acc, m) => acc + m.totalGoals, 0);
      return {
        year: Number(year),
        totalGoals,
        totalCompleted,
        monthlyStats,
      };
    });

    await this.statisticsModel.create({
      userId,
      availableYears: allYears,
      yearlyStats,
    });
  }

  private async updateUserStatistics(userStats, tasks: TaskType[]) {
    const filteredTasks = this.groupTasksByYearMonth(tasks);

    for (const [year, months] of Object.entries(filteredTasks)) {
      let yearStats = userStats.yearlyStats.find(
        (ys: YearlyStats) => ys.year === +year,
      );

      if (!yearStats) {
        yearStats = {
          year: +year,
          totalGoals: 0,
          totalCompleted: 0,
          monthlyStats: [],
        };
        userStats.yearlyStats.push(yearStats);
        userStats.availableYears.push(year);
      }

      for (const [month, monthTasks] of Object.entries(months)) {
        let monthStats = yearStats.monthlyStats.find(
          (ms: MonthlyStats) => ms.month === +month,
        );

        const goals = this.filterTasksByGoals(monthTasks);
        const totalCompleted = goals.reduce(
          (acc, g) => acc + g.completedTasks,
          0,
        );
        const totalGoals = goals.length;

        if (!monthStats) {
          yearStats.monthlyStats.push({
            month: +month,
            totalGoals,
            totalCompleted,
            goals,
          });
        } else {
          monthStats.goals = goals;
          monthStats.totalGoals = totalGoals;
          monthStats.totalCompleted = totalCompleted;
        }
      }

      yearStats.totalGoals = yearStats.monthlyStats.reduce(
        (acc: number, m: MonthlyStats) => acc + m.totalGoals,
        0,
      );
      yearStats.totalCompleted = yearStats.monthlyStats.reduce(
        (acc: number, m: MonthlyStats) => acc + m.totalCompleted,
        0,
      );
    }

    await userStats.save();
  }

  private createMonthlyStatsByYear(
    tasks: FilteredTasksByMonth,
  ): MonthlyStats[] {
    const newTasks: [string, TaskType[]][] = Object.entries(tasks);

    const monthlyStatistics: MonthlyStats[] = [];

    newTasks.forEach((data) => {
      const [month, monthlyTasks] = data;

      const monthStatsTemplate: MonthlyStats = {
        month: +month,
        totalGoals: 0,
        totalCompleted: 0,
        goals: [],
      };

      const filteredGoals = this.filterTasksByGoals(monthlyTasks);

      monthStatsTemplate.goals = [...filteredGoals];

      monthStatsTemplate.totalCompleted = filteredGoals.reduce(
        (acc, m) => acc + m.completedTasks,
        0,
      );

      monthStatsTemplate.totalGoals = monthStatsTemplate.goals.length;
      monthlyStatistics.push(monthStatsTemplate);
    });

    return monthlyStatistics;
  }

  private groupTasksByYearMonth(tasks: TaskType[]): FilteredTasksByYears {
    return tasks.reduce((acc, task) => {
      const year = task.date.getFullYear();
      const monthIndex = task.date.getMonth();
      const month = monthIndex + 1;

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];

      acc[year][month].push(task);
      return acc;
    }, {});
  }

  private filterTasksByGoals(tasks: TaskType[]): GoalsStats[] {
    const goalsData = {};

    tasks.forEach((task) => {
      const { _id, title: taskTitle } = task;
      const { _id: goalId, emoji, title } = task.goalId;

      if (!goalsData[goalId]) {
        goalsData[goalId] = {
          goalId,
          title,
          emoji,
          completedTasks: 0,
          tasks: [],
        };
      }

      const alreadyExists = goalsData[goalId].tasks.some(
        (t) => t.id.toString() === _id.toString(),
      );

      if (!alreadyExists) {
        goalsData[goalId].tasks.push({ id: _id, title: taskTitle });
        goalsData[goalId].completedTasks += 1;
      }
    });

    return Object.values(goalsData);
  }
}
