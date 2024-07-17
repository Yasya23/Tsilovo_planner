import { useGenres } from '@/hooks/useGenres';
import Card from '@/components/card/Card';
import Layout from './Layout';
import Carousel from '@/components/carousel/Carousel';
import Spinner from '@/components/spinner/Spinner';

const GenreSection = () => {
  const { isLoading, error, data } = useGenres();

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Layout heading="Choose by genres">
      <Carousel>
        <Card key="filter" href="/filters" title="Filters" />
        <Card key="search" href="/search" title="Search" />
        {isLoading ? (
          <Spinner />
        ) : (
          data?.data?.map((item) => (
            <Card
              key={item.id}
              href={`/${item.name}`}
              title={item.description}
              color={item.backgroundGradient}
            />
          ))
        )}
      </Carousel>
    </Layout>
  );
};

export default GenreSection;
