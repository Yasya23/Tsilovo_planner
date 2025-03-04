import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { GoalModel } from 'src/models/goal.model';
import { CreateGoalDto, UpdateGoalDto } from './dto/ManageGoalDto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel(GoalModel)
    private readonly goalModel: ModelType<GoalModel>,
  ) {}

  async get(userId: string) {
    return this.goalModel.find({ userId, isActive: true }).exec();
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
