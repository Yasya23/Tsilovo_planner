import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

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
