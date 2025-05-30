import { AuthDto, RegistrationDto } from './dto';
import { JwtPayload, UserGoogleType } from './types';
import { UserService } from '@/user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: AuthDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new BadRequestException('User is not active');
    }

    if (user.provider === 'google') {
      throw new BadRequestException(
        'User with google account cannot login with email and password',
      );
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.createTokenPair(user.id);

    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new UnauthorizedException('Failed to create tokens');
    }

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async register(registrationDto: RegistrationDto) {
    const existingUser = await this.userService.findByEmail(
      registrationDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const saltHash = Number(this.configService.get('PASSWORD_SALT'));
    const salt = await genSalt(saltHash);
    const hashedPassword = await hash(registrationDto.password, salt);

    const newUser = await this.userService.create({
      ...registrationDto,
      password: hashedPassword,
    });

    const tokens = await this.createTokenPair(newUser.id);

    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new UnauthorizedException('Failed to create tokens');
    }

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      name: newUser.name,
      email: newUser.email,
    };
  }

  async getNewTokens(refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token is missing');

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userService.getByID(payload.id);
    if (!user) throw new UnauthorizedException('User not found');

    if (user.dataChangedAt) {
      const issuedAt = (payload.iat ?? 0) * 1000;
      const changedAt = new Date(user.dataChangedAt).getTime();

      const isTokenInvalid = issuedAt < changedAt;

      if (isTokenInvalid) {
        throw new UnauthorizedException('Token is no longer valid');
      }
    }

    const tokens = await this.createTokenPair(user.id);
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new UnauthorizedException('Failed to create new tokens');
    }

    return tokens;
  }

  async googleLogin(userData: UserGoogleType) {
    let user = await this.userService.findByEmail(userData.email);

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await this.userService.create({
        name: userData.name || 'Anonim',
        email: userData.email,
        password: userData.password,
        image: userData.picture,
        provider: 'google',
      });
    }

    if (!user.isActive) {
      throw new BadRequestException('User is not active');
    }

    const tokens = await this.createTokenPair(user.id);

    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new UnauthorizedException('Failed to create tokens');
    }

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      name: user.name,
      email: user.email,
      isNewUser,
    };
  }

  private async createTokenPair(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User is required for token creation');
    }

    const payload = { id: userId };
    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
      }),
    ]);

    if (!refreshToken || !accessToken) {
      throw new UnauthorizedException('Failed to create tokens');
    }

    return { refreshToken, accessToken };
  }
}
