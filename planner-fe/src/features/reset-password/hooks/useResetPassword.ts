import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useRouter } from '@/lib/i18n/navigation';

import { routes } from '@/shared/constants/routes';

import { ResetPasswordService } from '@/features/reset-password/services/resetPassword.service';

export const useResetPassword = () => {
  const router = useRouter();
  const t = useTranslations('Common.resetPassword');
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const resetPassword = async (password: string) => {
    if (!token) return;

    setIsPending(true);
    try {
      await ResetPasswordService.resetPassword(password, token);
      toast.success(t('success'));
      router.replace(routes.login);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    resetPassword,
    isPending,
    tokenExists: !!token,
  };
};
