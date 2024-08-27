import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserAuth } from '@/types/user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/types/interfaces/loginFormValues';
import { AuthService } from '@/services/auth.service';
import { setCookies } from '@/helpers';
import { responseError } from '@/utils';
import { encryptData, decryptData } from '@/utils';

interface UserAuthState {
  userAuth: UserAuth | undefined;
  isLoading: boolean;
  error: string | null;
  authenticate: (
    data: LoginFormValues | RegisterFormValues,
    action: 'login' | 'register'
  ) => Promise<void>;
  logout: () => void;
}

const encryptedStorage = {
  getItem: (name: string) => {
    const data = localStorage.getItem(name);
    return data ? decryptData(data) : null;
  },
  setItem: (name: string, value: string) => {
    const encryptedValue = encryptData(value);
    localStorage.setItem(name, encryptedValue);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<UserAuthState>()(
  persist(
    (set) => ({
      userAuth: undefined,
      isLoading: false,
      error: null,

      authenticate: async (
        data: LoginFormValues | RegisterFormValues,
        action: 'login' | 'register'
      ) => {
        set({ isLoading: true, error: null });
        try {
          let user;
          if (action === 'login') {
            user = await AuthService.login(data as LoginFormValues);
          }
          if (action === 'register') {
            user = await AuthService.register(data as RegisterFormValues);
          }

          if (user?.data) {
            set({ userAuth: user.data, isLoading: false });
            setCookies(user.data);
          }
        } catch (error) {
          console.error(`Auth error: ${error}`);
          set({ isLoading: false, error: responseError(error) });
        }
      },

      logout: () => {
        set({ userAuth: undefined });
        localStorage.removeItem('userAuth');
      },
    }),
    {
      name: 'userAuth',
      storage: createJSONStorage(() => encryptedStorage),
    }
  )
);
