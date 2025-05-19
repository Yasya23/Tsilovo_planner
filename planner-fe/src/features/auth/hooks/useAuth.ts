import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { routes } from '@/shared/constants/routes';
import { useAuthContext } from '@/shared/providers/AuthProvider';
import { LoginFormValues, RegisterFormValues } from '@/shared/types/auth.type';

import { authErrorMessage } from '@/features/auth/helpers/auth-error';

import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const t = useTranslations('Common');
  const route = useRouter();
  const { refetch } = useAuthContext();
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) =>
      AuthService.login(data.email, data.password),
    onSuccess: () => {
      toast.success(t('notifications.loginSuccess'));
      refetch();
      route.push(routes.planner);
    },
    onError: (error: AxiosError) => {
      const message = authErrorMessage(error, 'login');
      toast.error(t(`errors.${message}`));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) =>
      AuthService.register(data.email, data.password, data.name),
    onSuccess: () => {
      toast.success(t('notifications.registerSuccess'));
      refetch();
      route.push(routes.planner);
    },
    onError: (error: AxiosError) => {
      const message = authErrorMessage(error, 'register');
      toast.error(t(`errors.${message}`));
    },
  });

  return {
    error: loginMutation.error || registerMutation.error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isPending: loginMutation.isPending || registerMutation.isPending,
  };
};
