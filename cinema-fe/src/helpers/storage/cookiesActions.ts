import Cookies from 'js-cookie';
import { UserAuth } from '@/types/userAuth.type';
import { setStore } from '@/store /Store';

export const setCookies = ({ refreshToken, accessToken }: UserAuth) => {
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', refreshToken);
};

export const deleteCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  setStore({ userAuth: null });
};

export const getToken = () => {
  return Cookies.get('refreshToken');
};
