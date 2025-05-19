import { axiosAuth, axiosClassic } from '@/api/interceptors';

import { User } from '@/shared/types/user.type';

import { services } from '@/features/auth/constants/api-services';

export const AuthenticationService = {
  async logout(): Promise<void> {
    await axiosClassic.post(services.logout);
  },

  async getNewTokens(): Promise<void> {
    await axiosClassic.post(services.token);
  },

  async getProfile(): Promise<User> {
    const { data } = await axiosAuth.get<User>(services.userProfile);
    return data;
  },
};
