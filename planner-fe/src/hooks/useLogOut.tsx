import { useRouter, usePathname } from 'next/navigation';
import { isUserAuth } from '@/helpers/storage/checkLocalStorage';
import { getToken, deleteUserWhenLogout } from '@/helpers';
import { useEffect } from 'react';

export const useLogOut = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const token = getToken();
  const user = isUserAuth();
  const isAnonim = isUserAuth(true);

  const logOut = () => {
    deleteUserWhenLogout();
    const protectedPaths = ['/profile'];

    const shouldStay = protectedPaths.some((path) =>
      currentPath.startsWith(path)
    );

    if (shouldStay) {
      router.push('/');
    }
  };

  console.log(!isAnonim && (!token || !user));

  useEffect(() => {
    if (!isAnonim && (!token || !user)) {
      logOut();
    }
  }, [token, user, isAnonim]);

  return { logOut };
};

export default useLogOut;
