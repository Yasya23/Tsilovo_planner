'use client';

import { useTranslations } from 'next-intl';

import { ButtonCustom } from '@/shared/components/buttons/Button';

import { useConfirmDelete } from '@/features/confirm-delete-account/hooks/useConfirmDelete';

import styles from './ConfirmDelete.module.scss';

export const ConfirmDelete = () => {
  const t = useTranslations('Common.deleteAccount');
  const { confirmDeleteAccount, isPending, tokenExists } = useConfirmDelete();

  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.Title}>{t('confirmDeleteAccount')}</h1>
      <ButtonCustom
        name={t('deleteAccount')}
        onClick={confirmDeleteAccount}
        disabled={isPending || !tokenExists}
      />
    </div>
  );
};

export default ConfirmDelete;
