import React, { useState } from 'react';
import Spinner from '@/components/spinner/Spinner';
import ErrorMessage from '@/components/responseMessages/ErrorMessage';
import NoResultsMessage from '@/components/responseMessages/NoResultsMessage';
import Card from '@/components/cards/movieCard/MovieCard';
import { useMovies } from '@/hooks/useMovies';
import { useDebounce } from '@/hooks/useDebounce';
import { Movie } from '@/types/movie.type';
import Input from '../input/Input';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, error, isLoading } = useMovies({
    page: 1,
    limit: 10,
    query: debouncedQuery,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Input
        value={query}
        onChange={handleInputChange}
        placeholder="Search for movies..."
      />
      {error && <ErrorMessage />}
      {isLoading && <Spinner />}
      {!isLoading && !error && data?.length === 0 && <NoResultsMessage />}
      {!isLoading && !error && !!data?.length && (
        <div>
          {data.map((movie: Movie) => (
            <Card key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
