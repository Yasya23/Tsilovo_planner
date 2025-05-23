import { IsEmail, IsString } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: String;

  @IsString()
  password: String;

  @IsString()
  name: String;
}
