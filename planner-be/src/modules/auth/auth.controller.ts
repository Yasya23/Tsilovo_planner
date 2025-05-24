import { AuthService } from './auth.service';
import { AuthDto, RegistrationDto } from './dto';
import { clearAuthCookies, setAuthCookies } from '@/auth/helpers/auth';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    setAuthCookies(res, accessToken, refreshToken);

    return {
      message: 'Login successful',
    };
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  async register(
    @Body() dto: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.register(dto);

    setAuthCookies(res, accessToken, refreshToken);

    return {
      message: 'Registration successful',
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    clearAuthCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('access-token')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        clearAuthCookies(res);
        throw new UnauthorizedException('Missing refresh token');
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.authService.getNewTokens(refreshToken);

      setAuthCookies(res, accessToken, newRefreshToken);

      return {
        message: 'Updated successful',
      };
    } catch (err) {
      clearAuthCookies(res);
      console.error('Token refresh failed:', err);
      throw new UnauthorizedException('Refresh token invalid or expired');
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const locale = req.cookies?.NEXT_LOCALE ?? 'en';
    try {
      const { accessToken, refreshToken } = await this.authService.googleLogin(
        req.user,
      );

      setAuthCookies(res, accessToken, refreshToken);

      res.redirect(
        `${this.configService.get('FRONTEND_URL')}/${locale}/planner`,
      );
      return;
    } catch {
      res.redirect(
        `${this.configService.get('FRONTEND_URL')}/${locale}/login?error=oauth_failed`,
      );
    }
  }
}
