import { axiosAuth, axiosClassic } from '@/api/interceptors';

import { services } from '@/features/auth/constants/api-services';

import { AuthResponse, User } from '@/features/auth/types/auth.types';

export const AuthenticationService = {
  async logout(): Promise<{ message: string }> {
    const { data } = await axiosClassic.post<{ message: string }>(
      services.logout
    );
    return data;
  },

  async getNewTokens(): Promise<AuthResponse> {
    const { data } = await axiosClassic.post<AuthResponse>(services.token);
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await axiosAuth.get<User>(services.userProfile);
    return data;
  },
};
