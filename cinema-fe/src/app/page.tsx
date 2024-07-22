'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GenreSection from '@/containers/cards-carousels/home/GenreSection';
import { useState } from 'react';
import PopularMovies from '@/containers/cards-carousels/home/MoviesSection';

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
};

export default function Home() {
  const [queryClient] = useState(createQueryClient);

  return (
    <main className="mx-auto max-w-[1400px]">
      <QueryClientProvider client={queryClient}>
        <GenreSection />
        <PopularMovies />
      </QueryClientProvider>
    </main>
  );
}
