import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/shared/types/user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/shared/types/interfaces/loginFormValues';
import { AuthService } from '@/shared/services/auth.service';
import { setCookies } from '@/shared/helpers';
import { responseError } from '@/shared/utils';
import { encryptData, decryptData } from '@/shared/utils';

interface UserAuthState {
  userAuth: User | undefined;
  anonimUser: boolean;
  isPending: boolean;
  error: string | null;
  authenticate: (
    data: LoginFormValues | RegisterFormValues | null,
    action: 'login' | 'register' | 'update' | 'anonimUser'
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
      anonimUser: false,
      isPending: false,
      error: null,

      authenticate: async (
        data: LoginFormValues | RegisterFormValues | null,
        action: 'login' | 'register' | 'update' | 'anonimUser'
      ) => {
        set({ isPending: true, error: null });
        try {
          let user;
          if (action === 'login') {
            user = await AuthService.login(data as LoginFormValues);
          }
          if (action === 'register') {
            user = await AuthService.register(data as RegisterFormValues);
          }
          if (action === 'update') {
            user = await AuthService.update(data as LoginFormValues);
          }
          if (action === 'anonimUser') {
            user = {
              data: {
                id: 'anonimUser',
                name: 'Guest',
                email: '1',
                refreshToken: 'anonim',
                accessToken: 'anonim',
              },
            };
          }
          if (user?.data) {
            const isAnonim = action === 'anonimUser';
            set({
              userAuth: user.data,
              anonimUser: isAnonim,
              isPending: false,
            });
            if (action !== 'update') {
              setCookies(user.data);
            }
          }
        } catch (error) {
          console.error(`Auth error: ${error}`);
          set({ isPending: false, error: responseError(error) });
        }
      },

      logout: () => {
        set({ userAuth: undefined, anonimUser: false });
        localStorage.removeItem('userAuth');
      },
    }),
    {
      name: 'userAuth',
      storage: createJSONStorage(() => encryptedStorage),
    }
  )
);
