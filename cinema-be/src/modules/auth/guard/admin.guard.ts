import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserModel } from 'src/models/user.model';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserModel }>();
    const user = request.user;

    if (!user.isAdmin) throw new ForbiddenException("You don't have rights");
    return user.isAdmin;
  }
}
