import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  name: string;
}
