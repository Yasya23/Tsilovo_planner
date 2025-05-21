export type UserAuth = {
  id: string;
};

export type User = {
  name: string;
  email: string;
  image?: string;
  provider?: string;
} & UserAuth;

export type UserResponse = {
  message: string;
  user: User;
};
