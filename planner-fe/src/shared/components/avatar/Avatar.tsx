import React from 'react';

import styles from './Avatar.module.scss';

interface AvatarProps {
  name?: string;
  size?: 'small' | 'medium' | 'large';
  imageUrl?: string;
}

export const Avatar = ({
  name = 'AA',
  size = 'small',
  imageUrl,
}: AvatarProps) => {
  const initials = name ? name.slice(0, 2).toUpperCase() : '';

  return (
    <div className={`${styles.Avatar} ${styles[size]}`}>
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" loading="lazy" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
