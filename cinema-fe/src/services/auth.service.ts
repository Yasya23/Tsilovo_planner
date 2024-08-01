import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { UserAuth } from '@/types/userAuth.type';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import { getToken } from '@/helpers';

export const AuthService = {
  async login({ email, password }: LoginFormValues) {
    return await axiosClassic.post<UserAuth>(services.login, {
      email,
      password,
    });
  },

  async register() {
    return await axiosClassic.post<UserAuth>(services.register);
  },

  async refreshToken() {
    const refreshToken = getToken();
    return await axiosClassic.post<UserAuth>(services.token, {
      refreshToken,
    });
  },
};
