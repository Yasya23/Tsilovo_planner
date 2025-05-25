import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useRouter } from '@/lib/i18n/navigation';

import { routes } from '@/shared/constants/routes';
import { useAuthentication } from '@/shared/hooks/useAuthentication';

import { UserService } from '@/features/settings/services/user.service';

export const useDeleteProfile = () => {
  const { logout } = useAuthentication();
  const router = useRouter();
  const t = useTranslations('Common.settings');
  const [isPending, setIsPending] = useState(false);

  const deleteProfile = async () => {
    setIsPending(true);
    try {
      await UserService.deleteProfile();
      toast.success(t('successDelete'));
      await logout();
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
