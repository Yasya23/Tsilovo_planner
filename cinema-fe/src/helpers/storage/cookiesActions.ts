import Cookies from 'js-cookie';
import { UserAuth } from '@/types/userAuth.type';

export const setCookies = ({ refreshToken, accessToken }: UserAuth) => {
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);
};

export const deleteCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getToken = () => {
  return Cookies.get('refreshToken');
};
