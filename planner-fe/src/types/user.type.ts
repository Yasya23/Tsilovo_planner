export type UserAuth = {
  id: string;
};

export type UserWithTokens = {
  refreshToken: string;
  accessToken: string;
} & UserAuth;

export type User = {
  id: string;
  email: string;
  name: string;
  refreshToken: string;
  accessToken: string;
} & UserAuth;
