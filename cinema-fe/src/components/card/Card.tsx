import Link from 'next/link';
import classNames from 'classnames';
import styles from './card.module.scss';
import Image from 'next/image';
import { FiCameraOff, FiBookmark } from 'react-icons/fi';

interface Props {
  title: string;
  href: string;
  color?: string;
  movieCard?: boolean;
  imageSrc?: string;
}

const Card = ({ title, href, color, movieCard = false, imageSrc }: Props) => {
  return (
    <Link
      href={href}
      className={classNames(
        styles.card,
        color ? styles[color] : '',
        movieCard ? styles.movieCard : ''
      )}>
      {movieCard && (
        <>
          {imageSrc ? (
            <Image
              src={`/${imageSrc}`}
              width={200}
              height={250}
              alt={title}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <div className={styles.noPhoto}>
              <FiCameraOff size={50} />
            </div>
          )}
          <div className={styles.saveToFavorites}>
            <FiBookmark size={30} />
          </div>
        </>
      )}
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};

export default Card;
