import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { GoalModel } from 'src/models/goal.model';
import { CreateGoalDto, UpdateGoalDto } from './dto/ManageGoalDto';
import { TaskModel } from 'src/models/tasks.model';
import { DateService } from '../date/date.service';
import { TaskService } from '../tasks/tasks.service';
import { weeksToDays } from 'date-fns';

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
          task.goal.toString() === goal._id.toString() &&
          !task.isCompleted &&
          task.date > new Date(currentWeek.weekEnd),
      ).length;

      return {
        id: goal._id.toString(),
        title: goal.title,
        emoji: goal.emoji,
        isActive: goal.isActive,
        pendingTasks: futureUncompletedTasks,
      };
    });

    const tasksByDate = tasks.reduce(
      (acc, task) => {
        const dateStr = task.date.toISOString().split('T')[0];
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push({
          goalId: task.goal.toString(),
          title: task.title,
          isCompleted: task.isCompleted,
        });
        return acc;
      },
      {} as Record<
        string,
        { goalId: string; title: string; isCompleted: boolean }[]
      >,
    );

    const allDates = currentWeek.weekDates;

    if (nextWeek) {
      allDates.push(...nextWeek.weekDates);
    }

    const weeklyTasks = allDates.map((date) => ({
      date,
      tasks: tasksByDate[date] || [],
    }));

    return {
      activeGoals,
      weeklyTasks,
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
