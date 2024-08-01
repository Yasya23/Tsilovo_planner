import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegistrationDto, RefreshTokenDto } from 'src/typing/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() registrationDto: AuthDto) {
    return this.authService.login(registrationDto);
  }

  @Post('login/access-token')
  async getNewTokens(@Body() tokensDto: RefreshTokenDto) {
    return this.authService.getNewTokens(tokensDto);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return this.authService.register(registrationDto);
  }
}
