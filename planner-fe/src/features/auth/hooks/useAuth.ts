import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/auth.service';
import { setCookies, deleteCookies } from '@/shared/helpers';
import { responseError } from '@/shared/utils';
import { UserResponse } from '@/shared/types/user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/shared/types/interfaces/loginFormValues';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading: isUserLoading } = useQuery<UserResponse | null>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await AuthService.getTokens();
        return response;
      } catch (error) {
        console.error('Auth check error:', error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const authenticateMutation = useMutation<
    UserResponse,
    Error,
    {
      data: LoginFormValues | RegisterFormValues;
      action: 'login' | 'register' | 'update';
    }
  >({
    mutationFn: async ({ data, action }) => {
      let response;
      if (action === 'login') {
        response = await AuthService.login(data as LoginFormValues);
      } else if (action === 'register') {
        response = await AuthService.register(data as RegisterFormValues);
      } else if (action === 'update') {
        response = await AuthService.update(data as LoginFormValues);
      }

      if (response?.data) {
        if (action !== 'update') {
          setCookies(response.data.user);
        }
        return response.data;
      }
      throw new Error('Authentication failed');
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
    },
    onError: (error) => {
      console.error(`Auth error: ${error}`);
      throw error;
    },
  });

  const logout = useCallback(() => {
    queryClient.setQueryData(['user'], null);
    deleteCookies();
    router.push('/');
  }, [router, queryClient]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await AuthService.getTokens();
      if (response) {
        queryClient.setQueryData(['user'], response);
        return response;
      }
    } catch (err) {
      console.error('Auth check error:', err);
      logout();
    }
  }, [logout, queryClient]);

  return {
    user: data?.user || null,
    isLoading: isUserLoading || authenticateMutation.isPending,
    error: authenticateMutation.error
      ? responseError(authenticateMutation.error)
      : null,
    authenticate: authenticateMutation.mutate,
    logout,
    checkAuth,
  };
};
