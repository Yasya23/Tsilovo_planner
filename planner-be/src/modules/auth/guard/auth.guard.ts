import { UserModel } from '@/user/model/user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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
    if (err) {
      throw new UnauthorizedException(err.message || 'Authentication failed');
    }

    if (!user) {
      throw new UnauthorizedException(
        info?.message || 'No user found in request',
      );
    }

    return user;
  }
}
