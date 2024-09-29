import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class TaskDto {
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  priority: string;
}
