import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { UserService } from '@/features/settings/services/user.service';
import { ChangeEmailType } from '@/features/settings/types/updateData';

export const useChangeEmail = (onUpdate: () => void, reset: () => void) => {
  const t = useTranslations('Common.settings');

  const changeEmail = useMutation({
    mutationFn: (values: ChangeEmailType) => UserService.changeEmail(values),
    onSuccess: () => {
      onUpdate();
      toast.success(t('success'));
      reset();
    },
    onError: () => {
      toast.error(t('updateEmailError'));
    },
  });

  return {
    changeEmail: changeEmail.mutate,
    isPending: changeEmail.isPending,
  };
};
