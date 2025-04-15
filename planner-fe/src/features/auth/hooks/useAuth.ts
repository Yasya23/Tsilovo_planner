import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { AuthService } from '../services/auth.service';
import { responseError } from '@/shared/utils';
import { User } from '../types/auth.types';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/shared/types/interfaces/loginFormValues';

export const useAuth = () => {
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
    },
    onError: (error) => {
      toast.error(responseError(error));
    },
  });

  const logout = useCallback(async () => {
    console.log(1);
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
