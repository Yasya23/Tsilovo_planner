'use client';

import GenreSection from '@/containers/cards-carousels/GenreSection';
import PopularMovies from '@/containers/cards-carousels/MoviesSection';

export const Home = () => {
  return (
    <>
      <GenreSection />
      <PopularMovies />
    </>
  );
};

export default Home;
