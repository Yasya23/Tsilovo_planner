import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from 'src/models/user.model';

export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserModel }>();
    const user: UserModel = request.user;
    console.log(user);
    if (!user) throw new ForbiddenException('User not found');
    if (!user.isAdmin) throw new ForbiddenException("You don't have rights");
    return user.isAdmin;
  }
}
