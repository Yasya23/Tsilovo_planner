import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useAuthContext } from '@/shared/providers/AuthProvider';

import { UserService } from '@/features/settings/services/user.service';
import { ChangeEmailType } from '@/features/settings/types/settings';

export const useChangeEmail = () => {
  const t = useTranslations('Common.settings');
  const { logout } = useAuthContext();

  const [isPending, setIsPending] = useState(false);

  const changeEmail = async (values: ChangeEmailType) => {
    setIsPending(true);
    try {
      await UserService.changeEmail(values);
      toast.success(t('success'));
      logout();
    } catch (error) {
      toast.error(t('updateEmailError'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    changeEmail,
    isPending,
  };
};
