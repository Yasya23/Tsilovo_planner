'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Toaster } from 'react-hot-toast';
import useLogOut from '@/hooks/useLogOut';

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
  useLogOut();
  const [queryClient] = useState(createQueryClient);

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            width: '350px',
            height: '50px',
            maxWidth: '100%',
          },
        }}
      />
      <Footer />
    </>
  );
};

export default RootProvider;
