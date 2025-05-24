import { JwtAuthGuard } from '@/auth/guard/auth.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export const Auth = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};
