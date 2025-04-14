import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegistrationDto } from 'src/typing/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guard/auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 10 * 60 * 60 * 1000, // 10h
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 21 * 24 * 60 * 60 * 1000, // 21d
    });
  }

  @Post('login')
  async login(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.login(dto);
      this.setAuthCookies(res, accessToken, refreshToken);
      return res.status(HttpStatus.OK).json({ message: 'Login successful' });
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }

  @Post('register')
  async register(@Body() dto: RegistrationDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } =
        await this.authService.register(dto);
      this.setAuthCookies(res, accessToken, refreshToken);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Registration successful' });
    } catch (err) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: err.message || 'Registration failed' });
    }
  }

  @Post('login/access-token')
  @UseGuards(JwtAuthGuard)
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      const { accessToken, refreshToken: newRefresh } =
        await this.authService.getNewTokens(refreshToken);
      this.setAuthCookies(res, accessToken, newRefresh);
      return res.status(HttpStatus.OK).json({ message: 'Token refreshed' });
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Refresh token invalid or expired' });
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // No body needed, Passport will handle redirect
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const { locale = 'en' } = req.query;
      const { accessToken, refreshToken } = await this.authService.googleLogin(
        req.user,
      );
      this.setAuthCookies(res, accessToken, refreshToken);
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/${locale}/planner`,
      );
    } catch (err) {
      const locale = req.query.locale || 'en';
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/${locale}/login?error=oauth_failed`,
      );
    }
  }
}
