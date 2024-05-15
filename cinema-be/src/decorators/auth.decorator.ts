import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/modules/auth/guard';
import { JwtAuthGuard } from 'src/modules/auth/guard';
import { UserRoleType } from 'src/typing/types';

export const Auth = (role: UserRoleType = 'user') => {
  return applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthGuard, AdminGuard)
      : UseGuards(JwtAuthGuard),
  );
};
