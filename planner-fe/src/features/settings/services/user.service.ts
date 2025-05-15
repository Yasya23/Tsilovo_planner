import { axiosAuth } from '@/api/interceptors';

import { services } from '@/features/settings/constants/api-services';

export const UserService = {
  async updateProfile(imageUrl: string): Promise<void> {
    await axiosAuth.put(services.avatar, { image: imageUrl });
  },
};
