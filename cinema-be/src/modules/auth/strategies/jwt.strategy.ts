import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiraions: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ _id }: Pick<UserModel, '_id'>) {
    return await this.UserModel.findById(_id).exec();
  }
}
