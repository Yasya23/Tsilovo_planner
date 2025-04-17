import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { routes } from '@/shared/constants/routes';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/shared/types/interfaces/loginFormValues';
import { responseError } from '@/shared/utils/response-error';

import { AuthService } from '../services/auth.service';
import { User } from '../types/auth.types';

export const useAuth = () => {
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isPending } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        return await AuthService.getProfile();
      } catch {
        return null;
      }
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) =>
      AuthService.login(data.email, data.password),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Login successful');
      router.push(`${routes.planner}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(responseError(error));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) =>
      AuthService.register(data.email, data.password, data.name),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Registration successful');
      router.push(`${routes.planner}`);
    },
    onError: (error) => {
      toast.error(responseError(error));
    },
  });

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      queryClient.setQueryData(['user'], null);
      router.push('/');
    } catch (error) {
      toast.error(responseError(error));
    }
  }, [queryClient, router]);

  return {
    user,
    isPending,
    isAuthenticated: !!user,
    error: loginMutation.error || registerMutation.error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
  };
};
