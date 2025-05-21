import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { routes } from '@/shared/constants/routes';
import { useAuthentication } from '@/shared/hooks/useAuthentication';

import { UserService } from '@/features/settings/services/user.service';

import { ChangePasswordType } from '../types/updateData';

export const useChangePassword = (reset: () => void) => {
  const { logout } = useAuthentication();
  const router = useRouter();
  const t = useTranslations('Common.settings');

  const changePassword = useMutation({
    mutationFn: (values: ChangePasswordType) =>
      UserService.changePassword(values),
    onSuccess: () => {
      toast.success(t('success'));
      logout();
      reset();
    },
    onError: () => toast.error(t('updatePasswordError')),
  });

  return {
    changePassword: changePassword.mutate,
    isPending: changePassword.isPending,
  };
};
