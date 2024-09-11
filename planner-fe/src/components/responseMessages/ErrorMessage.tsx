import { FiAlertCircle } from 'react-icons/fi';
import styles from './messages.module.scss';

export const ErrorMessage = () => (
  <div className={styles.errorMessage}>
    <FiAlertCircle size={24} />
    <span>Oops, something went wrong</span>
  </div>
);

export default ErrorMessage;
