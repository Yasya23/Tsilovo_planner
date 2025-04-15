import { Controller, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { UpdateUserDto } from 'src/typing/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getUserProfile(@User('id') id: string) {
    return this.userService.getByID(id);
  }

  @Get()
  @Auth()
  async getUser(@User('id') id: string) {
    return this.userService.getByID(id);
  }

  @Put('profile')
  @Auth()
  async update(@User('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return { message: 'Profile deleted successfully' };
  }
}
