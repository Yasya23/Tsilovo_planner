'use client';

import SelectCustom from '../ui/Select';

const Languages = [
  { label: '🇺🇦 УK', value: 'uk' },
  { label: '🇬🇧 EN', value: 'en' },
];

export const LanguageToggle = () => {
  const handleChange = () => {};

  return (
    <SelectCustom
      value={Languages[0].value}
      onChange={handleChange}
      options={Languages}
    />
  );
};

export default LanguageToggle;
