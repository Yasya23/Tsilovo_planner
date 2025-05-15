import { AxiosResponse } from 'axios';

import {
  LoginFormValues,
  RegisterFormValues,
} from '../types/interfaces/loginFormValues';
import { UserResponse } from './user.type';

export type AuthService = {
  login({
    email,
    password,
  }: LoginFormValues): Promise<AxiosResponse<UserResponse>>;
  register({
    email,
    password,
    name,
  }: RegisterFormValues): Promise<AxiosResponse<UserResponse>>;
  update(data: LoginFormValues): Promise<AxiosResponse<UserResponse>>;
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
