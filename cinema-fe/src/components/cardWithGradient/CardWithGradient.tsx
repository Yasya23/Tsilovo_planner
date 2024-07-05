import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import styles from './card.module.css';

interface Props {
  title: string;
  href: string;
  color?: string;
}

const CardWithGradient = ({ title, href, color }: Props) => {
  return (
    <Link
      href={href}
      className={classNames(styles.card, color ? styles[color] : '')}>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};

export default CardWithGradient;
