import {
  IsBoolean,
  IsString,
  ValidateNested,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class TaskDto {
  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  title: string;
}

class DailyTaskDto {
  @IsString()
  day: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks: TaskDto[];
}

export class WeekTasksDto {
  @IsString()
  id: string;

  @IsNumber()
  week: number;

  @IsString({ each: true })
  notes: [string, string, string];

  @ValidateNested({ each: true })
  @Type(() => DailyTaskDto)
  dailyTasks: DailyTaskDto[];
}

export class YearStatisticDto {
  totalTasks: number;
  completedTasks: number;

  @ValidateNested({ each: true })
  @Type(() => WeekTasksDto)
  weeklyStatistics: WeekTasksDto[];
}
