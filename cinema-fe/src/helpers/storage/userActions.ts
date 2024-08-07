import { deleteCookies, setCookies } from '@/helpers';
import { UserAuth } from '@/types/userAuth.type';
import { useAuthStore } from '@/store/Store';

export const deleteUserWhenLogout = () => {
  useAuthStore.getState().delete();
  deleteCookies();
};

export const saveUserWhenAuth = async (data: UserAuth) => {
  await useAuthStore.getState().setData(data);
  console.log(data);
  setCookies(data);
};
