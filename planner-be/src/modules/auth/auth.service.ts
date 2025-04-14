import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, RegistrationDto } from 'src/typing/dto';
import { hash, genSalt, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // adjust path as needed

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: AuthDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("User with this email doesn't exist");
    }

    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    const tokens = await this.createTokenPair(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async register(registrationDto: RegistrationDto) {
    const existingUser = await this.userService.findByEmail(
      registrationDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(registrationDto.password, salt);

    const newUser = await this.userService.create({
      ...registrationDto,
      password: hashedPassword,
    });

    const tokens = await this.createTokenPair(newUser.id);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async getNewTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Please sign in');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.userService.getByID(payload.id);
    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.createTokenPair(user.id);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async googleLogin(userData: any) {
    let user = await this.userService.findByEmail(userData.email);

    if (!user) {
      user = await this.userService.create({
        name: userData.name || 'No Name',
        email: userData.email,
        password: userData.password,
        provider: 'google',
      });
    }

    const tokens = await this.createTokenPair(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private async createTokenPair(userId: string) {
    const payload = { id: userId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '21d',
    });
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10h',
    });
    return { refreshToken, accessToken };
  }
}
