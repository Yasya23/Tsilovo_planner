import { useRouter } from 'next/navigation';
import { isUserAuth } from '@/shared/helpers/storage/checkLocalStorage';
import { getToken } from '@/shared/helpers';
import { useEffect } from 'react';
import { routes } from '@/shared/constants/routes';

export const useLogOut = () => {
  const router = useRouter();
  const token = getToken();
  const user = isUserAuth();

  const logOut = () => {
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
