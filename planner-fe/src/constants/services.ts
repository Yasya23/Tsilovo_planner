export const services = {
  getEntityUrl: (route: string, value: string) => {
    `/${route}/${value}`;
  },
  login: '/auth/login',
  register: '/auth/register',
  update: '/user/profile',
  token: 'auth/login/access-token',
  task: '/task',
};
