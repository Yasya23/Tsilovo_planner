import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserAuth } from '@/types/userAuth.type';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import { AuthService } from '@/services/auth.service';
import { setCookies } from '@/helpers';

interface UserState {
  userAuth: UserAuth | undefined;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormValues) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<UserState>()(
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
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false, error: 'Login failed. Please try again.' });
        }
      },
      logout: () => set({ userAuth: undefined }),
    }),
    {
      name: 'userAuth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
