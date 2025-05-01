'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useEdgeStore } from '@/lib/edgestore';
import { useMutation } from '@tanstack/react-query';

import { UserService } from '@/features/settings/services/user.service';

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const useUploadImage = (options?: {
  onSuccess?: (url: string) => Promise<void> | void;
  defaultImageUrl?: string;
  onProfileUpdate?: () => void;
}) => {
  const t = useTranslations('Common');
  const { edgestore } = useEdgeStore();

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    options?.defaultImageUrl
  );

  const updateProfileMutation = useMutation({
    mutationFn: (imageUrl: string) => {
      return UserService.updateProfile(imageUrl);
    },
    onSuccess: () => {
      if (options?.onProfileUpdate) {
        options.onProfileUpdate();
      }
    },
    onError: (err) => {
      console.error('Error updating profile:', err);
      setError(t('settings.profileUpdateError'));
      setPreviewUrl(options?.defaultImageUrl);
    },
  });

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;
    console.log(file);

    if (file.size > MAX_FILE_SIZE) {
      setError(t('settings.fileTooLarge'));
      return null;
    }

    setError(null);
    setIsUploading(true);

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });

      if (res.url) {
        if (options?.onSuccess) {
          await options.onSuccess(res.url);
        } else {
          updateProfileMutation.mutate(res.url);
        }
      }

      return res.url;
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(t('settings.uploadError'));
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
    isPendingProfileUpdate: updateProfileMutation.isPending,
    isProfileUpdateError: updateProfileMutation.isError,
  };
};
