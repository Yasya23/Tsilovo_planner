import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useRouter } from '@/lib/i18n/navigation';

import { routes } from '@/shared/constants/routes';

import { ForgotPasswordService } from '../services/forgotPassword.service';

export const useRestorePassword = () => {
  const t = useTranslations('Common.forgotPassword');
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const restorePassword = async (data: { email: string }) => {
    setIsPending(true);
    try {
      await ForgotPasswordService.forgotPassword(data);
      toast.success(t('success'));
      router.push(routes.home);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    restorePassword,
    isPending,
  };
};
