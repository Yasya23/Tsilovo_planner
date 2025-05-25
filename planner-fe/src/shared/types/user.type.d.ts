export type User = {
  name: string;
  email: string;
  image?: string;
  provider?: string;
};

export type UserResponse = {
  message: string;
  user: User;
};
