import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    default: 'Cinema - watch movies online',
    template: '%s | Cinema - watch movies online',
  },
  description: 'Whatch movies, cartoons, shows!',
  icons: {
    icon: '/icon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'Cinema',
    title: 'Cinema - watch movies online',
    description: 'Whatch movies, cartoons, shows!',
    url: `/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
