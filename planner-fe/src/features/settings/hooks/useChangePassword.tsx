import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useAuthentication } from '@/shared/hooks/useAuthentication';

import { UserService } from '@/features/settings/services/user.service';

import { ChangePasswordType } from '../types/settings';

export const useChangePassword = (reset: () => void) => {
  const { logout } = useAuthentication();
  const t = useTranslations('Common.settings');
  const [isPending, setIsPending] = useState(false);

  const changePassword = async (values: ChangePasswordType) => {
    setIsPending(true);
    try {
      await UserService.changePassword(values);
      toast.success(t('success'));
      logout();
      reset();
    } catch (error) {
      toast.error(t('updatePasswordError'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    changePassword,
    isPending,
  };
};
