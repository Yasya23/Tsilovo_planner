import { MovieService } from '@/services/movies.service';
import { useQuery } from '@tanstack/react-query';
import { QueryParams } from '@/types/interfaces/queryParams';

export const useMovies = ({ page, limit, type }: QueryParams) => {
  const queryData = useQuery({
    queryKey: ['movies', page, limit, type],
    queryFn: () => MovieService.getMovies({ page, limit, type }),
  });

  return queryData;
};

export const useMoviesByQuery = ({ page, limit, type, query }: QueryParams) => {
  const queryData = useQuery({
    queryKey: ['movies by query', page, limit, type, query],
    queryFn: () => MovieService.getMovies({ page, limit, type, query }),
    staleTime: 5 * 60 * 1000,
    enabled: !!query,
  });

  return queryData;
};

export const usePopularMovies = () => {
  const queryData = useQuery({
    queryKey: ['popular movies'],
    queryFn: () => MovieService.getPopularMovies(),
  });

  return queryData;
};
