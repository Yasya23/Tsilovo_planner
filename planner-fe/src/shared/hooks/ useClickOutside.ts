import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDivElement | HTMLFormElement | null>,
  callback: () => void
) => {
  if (!ref) return;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInside = ref.current?.contains(target);

      if (!isInside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};
