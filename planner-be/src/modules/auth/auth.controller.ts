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
      maxAge: 10 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 21 * 24 * 60 * 60 * 1000,
    });
  }

  @Post('login')
  async login(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken, id, name, email, image } =
        await this.authService.login(dto);
      this.setAuthCookies(res, accessToken, refreshToken);
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        user: { id, name, email, image },
      });
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }

  @Post('register')
  async register(@Body() dto: RegistrationDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken, id, name, email, image } =
        await this.authService.register(dto);
      this.setAuthCookies(res, accessToken, refreshToken);
      return res.status(HttpStatus.CREATED).json({
        message: 'Registration successful',
        user: { id, name, email, image },
      });
    } catch (err) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: err.message || 'Registration failed' });
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }

  @Post('access-token')
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Missing refresh token',
        });
      }
      const {
        accessToken,
        refreshToken: newRefreshToken,
        id,
        name,
        email,
        image,
      } = await this.authService.getNewTokens(refreshToken);

      this.setAuthCookies(res, accessToken, newRefreshToken);

      return res.status(HttpStatus.OK).json({
        user: { id, name, email, image },
      });
    } catch (err) {
      console.error('Token refresh failed:', err);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Refresh token invalid or expired',
      });
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
    const locale = req.cookies?.NEXT_LOCALE ?? 'en';

    try {
      const { accessToken, refreshToken, id, name, email, image } =
        await this.authService.googleLogin(req.user);
      this.setAuthCookies(res, accessToken, refreshToken);

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
