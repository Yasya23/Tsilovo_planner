'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import useLogOut from '@/hooks/useLogOut';
import { usePathname } from 'next/navigation';
import styles from './rootProvider.module.scss';
import { useThemeStore } from '@/store/Store';
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
  // useLogOut();
  const [queryClient] = useState(createQueryClient);
  const pathname = usePathname();

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const isDark = true;

  const showSidebar =
    pathname === '/profile' || pathname.startsWith('/profile/');

  return (
    <div className={styles.container}>
      <Header />
      <QueryClientProvider client={queryClient}>
        <div className={styles.wrapper}>
          {showSidebar && <Sidebar />}

          <main className={isDark ? styles.darkTheme : ''}>{children}</main>
        </div>
      </QueryClientProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 7000,
          style: {
            width: '350px',
            height: '70px',
            maxWidth: '100%',
          },
        }}
      />
      <Footer />
    </div>
  );
};

export default RootProvider;
