'use client';

import { createContext, useContext } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { User } from '@/shared/types/user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/shared/types/interfaces/loginFormValues';

interface AuthContextType {
  user: User | null | undefined;
  isPending: boolean;
  error: Error | null;
  login: (data: LoginFormValues) => void;
  register: (data: RegisterFormValues) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  const contextValue: AuthContextType = {
    user: auth.user,
    isPending: auth.isPending,
    error: auth.error,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
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
