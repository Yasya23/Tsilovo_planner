import axiosClassic from 'axios';

import { services } from '@/features/auth/constants/api-services';

export const ConfirmService = {
  async confirmDeleteAccount(token: string): Promise<void> {
    await axiosClassic.delete(services.confirmDeleteProfile, {
      params: { token },
    });
  },
};
