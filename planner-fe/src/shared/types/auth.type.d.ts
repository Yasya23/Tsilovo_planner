import { UserResponse } from '@/shared/types/user.type';

export type AuthService = {
  logout(): Promise<AxiosResponse>;
  getTokens(): Promise<UserResponse>;
  googleAuth(): void;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = LoginFormValues & {
  name: string;
};
