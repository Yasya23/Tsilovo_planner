import { useState, useEffect } from 'react';

const useWidthThreshold = (widthThreshold: number) => {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPastThreshold(window.innerWidth > widthThreshold);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [widthThreshold]);

  return isPastThreshold;
};

export default useWidthThreshold;
