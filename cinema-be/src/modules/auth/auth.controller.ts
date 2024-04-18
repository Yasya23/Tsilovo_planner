import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthDto } from 'src/typing/dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: AuthDto })
  @ApiBody({ type: AuthDto })
  async login(@Body() registrationDto: AuthDto) {
    return this.authService.login(registrationDto);
  }

  @Post('register')
  @ApiCreatedResponse({ type: AuthDto })
  @ApiBody({ type: AuthDto })
  async register(@Body() registrationDto: AuthDto) {
    return this.authService.register(registrationDto);
  }
}
