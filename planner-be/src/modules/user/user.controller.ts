import {
  UpdateAvatarDto,
  UpdateEmailDto,
  UpdateNameDto,
  UpdatePasswordDto,
} from './dto';
import { UserService } from './user.service';
import { Auth } from '@/auth/decorators/auth.decorator';
import { User } from '@/user/decorator/user.decorator';
import { Body, Controller, Delete, Get, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getUserProfile(@User('id') id: string) {
    return this.userService.getByID(id);
  }

  @Put('name')
  @Auth()
  async updateName(@User('id') id: string, @Body() dto: UpdateNameDto) {
    await this.userService.updateName(id, dto);
  }

  @Put('email')
  @Auth()
  async updateEmail(@User('id') id: string, @Body() dto: UpdateEmailDto) {
    await this.userService.updateEmail(id, dto);
  }

  @Put('password')
  @Auth()
  async updatePassword(@User('id') id: string, @Body() dto: UpdatePasswordDto) {
    await this.userService.updatePassword(id, dto);
  }

  @Put('avatar')
  @Auth()
  async updateAvatar(@User('id') id: string, @Body() dto: UpdateAvatarDto) {
    return await this.userService.updateAvatar(id, dto);
  }

  @Delete()
  @Auth()
  async delete(@User('id') id: string) {
    await this.userService.deleteProfile(id);
  }
}
