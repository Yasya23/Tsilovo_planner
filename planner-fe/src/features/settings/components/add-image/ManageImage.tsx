'use client';

import { useRef } from 'react';

import { useTranslations } from 'next-intl';

import { Avatar } from '@/shared/components/avatar/Avatar';
import { ButtonCustom } from '@/shared/components/buttons/Button';

import { useUploadImage } from '@/features/settings/hooks/useUploadImages';

import styles from './ManageImage.module.scss';

type AddImageProps = {
  imageUrl?: string;
  name?: string;
  onUpdate?: () => void;
};

export const AddImage = ({ imageUrl, name, onUpdate }: AddImageProps) => {
  const t = useTranslations('Common');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleFileChange, isUploading, error, isPendingProfileUpdate } =
    useUploadImage({
      defaultImageUrl: imageUrl,

      onProfileUpdate: () => {
        if (onUpdate) {
          onUpdate();
        }
      },
    });

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const isLoading = isUploading || isPendingProfileUpdate;

  return (
    <div className={styles.Wrapper}>
      <Avatar size="large" name={name} imageUrl={imageUrl} />
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
