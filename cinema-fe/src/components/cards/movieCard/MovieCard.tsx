import Link from 'next/link';
import classNames from 'classnames';
import styles from './card.module.scss';
import Image from 'next/image';
import { FiCameraOff, FiBookmark, FiPlay } from 'react-icons/fi';
import { Movie } from '@/types/movie.type';

interface Props {
  movie: Movie;
}

const Card = ({ movie }: Props) => {
  const { title, genres, _id, photo } = movie;
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
        <div className={styles.saveToFavorites}>
          <FiBookmark size={30} />
        </div>
      </>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.movieInfo}>
        {movie?.date && <span>{movie?.date}</span>}
        {movie?.genres?.[0] && (
          <span className={styles.genre}>{movie?.genres?.[0].name}</span>
        )}
        {movie?.country && <span>{movie?.country}</span>}
      </p>
    </Link>
  );
};

export default Card;
