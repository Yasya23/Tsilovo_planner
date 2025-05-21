import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { routes } from '@/shared/constants/routes';
import { useAuthentication } from '@/shared/hooks/useAuthentication';

import { UserService } from '@/features/settings/services/user.service';

import { ChangePasswordType } from '../types/updateData';

export const useChangePassword = () => {
  const { logout } = useAuthentication();
  const router = useRouter();
  const t = useTranslations('Common.settings');

  const changePassword = useMutation({
    mutationFn: (values: ChangePasswordType) => UserService.changePassword(values),
    onSuccess: () => {
      toast.success(t('success'));
      logout();
      router.push(routes.login);
    },
    onError: () => toast.error(t('updateError')),
  });

  return {
    changePassword: changePassword.mutate,
    isPending: changePassword.isPending,
  };
};
