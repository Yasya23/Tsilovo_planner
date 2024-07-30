'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export const RootProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [queryClient] = useState(createQueryClient);

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>

      <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default RootProvider;
