import { ActiveGoalsResponse, CreateGoalDto, UpdateGoalDto } from './dto';
import { GoalModel } from './model/goal.model';
import { DateService } from '@/date/date.service';
import { TaskService } from '@/tasks/tasks.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class GoalsService {
  MAX_GOALS = 5;
  constructor(
    @InjectModel(GoalModel)
    private readonly goalModel: ModelType<GoalModel>,
    private readonly dateService: DateService,
    private readonly taskService: TaskService,
  ) {}

  async getActiveGoals(userId: string): Promise<ActiveGoalsResponse> {
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

    const dates = [...currentWeek.weekDates, ...(nextWeek?.weekDates || [])];

    return {
      activeGoals,
      dates,
      tasks,
    };
  }

  async create(dto: CreateGoalDto, userId: string): Promise<void> {
    const goals = await this.goalModel.find({ userId, isActive: true }).exec();

    if (goals.length >= this.MAX_GOALS) {
      throw new BadRequestException('Maximum number of goals reached');
    }
    const goal = new this.goalModel({
      ...dto,
      userId,
      isActive: dto.isActive ?? true,
    });

    await goal.save();
  }

  async update(dto: UpdateGoalDto): Promise<void> {
    const taskId = new Types.ObjectId(dto._id);

    const goal = await this.goalModel.findById(taskId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.title = dto.title;
    goal.emoji = dto.emoji;
    goal.isActive = dto.isActive;

    await goal.save();
  }

  async delete(goalId: string): Promise<void> {
    const goal = await this.goalModel.findById(goalId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    goal.isActive = false;
    await goal.save();
  }

  async deleteAllGoals(userId: string): Promise<void> {
    await this.goalModel.deleteMany({ userId });
  }
}
