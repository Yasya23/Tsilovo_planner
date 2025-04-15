export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type AuthResponse = {
  message: string;
  user: User;
};
