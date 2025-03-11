import { IsBoolean, IsString, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  title: string;

  @IsString()
  goalId: string;

  @IsDate()
  date: Date;
}

export class TaskDto extends CreateTaskDto {
  @IsString()
  _id: string;

  @IsString()
  userId: string;
}
