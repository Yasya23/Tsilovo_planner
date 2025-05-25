import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useAuthContext } from '@/shared/providers/AuthProvider';

import { UserService } from '@/features/settings/services/user.service';

export const useDeleteProfile = () => {
  const { logout } = useAuthContext();
  const t = useTranslations('Common.settings');
  const [isPending, setIsPending] = useState(false);

  const deleteProfile = async () => {
    setIsPending(true);
    try {
      await UserService.deleteProfile();
      toast.success(t('successDelete'));
      logout();
    } catch (error) {
      toast.error(t('updateError'));
    } finally {
      setIsPending(false);
    }
  };

  return {
    deleteProfile,
    isPending,
  };
};
