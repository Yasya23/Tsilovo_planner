import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth('admin')
  // @ApiCreatedResponse()
  // @ApiBody()
  async getUserProfile() {
    return this.userService.getByID();
  }
}
