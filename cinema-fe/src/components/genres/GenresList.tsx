import { useGenres } from '@/hooks/useGenres';
const GenreList = () => {
  const { isLoading, error, data } = useGenres();
  console.log(data);
  if (isLoading) return 'Loading...';
  console.log(data);

  if (error) return 'An error has occurred: ' + error.message;
  return <div></div>;
};

export default GenreList;
