import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import QueryProvider from '@/shared/components/providers/QueryClientProvider';
import '@/styles/globals.scss';
import { AuthProvider } from '@/features/auth/context/AuthProvider';

const inter = Inter({ subsets: ['cyrillic'], display: 'swap' });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale;

  const t = await getTranslations({
    locale,
    namespace: `globalMetadata`,
  });

  if (!t) {
    throw new Error(
      `Could not resolve 'metadata' in messages for locale ${locale}`
    );
  }

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    title: {
      default: t('titleDefault'),
      template: `%s | ${t('titleTemplate')}`,
    },
    description: t('description'),
    icons: {
      icon: '/icon.ico',
    },
    openGraph: {
      type: 'website',
      siteName: 'Tempo',
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={inter.className}
      suppressHydrationWarning={true}>
      <body suppressHydrationWarning>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              <ThemeProvider>{children}</ThemeProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 7000,
                  style: {
                    width: '350px',
                    height: '70px',
                    maxWidth: '100%',
                  },
                }}
              />
            </AuthProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
