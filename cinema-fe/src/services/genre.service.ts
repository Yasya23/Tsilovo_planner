import { services } from '@/constants/services';
import { axiosClassic } from '@/api/interceptors';
import { Genre } from '@/types/genre.type';

export const GenreService = {
  async getGenres() {
    return await axiosClassic.get<Genre[]>(services.genres);
  },
};
