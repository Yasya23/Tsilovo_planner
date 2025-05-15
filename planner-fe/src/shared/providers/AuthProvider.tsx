'use client';

import { createContext, useContext } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { queries } from '@/shared/constants/queries';
import { useAuthentication } from '@/shared/hooks/useAuthentication';
import { User } from '@/shared/types/user.type';

interface AuthContextType {
  user: User | null | undefined;
  isPending: boolean;
  error: boolean;
  logout: () => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthentication();
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: [queries.user] });
  };

  const contextValue: AuthContextType = {
    user: auth.user,
    isPending: auth.isPending,
    error: auth.error,
    logout: auth.logout,
    refetch,
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
