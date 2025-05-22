import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { ForgotPasswordService } from '../services/forgotPassword.service';

export const useRestorePassword = () => {
  const t = useTranslations('Common.settings');
  const [isPending, setIsPending] = useState(false);

  const restorePassword = async (data: { email: string }) => {
    setIsPending(true);
    try {
      await ForgotPasswordService.forgotPassword(data);
      toast.success(t('resetPasswordSuccess'));
    } catch (error) {
      toast.error(t('updateError'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    restorePassword,
    isPending,
  };
};
