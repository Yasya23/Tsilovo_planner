import { axiosClassic } from '@/api/interceptors';

import { services } from '@/features/confirm-delete-account/constants/api-services';

export const ConfirmService = {
  async confirmDeleteAccount(token: string): Promise<void> {
    await axiosClassic.post(`${services.confirmDelete}?token=${token}`);
  },
};
