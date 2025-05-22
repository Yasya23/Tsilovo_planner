'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useEdgeStore } from '@/lib/edgestore';

import { UserService } from '@/features/settings/services/user.service';

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const useUploadImage = (options?: {
  onSuccess?: (url: string) => Promise<void> | void;
  defaultImageUrl?: string;
  onProfileUpdate?: () => void;
}) => {
  const t = useTranslations('Common.settings');
  const { edgestore } = useEdgeStore();

  const [isUploading, setIsUploading] = useState(false);
  const [isPendingProfileUpdate, setIsPendingProfileUpdate] = useState(false);
  const [isProfileUpdateError, setIsProfileUpdateError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    options?.defaultImageUrl
  );

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;

    if (file.size > MAX_FILE_SIZE) {
      setError(t('fileTooLarge'));
      return null;
    }

    setError(null);
    setIsUploading(true);
    setIsProfileUpdateError(false);

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // Optional: handle progress updates
        },
      });

      if (res.url) {
        if (options?.onSuccess) {
          await options.onSuccess(res.url);
        } else {
          setIsPendingProfileUpdate(true);
          try {
            await UserService.changeAvatar(res.url);
            options?.onProfileUpdate?.();
          } catch (err) {
            setIsProfileUpdateError(true);
            setError(t('profileUpdateError'));
            setPreviewUrl(options?.defaultImageUrl);
          } finally {
            setIsPendingProfileUpdate(false);
          }
        }
      }

      return res.url;
    } catch (err) {
      setError(t('updateError'));
      setPreviewUrl(options?.defaultImageUrl);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const reset = () => {
    setIsUploading(false);
    setIsPendingProfileUpdate(false);
    setIsProfileUpdateError(false);
    setError(null);
    setPreviewUrl(options?.defaultImageUrl);
  };

  return {
    uploadImage,
    handleFileChange,
    reset,
    isUploading,
    error,
    previewUrl,
    setPreviewUrl,
    isPendingProfileUpdate,
    isProfileUpdateError,
  };
};
