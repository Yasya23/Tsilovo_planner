import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard';

export const Auth = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};
