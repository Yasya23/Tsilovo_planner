import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { UserService } from '@/features/settings/services/user.service';
import { ChangeEmailType } from '@/features/settings/types/updateData';

export const useChangeEmail = (onUpdate: () => void) => {
  const t = useTranslations('Common.settings');

  const changeEmail = useMutation({
    mutationFn: (values: ChangeEmailType) => UserService.changeEmail(values),
    onSuccess: () => {
      onUpdate();
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('updateError'));
    },
  });

  return {
    changeEmail: changeEmail.mutate,
    isPending: changeEmail.isPending,
  };
};
