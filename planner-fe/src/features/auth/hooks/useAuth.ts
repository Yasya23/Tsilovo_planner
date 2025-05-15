import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { routes } from '@/shared/constants/routes';
import { useAuthContext } from '@/shared/providers/AuthProvider';
import { LoginFormValues, RegisterFormValues } from '@/shared/types/auth.type';
import { responseError } from '@/shared/utils/response-error';

import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const route = useRouter();
  const { refetch } = useAuthContext();
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) =>
      AuthService.login(data.email, data.password),
    onSuccess: () => {
      toast.success('Login successful');
      refetch();
      route.push(routes.planner);
    },
    onError: (error) => {
      toast.error(responseError(error));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) =>
      AuthService.register(data.email, data.password, data.name),
    onSuccess: () => {
      toast.success('Registration successful');
      refetch();
      route.push(routes.planner);
    },
    onError: (error) => {
      toast.error(responseError(error));
    },
  });

  return {
    error: loginMutation.error || registerMutation.error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isPending: loginMutation.isPending || registerMutation.isPending,
  };
};
