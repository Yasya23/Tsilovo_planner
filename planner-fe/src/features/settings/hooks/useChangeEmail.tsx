import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { UserService } from '@/features/settings/services/user.service';
import { ChangeEmailType } from '@/features/settings/types/settings';

export const useChangeEmail = (onUpdate: () => void, reset: () => void) => {
  const t = useTranslations('Common.settings');
  const [isPending, setIsPending] = useState(false);

  const changeEmail = async (values: ChangeEmailType) => {
    setIsPending(true);
    try {
      await UserService.changeEmail(values);
      onUpdate();
      toast.success(t('success'));
      reset();
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
