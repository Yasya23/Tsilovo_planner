import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { UpdateUserDto } from 'src/typing/dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth('admin')
  async getAll(@Query('query') query?: string) {
    return this.userService.getAll(query);
  }

  @Get('profile')
  @Auth()
  async getUserProfile(@User('id') id: string) {
    return this.userService.getByID(id);
  }

  @Get('count')
  @Auth('admin')
  async getTotalCount() {
    return this.userService.getTotalCount();
  }

  @Put('profile')
  @Auth()
  async update(@User('id') id: string, @Body() dto: UpdateUserDto) {
    await this.userService.update(id, dto);
    return { message: 'User profile updated successfully' };
  }

  @Put(':id')
  @Auth('admin')
  async updateAdmin(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    await this.userService.update(id, dto);
    return { message: 'Profile updated successfully' };
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return { message: 'Profile deleted successfully' };
  }
}
