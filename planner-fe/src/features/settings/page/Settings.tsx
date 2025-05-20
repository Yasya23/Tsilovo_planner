'use client';

import { useTranslations } from 'next-intl';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import icons from '@/shared/icons/icons';
import { useAuthContext } from '@/shared/providers/AuthProvider';

import { AddImage } from '@/features/settings/components/add-image/ManageImage';
import { ChangeEmail } from '@/features/settings/components/change-data/ChangeEmail';
import { ChangeName } from '@/features/settings/components/change-data/ChangeName';
import { ChangePassword } from '@/features/settings/components/change-data/ChangePassword';

import styles from './Settings.module.scss';

export const Settings = () => {
  const t = useTranslations('Common.settings');
  const { user, refetch, isPending } = useAuthContext();

  if (!user || isPending) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.Title}>{t('title')}</h1>
      <AddImage imageUrl={user?.image} name={user?.name} onUpdate={refetch} />
      <div className={styles.FormsWrapper}>
        <ChangePassword updatePassword={(data: any) => {}} isPending={false} />
        <ChangeEmail
          email={user?.email}
          updateEmail={(data: any) => {}}
          isPending={false}
        />
        <ChangeName
          name={user?.name}
          updateName={(data: any) => {}}
          isPending={false}
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
