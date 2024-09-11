import {
  IsNumber,
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { MovieType } from 'src/typing/types/movie-type';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  poster: string;

  @IsString()
  photo: string;

  @IsString()
  videoUrl: string;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @IsOptional()
  @IsBoolean()
  isSendToTelegram?: boolean;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsString()
  country: string;

  @IsString()
  type: MovieType;

  @IsOptional()
  @IsNumber()
  ageRestricted?: number;
}
