'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import SelectCustom from '../ui/Select';

const Languages = [
  { label: '🇺🇦 УK', value: 'uk' },
  { label: '🇬🇧 EN', value: 'en' },
];

export const LanguageToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (selectedValue: string) => {
    if (selectedValue !== locale && pathname) {
      const newPath = pathname.replace(/^\/(uk|en)/, '') || '/';
      router.push(`/${selectedValue}${newPath}`);
    }
  };

  const value =
    Languages.find((lang) => lang.value === locale)?.value ||
    Languages[0].value;

  return (
    <SelectCustom value={value} onChange={handleChange} options={Languages} />
  );
};

export default LanguageToggle;
