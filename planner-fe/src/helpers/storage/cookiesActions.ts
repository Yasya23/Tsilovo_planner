import Cookies from 'js-cookie';
import { User } from '@/types/user.type';

export const setCookies = ({ refreshToken, accessToken }: User) => {
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);
};

export const deleteCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getToken = () => {
  return Cookies.get('accessToken');
};
