import {
  IsNumber,
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  poster: string;

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
  date: number;

  @IsNumber()
  duration: number;

  @IsString()
  country: string;

  @IsString()
  type: string;
}
