import Link from 'next/link';
import classNames from 'classnames';
import styles from './card.module.scss';
import Image from 'next/image';
import { FiCameraOff, FiBookmark, FiPlay } from 'react-icons/fi';
import { Movie } from '@/types/movie.type';

const Card = ({ movie }: { movie: Movie }) => {
  const { title, genres, _id, photo, year, country } = movie;
  return (
    <Link href={_id} className={classNames(styles.card, styles.movieCard)}>
      <>
        {photo ? (
          <Image
            src={`/${movie?.photo}`}
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

        <div className={styles.videoUrlWrapper}>
          <div>
            <FiPlay size={40} />
            <p>Watch</p>
          </div>
        </div>
        <FiBookmark className={styles.saveToFavorites} />
      </>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.movieInfo}>
        {year && <span>{year}</span>}
        {genres?.[0] && (
          <span className={styles.genre}>{genres?.[0].name}</span>
        )}
        {country && <span>{country}</span>}
      </p>
    </Link>
  );
};

export default Card;
