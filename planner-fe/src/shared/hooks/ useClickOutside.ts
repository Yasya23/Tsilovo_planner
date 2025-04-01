import { useEffect, RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement | HTMLFormElement | null>,
  callback: () => void
) => {
  if (!ref) return;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};
