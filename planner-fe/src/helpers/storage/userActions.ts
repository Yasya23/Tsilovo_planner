import { deleteCookies } from '@/helpers';
import { useAuthStore } from '@/store/AuthStore';

export const deleteUserWhenLogout = () => {
  useAuthStore.getState().logout();
  deleteCookies();
};
