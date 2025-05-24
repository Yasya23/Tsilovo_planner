import { AxiosError } from 'axios';

export const authErrorMessage = (
  error: AxiosError,
  type: 'login' | 'register'
): string => {
  const isUnauthorized = error?.response?.status === 401;
  const userExists = error?.response?.status === 400;
  return isUnauthorized && type === 'login'
    ? 'loginError'
    : userExists && type === 'register'
      ? 'registerError'
      : 'generalAuthError';
};
