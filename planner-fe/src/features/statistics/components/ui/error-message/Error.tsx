import styles from './Error.module.scss';

export const ErrorMessage = ({ error }: { error: string }) => {
  return <h1 className={styles.Error}>{error}</h1>;
};
