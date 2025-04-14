import Cookies from 'js-cookie';
import { User } from '@/shared/types/user.type';

export const setCookies = ({ refreshToken, accessToken }: User) => {
  Cookies.set('accessToken', accessToken, {
    path: '/',
    secure: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    sameSite: 'lax',
  });
  Cookies.set('refreshToken', refreshToken, {
    path: '/',
    secure: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    sameSite: 'lax',
  });
};

export const deleteCookies = () => {
  Cookies.remove('accessToken', { path: '/' });
  Cookies.remove('refreshToken', { path: '/' });
};

export const getToken = () => {
  return Cookies.get('accessToken');
};
