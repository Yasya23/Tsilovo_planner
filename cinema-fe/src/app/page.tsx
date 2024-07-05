'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GenreList from '@/components/genres/GenresList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <main className="mx-auto max-w-[1400px]">
      <QueryClientProvider client={queryClient}>
        <GenreList />
      </QueryClientProvider>
    </main>
  );
}
