export const isUserAuth = (): boolean => {
  if (typeof window === 'undefined') return false;

  const storedValue = window.localStorage.getItem('userAuth');
  if (!storedValue) return false;

  try {
    const parsedValue = JSON.parse(storedValue);
    return Boolean(parsedValue?.state?.userAuth?.id);
  } catch (e) {
    console.error('Failed to parse userAuth from localStorage:', e);
    return false;
  }
};
