import { IsString } from 'class-validator';

export class PasswordDto {
  @IsString()
  password: string;

  @IsString()
  newPassword: string;
}
