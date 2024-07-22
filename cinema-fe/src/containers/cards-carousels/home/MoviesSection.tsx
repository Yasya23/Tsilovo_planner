import Card from '@/components/card/Card';
import Layout from '../Layout';
import Carousel from '@/components/carousel/Carousel';
import Spinner from '@/components/spinner/Spinner';
import { usePopularMovies } from '@/hooks/usePopularMovies';
import { Movie } from '@/types/movie.type';

const PopularMovies = () => {
  const { isLoading, error, data } = usePopularMovies();

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Layout heading="Top 10 videos">
      <Carousel>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.map((item: Movie) => (
            <Card
              key={item.id}
              href={`/${item.id}`}
              title={item.title}
              movieCard={true}
              imageSrc={item.photo}
            />
          ))
        )}
      </Carousel>
    </Layout>
  );
};

export default PopularMovies;
