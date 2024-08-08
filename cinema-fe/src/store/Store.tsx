import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserAuth } from '@/types/userAuth.type';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import { AuthService } from '@/services/auth.service';

interface UserState {
  userAuth: UserAuth | undefined;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormValues) => Promise<void>;
  delete: () => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      userAuth: undefined,
      isLoading: false,
      error: null,
      login: async (data: LoginFormValues) => {
        set({ isLoading: true, error: null }); // Start loading and reset error
        try {
          const user = await AuthService.login(data);
          console.log(user);
          set({ userAuth: user.data, isLoading: false });
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false, error: 'Login failed. Please try again.' });
        }
      },
      delete: () => set({ userAuth: undefined }),
    }),
    {
      name: 'userAuth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
