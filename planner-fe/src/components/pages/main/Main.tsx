import Image from 'next/image';
import style from './main.module.scss';

export const Main = () => {
  return (
    <div className={style.main}>
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
  );
};

export default Main;
