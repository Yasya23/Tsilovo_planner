import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { Movie } from '@/types/movie.type';
import { QueryParams } from '@/types/interfaces/queryParams';

export const MovieService = {
  async getMovies(params: QueryParams) {
    const { data } = await axiosClassic.get<Movie[]>(services.movies, {
      params: params,
    });
    return data;
  },

  async getPopularMovies() {
    const { data } = await axiosClassic.get<Movie[]>(services.moviesPopular);
    return data;
  },
};
