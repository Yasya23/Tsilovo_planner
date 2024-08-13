import { deleteCookies } from '@/helpers';
import { useAuthStore } from '@/store/Store';

export const deleteUserWhenLogout = () => {
  useAuthStore.getState().logout();
  deleteCookies();
};
