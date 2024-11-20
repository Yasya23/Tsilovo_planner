import {
  IsBoolean,
  IsString,
  ValidateNested,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class TaskDto {
  @IsString()
  _id: string;

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
  @IsOptional()
  _id: string;

  @IsNumber()
  @IsOptional()
  week: number;

  @IsString({ each: true })
  @IsOptional()
  notes: string[];

  @ValidateNested({ each: true })
  @Type(() => DailyTaskDto)
  @IsOptional()
  dailyTasks: DailyTaskDto[];
}
