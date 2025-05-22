import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useRouter } from '@/lib/i18n/navigation';

import { routes } from '@/shared/constants/routes';

import { ResetPasswordService } from '@/features/reset-password/services/resetPassword.service';

export const useResetPassword = () => {
  const router = useRouter();
  const t = useTranslations('Common.settings');
  const [isPending, setIsPending] = useState(false);

  const resetPassword = async (password: string) => {
    setIsPending(true);
    try {
      await ResetPasswordService.resetPassword(password);
      toast.success(t('resetPasswordSuccess'));
      router.push(routes.login);
    } catch (error) {
      toast.error(t('updateError'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    resetPassword,
    isPending,
  };
};
