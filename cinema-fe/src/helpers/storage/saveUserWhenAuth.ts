import { setStore } from '@/store /Store';
import { setCookies } from '@/helpers';
import { UserAuth } from '@/types/userAuth.type';

export const saveUserWhenAuth = (data: UserAuth) => {
  localStorage.setItem('userId', data.id);
  setStore({ userAuth: data });
  setCookies(data);
};
