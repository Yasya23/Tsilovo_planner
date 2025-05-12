'use client';

import { useTranslations } from 'next-intl';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import icons from '@/shared/icons/icons';

import { useAuthContext } from '@/features/auth/context/AuthProvider';
import { AddImage } from '@/features/settings/components/add-image/ManageImage';
import { ChangeEmail } from '@/features/settings/components/change-email/ChangeEmail';
import { ChangePassword } from '@/features/settings/components/change-password/ChangePassword';

import styles from './Settings.module.scss';

export const Settings = () => {
  const t = useTranslations('Common.settings');
  const { user, invalidateQueries } = useAuthContext();

  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.Title}>{t('title')}</h1>
      <AddImage
        imageUrl={user?.image}
        name={user?.name}
        onUpdate={invalidateQueries}
      />
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
