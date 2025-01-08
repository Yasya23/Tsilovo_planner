'use client';

import { useState } from 'react';
import classNames from 'classnames';
import styles from './notification.module.scss';
import { FiBell, FiInfo } from 'react-icons/fi';

interface Props {
  message: string;
  type?: 'info' | 'advice';
}

const notificationType = {
  info: {
    icon: <FiInfo />,
    title: 'Зверніть увагу',
  },
  advice: {
    icon: <FiBell />,
    title: '',
  },
};

export const Notification = ({ message, type = 'info' }: Props) => {
  const [isClose, setIsClose] = useState(false);

  return (
    !isClose && (
      <div className={classNames(styles.wrapper, styles[type])}>
        <div className={styles.top}>
          {notificationType[type].icon}
          <p>{notificationType[type].title}</p>

          <button
            type="button"
            onClick={() => setIsClose(true)}
            className={classNames(styles.closeButton, styles.outlineBorder)}>
            <span>x</span>
          </button>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    )
  );
};

export default Notification;
