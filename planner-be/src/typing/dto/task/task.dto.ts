import { IsOptional, IsBoolean, IsString, IsDate } from 'class-validator';

export class TaskDto {
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  priority: string;

  @IsString()
  dueDate: string;
}
