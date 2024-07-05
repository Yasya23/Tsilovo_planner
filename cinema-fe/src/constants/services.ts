export const API_URL = `${process.env.API_URL}/api`;

export const services = {
  getEntityUrl: (route: string, value: string) => {
    `/${route}/${value}`;
  },
  genres: '/genre',
};
