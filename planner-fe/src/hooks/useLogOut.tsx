import { useRouter } from 'next/navigation';
import { isUserAuth } from '@/helpers/storage/checkLocalStorage';
import { getToken, deleteUserWhenLogout } from '@/helpers';
import { useEffect } from 'react';
import { routes } from '@/constants/routes';

export const useLogOut = () => {
  const router = useRouter();
  const token = getToken();
  const user = isUserAuth();

  const logOut = () => {
    deleteUserWhenLogout();
    router.push(routes.home);
  };

  // useEffect(() => {
  //   if (!token || !user) {
  //     logOut();
  //   }
  // }, [token, user]);

  return { logOut };
};

export default useLogOut;
