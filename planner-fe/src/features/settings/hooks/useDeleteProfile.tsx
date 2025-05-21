import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { routes } from '@/shared/constants/routes';
import { useAuthentication } from '@/shared/hooks/useAuthentication';

import { UserService } from '@/features/settings/services/user.service';

export const useDeleteProfile = () => {
  const { logout } = useAuthentication();
  const router = useRouter();
  const t = useTranslations('Common.settings');

  const deleteProfile = useMutation({
    mutationFn: UserService.deleteProfile,
    onSuccess: () => {
      toast.success(t('successDelete'));
      logout();
      router.push(routes.login);
    },
    onError: () => toast.error(t('updateError')),
  });

  return {
    deleteProfile,
    isPending: deleteProfile.isPending,
  };
};
