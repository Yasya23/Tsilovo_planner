import Link from 'next/link';
import styles from './layout.module.scss';
import SectionHeading from '@/components/headings/SectionHeading';

interface Props {
  heading: string;
  seeAllHref?: string;
  children: React.ReactNode;
}
const Layout = ({ heading, seeAllHref, children }: Props) => {
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        {seeAllHref ? (
          <>
            <Link href={seeAllHref} className={styles.headingLink}>
              <SectionHeading heading={heading} />
            </Link>
            <Link href={seeAllHref} className={styles.link}>
              See all
            </Link>
          </>
        ) : (
          <SectionHeading heading={heading} />
        )}
      </div>
      {children}
    </section>
  );
};

export default Layout;
