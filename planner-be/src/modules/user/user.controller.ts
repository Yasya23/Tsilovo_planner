import {
  ForgetPasswordDto,
  PasswordDto,
  ResetPasswordDto,
  UpdateAvatarDto,
  UpdateEmailDto,
  UpdateNameDto,
} from './dto';
import { UserModel } from './model/user.model';
import { UserService } from './user.service';
import { Auth } from '@/auth/decorator/auth.decorator';
import { Locale, LocaleType } from '@/shared/decorator/locale.decorator';
import { User } from '@/user/decorator/user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getUserProfile(@User('id') id: string): Promise<Partial<UserModel>> {
    return this.userService.getProfile(id);
  }

  @Post('forgot-password')
  async forgetPassword(
    @Body() dto: ForgetPasswordDto,
    @Locale() locale: LocaleType,
  ): Promise<void> {
    await this.userService.forgotPassword(dto, locale);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() dto: ResetPasswordDto,
    @Locale() locale: LocaleType,
  ): Promise<void> {
    await this.userService.resetPasswordWithToken(token, dto, locale);
  }

  @Put('name')
  @Auth()
  async updateName(
    @User('id') id: string,
    @Body() dto: UpdateNameDto,
  ): Promise<void> {
    await this.userService.updateName(id, dto);
  }

  @Put('email')
  @Auth()
  async updateEmail(
    @User('id') id: string,
    @Body() dto: UpdateEmailDto,
    @Locale() locale: LocaleType,
  ): Promise<void> {
    await this.userService.updateEmail(id, dto, locale);
  }

  @Put('password')
  @Auth()
  async updatePassword(
    @User('id') id: string,
    @Body() dto: PasswordDto,
    @Locale() locale: LocaleType,
  ): Promise<void> {
    await this.userService.updatePassword(id, dto, locale);
  }

  @Put('avatar')
  @Auth()
  async updateAvatar(
    @User('id') id: string,
    @Body() dto: UpdateAvatarDto,
  ): Promise<void> {
    await this.userService.updateAvatar(id, dto);
  }

  @Delete()
  @Auth()
  async delete(
    @User('id') id: string,
    @Locale() locale: LocaleType,
  ): Promise<void> {
    await this.userService.deleteProfile(id, locale);
  }

  @Delete('confirm-delete')
  async confirmDelete(
    @Query('token') token: string,
    @Locale() locale: LocaleType,
  ): Promise<void> {
    await this.userService.deleteAccountWithToken(token, locale);
  }
}
