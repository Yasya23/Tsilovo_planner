import { useTranslations } from 'next-intl';
import Image from 'next/image';

import DefaultLayout from '@/shared/components/layouts/Default';

import styles from './Home.module.scss';

export default function Page() {
  const t = useTranslations('HomePage');

  return (
    <DefaultLayout>
      <div className={styles.Wrapper}>
        <h1
          dangerouslySetInnerHTML={{ __html: t.raw('title') }}
          className={styles.Title}
        />
        <Image
          src="/images/planner.png"
          alt="Planner main page"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '800px', height: 'auto' }}
        />
      </div>
    </DefaultLayout>
  );
}
