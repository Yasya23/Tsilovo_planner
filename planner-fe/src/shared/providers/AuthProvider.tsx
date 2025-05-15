'use client';

import { createContext, useContext } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { queries } from '@/shared/constants/queries';
import { LoginFormValues, RegisterFormValues } from '@/shared/types/auth.type';
import { User } from '@/shared/types/user.type';

import { useAuth } from '@/features/auth/hooks/useAuth';

interface AuthContextType {
  user: User | null | undefined;
  isPending: boolean;
  error: Error | null;
  login: (data: LoginFormValues) => void;
  register: (data: RegisterFormValues) => void;
  logout: () => void;
  invalidateQueries: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: [queries.user] });
  };

  const contextValue: AuthContextType = {
    user: auth.user,
    isPending: auth.isPending,
    error: auth.error,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
    invalidateQueries,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
