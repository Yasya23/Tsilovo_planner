import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { routes } from '@/shared/constants/routes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

import '@/styles/globals.scss';

const inter = Inter({ subsets: ['cyrillic'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    default: 'Тempo - твій персональний планувальник',
    template: '%s | Тempo',
  },
  description: 'Плануй свій день з нами!',
  icons: {
    icon: '/icon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'Тempo',
    title: 'ДеньПро - твій персональний планувальник',
    description: 'Плануй свій день з нами!',
    url: routes.home,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning={true}>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
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
      </body>
    </html>
  );
}
