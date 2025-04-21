'use client';

import { useTranslations } from 'next-intl';

import { ChangeEmail } from 'features/settings/components/_parts/change-email/ChangeEmail';

import { ButtonCustom } from '@/shared/components/ui/buttons/Button';
import icons from '@/shared/icons/icons';

import { AddImage } from '@/features/settings/components/_parts/add-image/AddImage';
import { ChangePassword } from '@/features/settings/components/_parts/change-password/ChangePassword';

import styles from './Settings.module.scss';

export const Settings = () => {
  const t = useTranslations('Common.settings');
  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.Title}>{t('title')}</h1>
      <AddImage />
      <div className={styles.FormsWrapper}>
        <ChangePassword
          updatePassword={(data: any) => {}}
          isPending={false}
          error={null}
        />
        <ChangeEmail
          updateEmail={(data: any) => {}}
          isPending={false}
          error={null}
        />
      </div>
      <div className={styles.Delete}>
        <ButtonCustom
          color="error"
          name={t('deleteAccount')}
          style="outlined"
          iconStart={<icons.Trash />}
        />
        <p className={styles.Note}>{t('deleteNotification')}</p>
      </div>
    </div>
  );
};

export default Settings;
