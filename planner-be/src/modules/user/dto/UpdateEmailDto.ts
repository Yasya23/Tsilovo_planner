import { IsEmail, IsString } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
