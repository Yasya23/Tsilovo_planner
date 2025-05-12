import { useEffect, useState } from 'react';

export const useScrollThreshold = (threshold: number, buffer: number = 10) => {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (!isPastThreshold && scrollY > threshold + buffer) {
        setIsPastThreshold(true);
      } else if (isPastThreshold && scrollY < threshold - buffer) {
        setIsPastThreshold(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, isPastThreshold, buffer]);

  return isPastThreshold;
};
