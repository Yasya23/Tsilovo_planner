import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { UserService } from '@/features/settings/services/user.service';

import { ChangeNameType } from '../types/settings';

export const useChangeName = (onUpdate: () => void, reset: () => void) => {
  const t = useTranslations('Common.settings');

  const changeName = useMutation({
    mutationFn: (value: ChangeNameType) => UserService.changeName(value),
    onSuccess: () => {
      onUpdate();
      toast.success(t('success'));
      reset();
    },
    onError: () => toast.error(t('updateError')),
  });

  return {
    changeName: changeName.mutate,
    isPending: changeName.isPending,
  };
};
