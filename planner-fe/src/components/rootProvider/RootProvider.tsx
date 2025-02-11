'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import styles from './rootProvider.module.scss';

dayjs.locale('uk');

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
  const pathname = usePathname();
  const showSidebar =
    pathname === '/planner' || pathname?.startsWith('/planner/');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.container}>
        <Header />
        <QueryClientProvider client={queryClient}>
          <div className={styles.wrapper}>
            {showSidebar && <Sidebar />}
            <main>{children}</main>
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
    </LocalizationProvider>
  );
};

export default RootProvider;
