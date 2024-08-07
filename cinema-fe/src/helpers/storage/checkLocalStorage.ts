export const isUserAuthEmpty = (): boolean => {
  if (typeof window === 'undefined') return true;
  const storedValue = window.localStorage.getItem('userAuth');
  if (!storedValue) return true;

  try {
    const parsedValue = JSON.parse(storedValue);
    return !!parsedValue.state.userAuth;
  } catch (e) {
    console.error('Failed to parse userAuth from localStorage:', e);
    return false;
  }
};
