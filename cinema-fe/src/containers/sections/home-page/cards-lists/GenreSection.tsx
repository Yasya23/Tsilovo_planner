import { useGenres } from '@/hooks/useGenres';
import Card from '@/components/card/Card';
import Layout from './Layout';
import Carousel from '@/components/carousel/Carousel';

const GenreSection = () => {
  const { isLoading, error, data } = useGenres();

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Layout heading="Choose by genres" seeAllHref="/hh">
      <Carousel>
        <Card key="filter" href="/filters" title="Filters" />
        <Card key="search" href="/search" title="Search" />
        {data?.data &&
          data.data.map((item) => (
            <Card
              key={item.id}
              href=""
              title={item.name}
              color={item.backgroundGradient}
            />
          ))}
      </Carousel>
    </Layout>
  );
};

export default GenreSection;
