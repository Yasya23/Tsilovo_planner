import { Controller, Body, Delete, Put, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
  UpdateNameDto,
  UpdateEmailDto,
  UpdatePasswordDto,
  UpdateAvatarDto,
} from './dto';

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
    return await this.userService.updateName(id, dto);
  }

  @Put('email')
  @Auth()
  async updateEmail(@User('id') id: string, @Body() dto: UpdateEmailDto) {
    return await this.userService.updateEmail(id, dto);
  }

  @Put('password')
  @Auth()
  async updatePassword(@User('id') id: string, @Body() dto: UpdatePasswordDto) {
    return await this.userService.updatePassword(id, dto);
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
