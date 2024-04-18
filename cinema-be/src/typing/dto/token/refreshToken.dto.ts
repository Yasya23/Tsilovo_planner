import { IsNotEmpty, IsString } from 'class-validator';

export class ResreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refrehToken: string;
}
