import Cookies from 'js-cookie';
import { User } from '@/types/user.type';

export const setCookies = ({ refreshToken, accessToken }: User) => {
  Cookies.set('a', accessToken);
  Cookies.set('r', refreshToken);
};

export const deleteCookies = () => {
  Cookies.remove('a');
  Cookies.remove('r');
};

export const getToken = () => {
  return Cookies.get('a');
};
