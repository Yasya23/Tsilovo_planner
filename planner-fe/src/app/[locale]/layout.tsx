import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { routes } from '@/shared/constants/routes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locale } from '@/i18n/routing';

import '@/styles/globals.scss';
import { LocalPattern } from 'next/dist/shared/lib/image-config';

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as LocalPattern)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={inter.className}
      suppressHydrationWarning={true}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
