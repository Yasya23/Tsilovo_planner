import type { Metadata } from 'next';
import RootProvider from '@/components/rootProvider/RootProvider';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { routes } from '@/constants/routes';
const inter = Inter({ subsets: ['cyrillic'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    default: 'ДеньПро - твій персональний планувальник',
    template: '%s | ДеньПро',
  },
  description: 'Плануй свій день з нами!',
  icons: {
    icon: '/icon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'ДеньПро',
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
      <body className={inter.className} suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
