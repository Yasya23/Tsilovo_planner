import { useRouter, usePathname } from 'next/navigation';
import { availableLocales, Locale } from '@/i18n/routing';

export const switchLanguage = (selectedLocale: Locale) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    typeof window !== 'undefined' ? window.location.search : '';

  if (!pathname) return;

  const localePattern = new RegExp(`^\\/(${availableLocales.join('|')})`);

  const pathWithoutLocale = pathname.replace(localePattern, '') || '/';

  if (availableLocales.includes(selectedLocale)) {
    router.push(`/${selectedLocale}${pathWithoutLocale}${searchParams}`);
  }
};
