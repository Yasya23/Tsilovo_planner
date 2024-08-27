import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { User } from '@/types/user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/types/interfaces/loginFormValues';
import { getToken } from '@/helpers';

export const AuthService = {
  async login({ email, password }: LoginFormValues) {
    return await axiosClassic.post<User>(services.login, {
      email,
      password,
    });
  },

  async register({ email, password, name }: RegisterFormValues) {
    return await axiosClassic.post<User>(services.register, {
      name,
      email,
      password,
    });
  },

  async getTokens(): Promise<User> {
    const refreshToken = getToken();
    const response = await axiosClassic.post<User>(services.token, {
      refreshToken,
    });
    return response.data;
  },
};
