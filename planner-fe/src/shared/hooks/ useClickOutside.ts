import { useEffect, RefObject } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
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

export default useClickOutside;
