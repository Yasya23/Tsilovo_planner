import { UserModelType } from '@/user/model/user.model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: UserModelType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user && data ? user[data] : user;
  },
);
