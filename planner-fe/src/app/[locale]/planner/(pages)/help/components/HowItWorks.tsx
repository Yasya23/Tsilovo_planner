import { useTranslations } from 'next-intl';

import { AccordionUsage } from '@/shared/components/ui/accordion/Accordion';

import styles from './HowItWorks.module.scss';

export const HowItWorks = () => {
  const t = useTranslations('Common.help');

  const qa = t.raw('qa') as { title: string; description: string }[];

  return (
    <section className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('title')}</h2>
      <AccordionUsage items={qa} />
    </section>
  );
};
