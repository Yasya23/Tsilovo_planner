import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from 'src/models/user.model';

interface AuthInfo {
  message?: string;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = UserModel>(
    err: Error | null,
    user: TUser | null,
    info: AuthInfo,
  ): TUser {
    if (err || !user) {
      throw new UnauthorizedException(
        info?.message || 'Invalid or expired token',
      );
    }
    return user;
  }
}
