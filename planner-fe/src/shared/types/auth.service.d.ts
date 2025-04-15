import { AxiosResponse } from 'axios';
import { UserResponse } from './user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '../types/interfaces/loginFormValues';

export interface AuthService {
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
}
