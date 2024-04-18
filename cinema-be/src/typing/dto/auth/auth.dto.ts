import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Length(5, 25, {
    message: 'Please ensure your password is between 5 and 25 characters long.',
  })
  password: string;
}
