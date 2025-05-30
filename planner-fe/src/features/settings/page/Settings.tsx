'use client';

import { useTranslations } from 'next-intl';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import icons from '@/shared/icons/icons';

import { AddImage } from '@/features/settings/components/add-image/ManageImage';
import { ChangeEmail } from '@/features/settings/components/change-data/ChangeEmail';
import { ChangeName } from '@/features/settings/components/change-data/ChangeName';
import { ChangePassword } from '@/features/settings/components/change-data/ChangePassword';

import { useDeleteProfile } from '../hooks/useDeleteProfile';
import styles from './Settings.module.scss';

export const Settings = () => {
  const t = useTranslations('Common.settings');
  const { deleteProfile, isPending } = useDeleteProfile();

  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.Title}>{t('title')}</h1>
      <AddImage />
      <div className={styles.FormsWrapper}>
        <ChangePassword />
        <ChangeEmail />
        <ChangeName />
      </div>
      <div className={styles.Delete}>
        <ButtonCustom
          onClick={deleteProfile}
          disabled={isPending}
          color="error"
          name={t('deleteAccount')}
          style="outlined"
          type="button"
          iconStart={<icons.Trash />}
        />
        <p className={styles.Note}>{t('deleteNotification')}</p>
      </div>
    </div>
  );
};

export default Settings;
