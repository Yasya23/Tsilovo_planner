import { axiosClassic } from '@/api/interceptors';

import { services } from '@/features/forgot-password/constants/api-services';

export const ForgotPasswordService = {
  async forgotPassword({ email }: { email: string }): Promise<void> {
    await axiosClassic.post(services.forgotPassword, { email });
  },
};
