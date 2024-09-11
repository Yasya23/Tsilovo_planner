import { FiSearch } from 'react-icons/fi';
import styles from './messages.module.scss';

export const NoResultsMessage = () => (
  <div className={styles.noResultsMessage}>
    <FiSearch size={24} />
    <span>No results found</span>
  </div>
);

export default NoResultsMessage;
