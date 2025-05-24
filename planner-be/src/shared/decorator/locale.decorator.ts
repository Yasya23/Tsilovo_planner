import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type LocaleType = 'en' | 'uk';

export const Locale = createParamDecorator(
  (defaultLocale: string = 'en', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies?.NEXT_LOCALE ?? defaultLocale;
  },
);
