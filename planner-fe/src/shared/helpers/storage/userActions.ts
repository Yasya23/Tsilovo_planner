import { deleteCookies } from '@/shared/helpers';
import { useAuthStore } from '@/shared/store/AuthStore';

export const deleteUserWhenLogout = () => {
  useAuthStore.getState().logout();
  deleteCookies();
};
