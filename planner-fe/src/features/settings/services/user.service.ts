import { axiosAuth } from '@/api/interceptors';

import { services } from '@/shared/constants/api-services';

export const UserService = {
  async updateProfile(imageUrl: string): Promise<void> {
    console.log(imageUrl);
    await axiosAuth.put(services.updateAvatar, { image: imageUrl });
  },
};
