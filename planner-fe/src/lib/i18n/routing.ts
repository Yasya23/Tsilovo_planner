import { defineRouting } from 'next-intl/routing';

export const availableLocales = ['uk', 'en'];

export const routing = defineRouting({
  locales: availableLocales,

  defaultLocale: 'uk',
});

export type Locale = (typeof routing.locales)[number];
