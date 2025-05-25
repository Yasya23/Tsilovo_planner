import { axiosClassic } from '@/api/interceptors';

import { services } from '@/features/reset-password/constants/api-services';

export const ResetPasswordService = {
  async resetPassword(password: string, token: string): Promise<void> {
    await axiosClassic.post(
      services.resetPassword,
      { password },
      {
        params: { token },
      }
    );
  },
};
