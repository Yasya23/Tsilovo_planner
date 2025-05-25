import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useRouter } from '@/lib/i18n/navigation';

import { routes } from '@/shared/constants/routes';

import { ConfirmService } from '@/features/confirm-delete-account/services/confirm.service';

export const useConfirmDelete = () => {
  const t = useTranslations('Common.deleteAccount');
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const confirmDeleteAccount = async () => {
    if (!token) return;

    setIsPending(true);
    try {
      await ConfirmService.confirmDeleteAccount(token);
      toast.success(t('success'));
      router.push(routes.home);
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    confirmDeleteAccount,
    isPending,
    tokenExists: !!token,
  };
};
