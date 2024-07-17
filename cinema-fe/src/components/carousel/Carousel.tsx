import React, { useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';

import styles from './carousel.module.scss';

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);
  const gap = 20;
  const cardWidth = 200 + gap;

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? prevIndex : prevIndex + 1
    );
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.wrapper}>
        <button
          onClick={prevSlide}
          className={styles.button}
          aria-label="Move to the previous genres">
          <GrPrevious />
        </button>
        <div className={styles.listWrapper}>
          <ul
            className={styles.list}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}px)`,
            }}>
            {React.Children.map(children, (child, index) => (
              <li key={index}>{child}</li>
            ))}
          </ul>
        </div>
        <button
          // disabled={false}
          onClick={nextSlide}
          className={styles.button}
          aria-label="Move to the next genres">
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
