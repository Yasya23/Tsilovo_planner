import styles from './messages.module.scss';
import Link from 'next/link';

export const MessageWithToMainLink = ({ message }: { message: string }) => (
  <div className={styles.messageWithToMainLink}>
    <p>{message}</p>
    <Link href="/" className={styles.buttonStyle}>
      Back to main
    </Link>
  </div>
);

export default MessageWithToMainLink;
