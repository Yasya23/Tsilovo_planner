import styles from './Divider.module.scss';

export type DividerItemType = {
  type: 'divider';
};

export const Divider = () => <hr className={styles.Divider} />;
