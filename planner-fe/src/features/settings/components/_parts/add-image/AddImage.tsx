'use client;';

import { useTranslations } from 'next-intl';

import { Avatar } from '@/shared/components/ui/avatar/Avatar';
import { ButtonCustom } from '@/shared/components/ui/buttons/Button';

import styles from './AddImage.module.scss';

type AddImageProps = {
  imageUrl?: string;
  name?: string;
};

export const AddImage = ({ imageUrl, name }: AddImageProps) => {
  const t = useTranslations('Common');
  return (
    <div className={styles.Wrapper}>
      <Avatar size="large" name={name} imageUrl={imageUrl} />
      <div className={styles.Button}>
        <ButtonCustom name={t('buttons.uploadImage')} style="outlined" />
        <span className={styles.Message}>{t('settings.maxImageSize')}</span>
      </div>
    </div>
  );
};
