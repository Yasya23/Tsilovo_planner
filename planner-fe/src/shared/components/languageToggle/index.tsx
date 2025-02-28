'use client';

import SelectCustom from '../ui/Select';
import { useLocale } from 'next-intl';

const Languages = [
  { label: '🇺🇦 УK', value: 'uk' },
  { label: '🇬🇧 EN', value: 'en' },
];

export const LanguageToggle = () => {
  const locale = useLocale(); // Get current locale

  const handleChange = (selectedValue: string) => {
    console.log('Language changed to:', selectedValue);
    // Add logic to update locale
  };
  const value = Languages.find((lang) => lang.value === locale) || Languages[0];

  return (
    <SelectCustom value={value} onChange={handleChange} options={Languages} />
  );
};

export default LanguageToggle;
