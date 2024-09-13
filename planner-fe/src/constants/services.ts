export const services = {
  getEntityUrl: (route: string, value: string) => {
    `/${route}/${value}`;
  },
  login: '/auth/login',
  register: '/auth/register',
  token: 'auth/login/access-token',
};
