import { Controller, Get, Body, Put, Delete, Post } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { Auth } from 'src/modules/auth/decorator/auth.decorator';
import { User } from 'src/modules/user/decorator/user.decorator';
import { UpdateGoalDto, CreateGoalDto } from './dto/ManageGoalDto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalService: GoalsService) {}

  @Get()
  @Auth()
  async getActiveGoals(@User('id') userId: string) {
    return this.goalService.getActiveGoals(userId);
  }

  @Post()
  @Auth()
  async createGoal(@User('id') userId: string, @Body() dto: CreateGoalDto) {
    return await this.goalService.create(dto, userId);
  }

  @Put()
  @Auth()
  async updateGoal(@Body() dto: UpdateGoalDto) {
    return await this.goalService.update(dto);
  }

  @Delete()
  @Auth()
  async deleteGoal(@Body() goalId: string) {
    return await this.goalService.delete(goalId);
  }
}
