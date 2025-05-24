import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  emoji: string;

  @IsBoolean()
  isActive: boolean;
}

export class UpdateGoalDto extends CreateGoalDto {
  @IsMongoId()
  _id: string;
}
