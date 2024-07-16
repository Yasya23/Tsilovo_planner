'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GenreSection from '@/containers/sections/home-page/cards-lists/GenreSection';
import { useState } from 'react';

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
      </QueryClientProvider>
    </main>
  );
}
