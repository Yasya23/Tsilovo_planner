import Link from 'next/link';
import classNames from 'classnames';
import styles from './card.module.scss';

interface Props {
  title: string;
  href: string;
  color?: string;
}

const GradientCard = ({ title, href, color }: Props) => {
  return (
    <Link
      href={href}
      className={classNames(styles.card, color ? styles[color] : '')}>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};

export default GradientCard;
