import { useGenres } from '@/hooks/useGenres';
import GradientCard from '@/components/cards/gradientCard/GradientCard';
import Layout from './Layout';
import Carousel from '@/components/carousel/Carousel';
import Spinner from '@/components/spinner/Spinner';
import { setStore, useStoreSelector } from '@/store /Store';

const GenreSection = () => {
  const { isLoading, data } = useGenres();
  const isAuth = useStoreSelector((state) => state.isAuth);

  return (
    <Layout heading="Choose by genres">
      {isAuth ? 'Authenticated' : 'Not Authenticated'}
      <button onClick={() => setStore({ isAuth: !isAuth })}>Click</button>
      <Carousel>
        <GradientCard key="filter" href="/filters" title="Filters" />
        <GradientCard key="search" href="/search" title="Search" />
        {isLoading ? (
          <Spinner />
        ) : (
          data?.data?.map((item) => (
            <GradientCard
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
