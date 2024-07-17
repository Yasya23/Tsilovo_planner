import { Children, ReactNode, useState, useRef, useEffect } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import classNames from 'classnames';

import styles from './carousel.module.scss';

interface Props {
  children: ReactNode;
  type?: 'cards' | 'full';
}

const gap = 20;
const smallCardWidth = 200 + gap;

const Carousel = ({ children, type = 'cards' }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const totalSlides = Children.count(children);
  const isFull = type === 'full';
  const cardWidth = isFull ? carouselWidth : smallCardWidth;

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.offsetWidth);
    }
  }, [carouselRef.current]);

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

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className={styles.carousel}>
      <div className={styles.wrapper} ref={carouselRef}>
        <button
          disabled={currentIndex === 0}
          onClick={prevSlide}
          className={classNames(styles.button, {
            [styles.prevButton]: isFull,
          })}
          aria-label="Move to the previous">
          <GrPrevious />
        </button>
        <div
          className={classNames(styles.listWrapper, {
            [styles.fullScreen]: isFull,
          })}>
          <ul
            className={classNames(styles.list, {
              [styles.fullScreenList]: isFull,
            })}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}px)`,
            }}>
            {Children.map(children, (child, index) => (
              <li key={index}>{child}</li>
            ))}
          </ul>
        </div>
        <button
          disabled={
            isFull
              ? currentIndex === totalSlides - 1
              : carouselWidth >= smallCardWidth * totalSlides
          }
          onClick={nextSlide}
          className={classNames(styles.button, {
            [styles.nextButton]: isFull,
          })}
          aria-label="Move to the next">
          <GrNext />
        </button>
      </div>
      {isFull && (
        <div className={styles.dots}>
          {Children.map(children, (_, index) => (
            <span
              key={index}
              className={classNames(styles.dot, {
                [styles.activeDot]: index === currentIndex,
              })}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
