import { useState, useEffect } from 'react';

const useScrollThreshold = (threshold: number) => {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastThreshold(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isPastThreshold;
};

export default useScrollThreshold;
