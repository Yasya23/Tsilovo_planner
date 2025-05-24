import { UserModel } from '@/user/model/user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Request } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          const token = request?.cookies?.['accessToken'];
          if (!token) {
            throw new UnauthorizedException('No access token provided');
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    if (!payload?.id) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.userModel.findById(payload.id).exec();
    if (!user) {
      throw new UnauthorizedException('User not found or token invalid');
    }
    return user;
  }
}
