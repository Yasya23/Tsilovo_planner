import { useTranslations } from 'next-intl';

import classNames from 'classnames';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import { HeroShowcase } from '@/shared/components/hero-showcase/HeroShowcase';
import DefaultLayout from '@/shared/components/layouts/Default';
import { routes } from '@/shared/constants/routes';
import icons from '@/shared/icons/icons';

import styles from './page.module.scss';

export default function Page() {
  const t = useTranslations('HomePage.hero');
  const tButton = useTranslations('Common.buttons');
  const features = t.raw('features') as Record<string, string>;

  const featureList = Object.entries(features).map(([key, value]) => ({
    key,
    title: value,
  }));

  return (
    <DefaultLayout>
      <section className={styles.Wrapper}>
        <h1
          dangerouslySetInnerHTML={{ __html: t.raw('title') }}
          className={styles.Title}
        />

        <div className={styles.ListWrapper}>
          <ul className={styles.List}>
            {featureList.map(({ key, title }) => (
              <li
                key={key}
                className={classNames(styles.ListItem, styles[key])}
              >
                <icons.CheckCircle className={styles.Icon} />
                <p dangerouslySetInnerHTML={{ __html: title }} />
              </li>
            ))}
          </ul>
          <icons.CheckCircle className={styles.IconDecor} />
        </div>
      </section>
      <HeroShowcase />
      <div className={styles.ButtonWrapper}>
        <ButtonCustom
          href={routes.planner}
          name={tButton('startPlanning')}
          style="contained"
        />
      </div>
    </DefaultLayout>
  );
}
