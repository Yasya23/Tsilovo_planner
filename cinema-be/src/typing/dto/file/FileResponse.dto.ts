import { IsString, IsNotEmpty } from 'class-validator';

export class FileResponseDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
