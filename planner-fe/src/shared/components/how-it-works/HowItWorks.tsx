import { useTranslations } from 'next-intl';

import { AccordionUsage } from '@/shared/components/accordion/Accordion';

import styles from './HowItWorks.module.scss';

export const HelpSection = () => {
  const t = useTranslations('Common.help');

  const qa = t.raw('qa') as { title: string; description: string }[];

  return (
    <section className={styles.Wrapper}>
      <h2 className={styles.Title}>{t('title')}</h2>
      <AccordionUsage items={qa} />
    </section>
  );
};
