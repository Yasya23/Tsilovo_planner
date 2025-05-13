import { availableLocales } from '@/lib/i18n/routing';

export const isCurrentRoute = (
  pathname: string | null,
  targetRoute: string
): boolean => {
  if (!pathname) return false;

  const localePattern = `^\/(${availableLocales.join('|')})(\/|$)`;

  const normalizedPath = pathname.replace(new RegExp(localePattern), '/');

  return (
    normalizedPath === targetRoute ||
    normalizedPath === `/${targetRoute.replace(/^\/+/, '')}`
  );
};
