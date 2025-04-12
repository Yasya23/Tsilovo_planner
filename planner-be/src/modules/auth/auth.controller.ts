import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegistrationDto, RefreshTokenDto } from 'src/typing/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This is handled by the Google Strategy
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const tokens = await this.authService.googleLogin(user);

    // Set cookies
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Redirect to frontend
    res.redirect(process.env.FRONTEND_URL);
  }
}
