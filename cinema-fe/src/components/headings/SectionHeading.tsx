import styles from './heading.module.css';

const SectionHeading = ({ heading }: { heading: string }) => {
  return <h2 className={styles.section}>{heading}</h2>;
};

export default SectionHeading;
