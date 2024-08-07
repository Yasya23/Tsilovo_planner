import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserAuth } from '@/types/userAuth.type';

interface UserState {
  userAuth: UserAuth | undefined;
  setData: (data: UserAuth | undefined) => void;
  delete: () => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      userAuth: undefined,
      setData: (data: UserAuth | undefined) => set({ userAuth: data }),
      delete: () => set({ userAuth: undefined }),
    }),
    {
      name: 'userAuth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
