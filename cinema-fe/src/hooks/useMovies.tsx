import { MovieService } from '@/services/movies.service';
import { useQuery } from '@tanstack/react-query';
import { QueryParams } from '@/types/interfaces/queryParams';

export const useMovies = ({ page, limit, type, query }: QueryParams) => {
  const queryKey = query
    ? ['movies', page, limit, type, query]
    : ['movies', page, limit, type];

  const queryFn = () => MovieService.getAllMovies({ page, limit, type, query });

  const queryData = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 5 * 60 * 1000,
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
