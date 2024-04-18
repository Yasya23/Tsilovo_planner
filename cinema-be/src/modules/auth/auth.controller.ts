import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthDto, ResreshTokenDto } from 'src/typing/dto';

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

  @Post('login/access-token')
  @ApiCreatedResponse({ type: AuthDto })
  @ApiBody({ type: AuthDto })
  async getNewTokens(@Body() tokensDto: ResreshTokenDto) {
    return this.authService.getNewTokens(tokensDto);
  }

  @Post('register')
  @ApiCreatedResponse({ type: AuthDto })
  @ApiBody({ type: AuthDto })
  async register(@Body() registrationDto: AuthDto) {
    return this.authService.register(registrationDto);
  }
}
