import styles from './messages.module.scss';
import Link from 'next/link';
import { routes } from '@/constants/routes';

export const MessageWithToMainLink = ({ message }: { message: string }) => (
  <div className={styles.messageWithToMainLink}>
    <p>{message}</p>
    <Link href={routes.home} className={styles.buttonStyle}>
      Back to main page
    </Link>
  </div>
);

export default MessageWithToMainLink;
