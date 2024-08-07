export type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserAuth = User & Tokens;
