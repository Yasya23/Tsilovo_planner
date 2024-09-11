import { GenreService } from '@/services/genre.service';
import { useQuery } from '@tanstack/react-query';

export const useGenres = () => {
  const queryData = useQuery({
    queryKey: ['genre'],
    queryFn: () => GenreService.getGenres(),
  });

  return queryData;
};
