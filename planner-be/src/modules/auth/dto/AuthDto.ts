import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: String;

  @IsString()
  password: String;
}
