import Link from 'next/link';
import classNames from 'classnames';
import styles from './card.module.scss';
import { ReactElement } from 'react';

interface Props {
  title: string;
  href: string;
  color?: string;
  icon?: ReactElement;
}

const GradientCard = ({ title, href, color, icon }: Props) => {
  return (
    <Link
      href={href}
      className={classNames(styles.card, color ? styles[color] : '')}>
      <h3 className={styles.title}>
        {icon}
        {title}
      </h3>
    </Link>
  );
};

export default GradientCard;
