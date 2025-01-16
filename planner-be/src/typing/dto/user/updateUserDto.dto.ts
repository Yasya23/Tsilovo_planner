import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  newPassword: string;

  @IsOptional()
  @IsString()
  name: string;
}
