import { useRouter, usePathname } from 'next/navigation';
import { isUserAuth } from '@/helpers/storage/checkLocalStorage';
import { getToken, deleteUserWhenLogout } from '@/helpers';
import { useEffect } from 'react';
import { routes } from '@/constants/routes';
import { useTaskStore } from '@/store';

export const useLogOut = () => {
  const router = useRouter();
  const token = getToken();
  const user = isUserAuth();
  const { cleanTasks } = useTaskStore();

  const logOut = () => {
    deleteUserWhenLogout();
    cleanTasks();
    router.push(routes.planner);
  };

  useEffect(() => {
    if (!token || !user) {
      logOut();
      cleanTasks();
    }
  }, [token, user]);

  return { logOut };
};

export default useLogOut;
