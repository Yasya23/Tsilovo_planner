import { ReactNode } from 'react';

import styles from './Message.module.scss';

export type MessageItemType = {
  icon?: ReactNode;
  title: string;
  type: 'message';
};

export const Message = ({ icon, title }: MessageProps) => (
  <p className={styles.Message}>
    {icon && <span className={styles.Icon}>{icon}</span>}
    {title}
  </p>
);
