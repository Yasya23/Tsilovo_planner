import { useGenres } from '@/hooks/useGenres';
import Card from '@/components/card/Card';

const GenreList = () => {
  const { isLoading, error, data } = useGenres();

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="">
      {data?.data &&
        data.data.map((item) => (
          <Card
            key={item.id}
            href=""
            title={item.name}
            color={item.backgroundGradient}
          />
        ))}
    </div>
  );
};

export default GenreList;
