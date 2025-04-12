import { services } from '@/shared/constants/api-services';
import { axiosClassic } from '@/api/interceptors';
import { User } from '@/shared/types/user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/shared/types/interfaces/loginFormValues';
import { getToken } from '@/shared/helpers';
import instance from '@/api/interceptors';

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

  async update(data: LoginFormValues) {
    return await axiosClassic.put<User>(services.update, {
      ...data,
    });
  },

  async getTokens(): Promise<User> {
    const refreshToken = getToken();
    const response = await instance.post<User>(services.token, {
      refreshToken,
    });
    return response.data;
  },

  async googleAuth() {
    window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google`;
  },
};
