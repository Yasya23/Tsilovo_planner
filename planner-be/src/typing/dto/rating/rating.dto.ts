import { IsNumber, IsString } from 'class-validator';

export class RatingDto {
  @IsString()
  movieId: string;

  @IsNumber()
  value: number;
}
