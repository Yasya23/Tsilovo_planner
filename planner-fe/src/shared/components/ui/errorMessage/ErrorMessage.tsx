import styles from './ErrorMessage.module.scss';

type ErrorMessage = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessage) => {
  return (
    <div className={styles.Wrapper}>
      <p>{message}</p>
    </div>
  );
};
