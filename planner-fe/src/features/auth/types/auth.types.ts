import { User as SharedUser } from '@/shared/types/user.type';

export type User = SharedUser;

export type AuthResponse = {
  message: string;
  user: User;
};
