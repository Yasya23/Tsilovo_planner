import Image from 'next/image';
import { Header } from '@/shared/components/header/Header';
import { Footer } from '@/shared/components/footer/Footer';
import DefaultLayout from '@/shared/components/layouts/Default';
import style from './Home.module.scss';

export const Main = () => {
  return (
    <DefaultLayout>
      <div className={style.Wrapper}>
        <h1>
          Плануй <span>своє життя</span> ефективно разом з нашим планувальником
        </h1>
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
