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
import { clearAuthCookies, setAuthCookies } from './helpers/auth';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, id, name, email, image } =
      await this.authService.login(dto);

    setAuthCookies(res, accessToken, refreshToken);

    return {
      message: 'Login successful',
      user: { id, name, email, image },
    };
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  async register(
    @Body() dto: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, id, name, email, image } =
      await this.authService.register(dto);

    setAuthCookies(res, accessToken, refreshToken);

    return {
      message: 'Registration successful',
      user: { id, name, email, image },
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    clearAuthCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('access-token')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        clearAuthCookies(res);
        return {
          message: 'Missing refresh token',
        };
      }

      const {
        accessToken,
        refreshToken: newRefreshToken,
        id,
        name,
        email,
        image,
      } = await this.authService.getNewTokens(refreshToken);

      setAuthCookies(res, accessToken, newRefreshToken);

      return {
        user: { id, name, email, image },
      };
    } catch (err) {
      clearAuthCookies(res);
      console.error('Token refresh failed:', err?.message || err);

      return {
        message: 'Refresh token invalid or expired',
      };
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

      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/${locale}/planner`,
      );
    } catch (err) {
      return res.redirect(
        `${this.configService.get('FRONTEND_URL')}/${locale}/login?error=oauth_failed`,
      );
    }
  }
}
