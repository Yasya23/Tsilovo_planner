import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { Movie } from '@/types/movie.type';

export const MovieService = {
  async getAllMovies(
    query?: string,
    page?: number,
    limit?: number,
    type?: string
  ) {
    const { data } = await axiosClassic.get<Movie[]>(services.movies, {
      params: { query, page, limit, type },
    });
    return data;
  },

  async getPopularMovies() {
    const { data } = await axiosClassic.get<Movie[]>(services.moviesPopular);
    return data;
  },
};
