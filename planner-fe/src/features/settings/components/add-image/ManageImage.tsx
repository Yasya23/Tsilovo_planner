'use client';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';

import { Avatar } from '@/shared/components/avatar/Avatar';
import { ButtonCustom } from '@/shared/components/buttons/Button';
import { SkeletonLoader } from '@/shared/components/SkeletonLoader';
import { useAuthContext } from '@/shared/providers/AuthProvider';

import { useUploadImage } from '@/features/settings/hooks/useUploadImages';

import styles from './ManageImage.module.scss';

export const AddImage = () => {
  const { user, refetch, isPending } = useAuthContext();

  const t = useTranslations('Common');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleFileChange, isUploading, error, isPendingProfileUpdate } =
    useUploadImage({
      defaultImageUrl: user?.image,
      onProfileUpdate: () => refetch(),
    });

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const isLoading = isUploading || isPendingProfileUpdate || isPending || !user;

  return (
    <div className={styles.Wrapper}>
      {isPending && !user ? (
        <SkeletonLoader count={1} width={70} height={70} variant="circular" />
      ) : (
        <Avatar size="large" name={user?.name} imageUrl={user?.image} />
      )}

      <div className={styles.Button}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <ButtonCustom
          name={isLoading ? t('buttons.uploading') : t('buttons.uploadImage')}
          style="outlined"
          onClick={handleButtonClick}
          disabled={isLoading}
        />
        {error ? (
          <span className={`${styles.Message} ${styles.Error}`}>{error}</span>
        ) : (
          <span className={styles.Message}>{t('settings.maxImageSize')}</span>
        )}
      </div>
    </div>
  );
};
