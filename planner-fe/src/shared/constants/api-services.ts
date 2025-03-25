export const services = {
  getEntityUrl: (route: string, value: string) => {
    `/${route}/${value}`;
  },
  login: '/auth/login',
  register: '/auth/register',
  update: '/user/profile',
  activeGoals: '/goals',
  token: 'auth/login/access-token',
  tasks: '/tasks',
};
