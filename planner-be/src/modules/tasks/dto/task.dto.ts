import {
  IsBoolean,
  IsString,
  IsDate,
  IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  title: string;

  @IsMongoId()
  goalId: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;
}

export class TaskDto extends CreateTaskDto {
  @IsMongoId()
  _id: string;
}
