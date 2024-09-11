import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ActorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  photo: string;
}
