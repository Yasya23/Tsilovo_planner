import { axiosClassic } from '@/api/interceptors';

import { services } from '@/features/auth/constants/api-services';

export const AuthService = {
  async login(email: string, password: string): Promise<void> {
    await axiosClassic.post<Response>(services.login, {
      email,
      password,
    });
  },

  async register(email: string, password: string, name: string): Promise<void> {
    await axiosClassic.post<Response>(services.register, {
      email,
      password,
      name,
    });
  },
};
