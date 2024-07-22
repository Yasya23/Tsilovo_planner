export const services = {
  getEntityUrl: (route: string, value: string) => {
    `/${route}/${value}`;
  },
  genres: '/genre',
  movies: '/movies',
  moviesPopular: '/movies/popular',
};
