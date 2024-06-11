import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 25, {
    message: 'Please ensure your password is between 5 and 25 characters long.',
  })
  password: string;
}
