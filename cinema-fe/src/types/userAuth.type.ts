export type UserAuth = {
  id: string;
};

export type UserTokens = {
  refreshToken: string;
  accessToken: string;
} & UserAuth;
