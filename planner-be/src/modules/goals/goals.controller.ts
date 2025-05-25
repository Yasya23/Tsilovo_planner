import { ActiveGoalsResponse } from './dto';
import { CreateGoalDto, UpdateGoalDto } from './dto/ManageGoalDto';
import { GoalsService } from './goals.service';
import { Auth } from '@/auth/decorator/auth.decorator';
import { User } from '@/user/decorator/user.decorator';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalService: GoalsService) {}

  @Get()
  @Auth()
  async getActiveGoals(
    @User('id') userId: string,
  ): Promise<ActiveGoalsResponse> {
    return this.goalService.getActiveGoals(userId);
  }

  @Post()
  @Auth()
  async createGoal(
    @User('id') userId: string,
    @Body() dto: CreateGoalDto,
  ): Promise<void> {
    await this.goalService.create(dto, userId);
  }

  @Put()
  @Auth()
  async updateGoal(@Body() dto: UpdateGoalDto): Promise<void> {
    await this.goalService.update(dto);
  }

  @Delete()
  @Auth()
  async deleteGoal(@Body() goalId: string): Promise<void> {
    await this.goalService.delete(goalId);
  }
}
