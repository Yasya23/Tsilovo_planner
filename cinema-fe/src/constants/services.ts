export const services = {
  getEntityUrl: (route: string, value: string) => {
    `/${route}/${value}`;
  },
  genres: '/genre',
  movies: '/movies',
  moviesPopular: '/movies/popular',
  login: '/auth/login',
  register: '/auth/register',
  token: 'auth/login/access-token',
};
