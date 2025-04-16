import { axiosAuth, axiosClassic } from '@/api/interceptors';

import { services } from '@/shared/constants/api-services';

import { AuthResponse, User } from '../types/auth.types';

export const AuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await axiosClassic.post<AuthResponse>(services.login, {
      email,
      password,
    });
    return data;
  },

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> {
    const { data } = await axiosClassic.post<AuthResponse>(services.register, {
      email,
      password,
      name,
    });
    return data;
  },

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
