import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    done(null, user);
  }
}
