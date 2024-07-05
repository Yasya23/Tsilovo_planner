import { useGenres } from '@/hooks/useGenres';
import CardWithGradient from '../cardWithGradient/CardWithGradient';
const GenreList = () => {
  const { isLoading, error, data } = useGenres();

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div className="">
      {data?.data ? (
        data.data.map((item) => (
          <CardWithGradient
            key={item.id}
            href=""
            title={item.name}
            color={item.backgroundGradient}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GenreList;
