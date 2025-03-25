import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const metadata = await import(`../../messages/${locale}/metadata.json`);
  const home = await import(`../../messages/${locale}/home.json`);
  const common = await import(`../../messages/${locale}/common.json`);
  const dates = await import(`../../messages/${locale}/date.json`);

  return {
    locale,
    messages: {
      ...metadata,
      ...home,
      ...common,
      ...dates,
    },
  };
});
