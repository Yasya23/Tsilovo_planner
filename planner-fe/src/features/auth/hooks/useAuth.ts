import { useState } from 'react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

import { useRouter } from '@/lib/i18n/navigation';
import { AxiosError } from 'axios';

import { routes } from '@/shared/constants/routes';
import { useAuthContext } from '@/shared/providers/AuthProvider';
import { LoginFormValues, RegisterFormValues } from '@/shared/types/auth.type';

import { authErrorMessage } from '@/features/auth/helpers/auth-error';

import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const t = useTranslations('Common');
  const router = useRouter();
  const { refetch } = useAuthContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const login = async (data: LoginFormValues) => {
    setIsPending(true);
    setError(null);

    try {
      await AuthService.login(data.email, data.password);
      toast.success(t('notifications.loginSuccess'));
      refetch();
      router.push(routes.planner);
    } catch (err) {
      const axiosErr = err as AxiosError;
      setError(axiosErr);
      const message = authErrorMessage(axiosErr, 'login');
      toast.error(t(`errors.${message}`));
    } finally {
      setIsPending(false);
    }
  };

  const register = async (data: RegisterFormValues) => {
    setIsPending(true);
    setError(null);

    try {
      await AuthService.register(data.email, data.password, data.name);
      toast.success(t('notifications.registerSuccess'));
      refetch();
      router.push(routes.planner);
    } catch (err) {
      const axiosErr = err as AxiosError;
      setError(axiosErr);
      const message = authErrorMessage(axiosErr, 'register');
      toast.error(t(`errors.${message}`));
    } finally {
      setIsPending(false);
    }
  };

  return {
    error,
    login,
    register,
    isPending,
  };
};
