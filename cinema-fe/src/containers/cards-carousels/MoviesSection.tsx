import Card from '@/components/cards/movieCard/MovieCard';
import Layout from './Layout';
import Carousel from '@/components/carousel/Carousel';
import Spinner from '@/components/spinner/Spinner';
import { ErrorMessage, NoResultsMessage } from '@/components/responseMessages';

import { usePopularMovies } from '@/hooks/useMovies';
import { Movie } from '@/types/movie.type';

const PopularMovies = () => {
  const { isLoading, error, data } = usePopularMovies();

  return (
    <Layout heading="Top 10 videos">
      {error && <ErrorMessage />}

      {isLoading ? (
        <Spinner />
      ) : data?.length === 0 ? (
        <NoResultsMessage />
      ) : (
        <Carousel>
          {data?.map((item: Movie) => (
            <Card key={item._id} movie={item} />
          ))}
        </Carousel>
      )}
    </Layout>
  );
};

export default PopularMovies;
