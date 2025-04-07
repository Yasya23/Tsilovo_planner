import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { GoalModel } from 'src/models/goal.model';
import { CreateGoalDto, UpdateGoalDto } from './dto/ManageGoalDto';
import { DateService } from '../date/date.service';
import { TaskService } from '../tasks/tasks.service';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel(GoalModel)
    private readonly goalModel: ModelType<GoalModel>,
    private readonly dateService: DateService,
    private readonly taskService: TaskService,
  ) {}

  async getActiveGoals(userId: string) {
    const { currentWeek, nextWeek } = this.dateService.getWeekData();

    const weekStart = new Date(currentWeek.weekStart);
    const weekEnd = new Date(nextWeek ? nextWeek.weekEnd : currentWeek.weekEnd);

    const goals = await this.goalModel.find({ userId, isActive: true }).exec();
    const goalIds = goals.map((goal) => goal._id);

    const tasks = await this.taskService.getTasksByGoalIdsAndDateRange(
      goalIds,
      weekStart,
      weekEnd,
    );

    const activeGoals = goals.map((goal) => {
      const futureUncompletedTasks = tasks.filter(
        (task) =>
          task.goalId.toString() === goal._id.toString() &&
          !task.isCompleted &&
          new Date(task.date) > new Date(currentWeek.weekStart),
      ).length;

      return {
        _id: goal._id,
        title: goal.title,
        emoji: goal.emoji,
        isActive: goal.isActive,
        pendingTasks: futureUncompletedTasks,
      };
    });

    const tasksByDate = tasks.reduce(
      (acc, task) => {
        const dateStr = task.date.toISOString().split('T')[0];
        (acc[dateStr] ??= []).push(task);
        return acc;
      },
      {} as Record<string, (typeof tasks)[number][]>,
    );

    const allDates = currentWeek.weekDates;

    if (nextWeek) {
      allDates.push(...nextWeek.weekDates);
    }

    const weeklyTasks = allDates.map((date) => ({
      date,
      tasks: tasksByDate[date] || [],
    }));

    const completedTasks = tasks.filter((task) => task.isCompleted).length;
    const notCompletedTasks = tasks.filter((task) => !task.isCompleted).length;

    return {
      activeGoals,
      weeklyTasks,
      weeklyStatistics: {
        completedTasks,
        notCompletedTasks,
      },
    };
  }

  async create(dto: CreateGoalDto, userId: string) {
    const goal = new this.goalModel({
      ...dto,
      userId,
      isActive: dto.isActive ?? true,
    });

    return goal.save();
  }

  async update(dto: UpdateGoalDto) {
    const taskId = new Types.ObjectId(dto._id);

    const goal = await this.goalModel.findById(taskId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.title = dto.title;
    goal.emoji = dto.emoji;
    goal.isActive = dto.isActive;

    return goal.save();
  }

  async delete(dto: UpdateGoalDto) {
    const taskId = new Types.ObjectId(dto._id);
    const goal = await this.goalModel.findById(taskId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.isActive = false;
    return goal.save();
  }
}
