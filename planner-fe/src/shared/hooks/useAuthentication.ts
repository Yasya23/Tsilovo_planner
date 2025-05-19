import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { queries } from '@/shared/constants/queries';
import { routes } from '@/shared/constants/routes';
import { AuthenticationService } from '@/shared/services/authentication.service';
import { User } from '@/shared/types/user.type';

export const useAuthentication = () => {
  const t = useTranslations('Common');
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    isError,
  } = useQuery<User | null>({
    queryKey: [queries.user],
    queryFn: async () => {
      try {
        return await AuthenticationService.getProfile();
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const logout = useCallback(async () => {
    try {
      await AuthenticationService.logout();
      queryClient.setQueryData([queries.user], null);
      router.push(routes.home);
    } catch (error) {
      toast.error(t('errors.logoutError'));
    }
  }, [queryClient, router]);

  return {
    user,
    isPending,
    isAuthenticated: !!user,
    logout,
    error: isError,
  };
};
