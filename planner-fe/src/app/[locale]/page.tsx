import { useTranslations } from 'next-intl';
import Image from 'next/image';

import DefaultLayout from '@/shared/components/layouts/Default';

import style from './Home.module.scss';

export default function Page() {
  const t = useTranslations('HomePage');

  return (
    <DefaultLayout>
      <div className={style.Wrapper}>
        <h1>{t('title')}</h1>
        <Image
          src="/images/planner.png"
          width={700}
          height={0}
          alt="Planner main page"
          layout="intrinsic"
        />
      </div>
    </DefaultLayout>
  );
}
