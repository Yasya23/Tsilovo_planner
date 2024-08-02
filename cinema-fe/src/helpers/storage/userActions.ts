import { setStore } from '@/store /Store';
import { deleteCookies, setCookies } from '@/helpers';
import { UserAuth } from '@/types/userAuth.type';

export const deleteUserWhenLogout = () => {
  setStore({ userAuth: null });
  deleteCookies();
};

export const saveUserWhenAuth = (data: UserAuth) => {
  setStore({ userAuth: data });
  setCookies(data);
};
