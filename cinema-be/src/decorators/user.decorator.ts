import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModelType } from 'src/typing/types';

export const User = createParamDecorator(
  (data: UserModelType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user ? user[data] : user;
  },
);
