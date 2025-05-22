import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { UserService } from '@/features/settings/services/user.service';

import { ChangeNameType } from '../types/settings';

export const useChangeName = (onUpdate: () => void, reset: () => void) => {
  const t = useTranslations('Common.settings');
  const [isPending, setIsPending] = useState(false);

  const changeName = async (value: ChangeNameType) => {
    setIsPending(true);
    try {
      await UserService.changeName(value);
      onUpdate();
      toast.success(t('success'));
      reset();
    } catch (error) {
      toast.error(t('updateError'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    changeName,
    isPending,
  };
};
