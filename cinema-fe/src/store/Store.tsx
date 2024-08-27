import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserAuth, User } from '@/types/user.type';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/types/interfaces/loginFormValues';
import { AuthService } from '@/services/auth.service';
import { setCookies } from '@/helpers';
import { responseError } from '@/utils';
interface UserAuthState {
  userAuth: UserAuth | undefined;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormValues) => Promise<void>;
  register: (data: RegisterFormValues) => Promise<void>;
  logout: () => void;
}

interface UserState {
  user: User | null;
  set: (data: User | null) => void;
}

export const userStore = create<UserState>()((set) => ({
  user: null,
  set: (data: User | null) => {
    set({ user: data });
  },
}));

export const useAuthStore = create<UserAuthState>()(
  persist(
    (set) => ({
      userAuth: undefined,
      isLoading: false,
      error: null,
      login: async (data: LoginFormValues) => {
        set({ isLoading: true, error: null });
        try {
          const user = await AuthService.login(data);
          set({ userAuth: { id: user.data.id }, isLoading: false });
          setCookies(user.data);
          userStore.getState().set(user.data);
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false, error: responseError(error) });
        }
      },
      register: async (data: RegisterFormValues) => {
        set({ isLoading: true, error: null });
        try {
          const user = await AuthService.register(data);
          if (user?.data) {
            const { data } = user;
            set({ userAuth: { id: data.id }, isLoading: false });
            userStore.getState().set(data);
            setCookies(data);
          }
        } catch (error) {
          console.error('Registration failed:', error);
          set({
            isLoading: false,
            error: responseError(error),
          });
        }
      },
      logout: () => {
        set({ userAuth: undefined });
        userStore.getState().set(null);
      },
    }),
    {
      name: 'userAuth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
