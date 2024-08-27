import { decryptData } from '@/utils';

export const isUserAuth = (): boolean => {
  if (typeof window === 'undefined') return false;

  const storedValue = window.localStorage.getItem('userAuth');
  if (!storedValue) return false;

  try {
    const decryptedValue = decryptData(storedValue);
    if (!decryptedValue) return false;
    const parsedValue = JSON.parse(decryptedValue);
    console.log(parsedValue);

    return Boolean(parsedValue?.state?.userAuth?.id);
  } catch (e) {
    console.error('Failed to get userAuth from localStorage:', e);
    return false;
  }
};
