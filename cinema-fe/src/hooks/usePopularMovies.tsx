import { MovieService } from '@/services/movies.service';
import { useQuery } from '@tanstack/react-query';

export const usePopularMovies = () => {
  const queryData = useQuery({
    queryKey: ['popular movies'],
    queryFn: () => MovieService.getPopularMovies(),
  });

  return queryData;
};
