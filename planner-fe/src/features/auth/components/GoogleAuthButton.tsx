'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { ButtonCustom } from '@/shared/components/buttons/Button';
import { services } from '@/shared/constants/api-services';
import icons from '@/shared/icons/icons';

export const GoogleAuthButton = ({ disabled }: { disabled?: boolean }) => {
  const t = useTranslations('Common.buttons');
  const router = useRouter();

  const handleGoogleAuth = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}${services.googleAuth}`);
  };
  return (
    <ButtonCustom
      name={t('googleAuth')}
      style="outlined"
      iconStart={<icons.Google />}
      disabled={disabled}
      onClick={handleGoogleAuth}
    />
  );
};

export default GoogleAuthButton;
