import { IsString } from 'class-validator';

export class PasswordDto {
  @IsString()
  password: string;

  @IsString()
  newPassword: string;
}

export class ResetPasswordDto {
  @IsString()
  password: string;
}
