import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModelType } from '../model/user.model';

export const User = createParamDecorator(
  (data: UserModelType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user && data ? user[data] : user;
  },
);
