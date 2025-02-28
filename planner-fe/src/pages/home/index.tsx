import Image from 'next/image';
import { Header } from '@/shared/components/header/Header';
import { Footer } from '@/shared/components/footer/Footer';
import DefaultLayout from '@/shared/components/layouts/Default';
import { useTranslations } from 'next-intl';

import style from './Home.module.scss';

export const Main = () => {
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
};

export default Main;
