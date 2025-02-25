import Link from 'next/link';
import { useState } from 'react';

import styles from './Footer.module.scss';
import SelectCustom from '../Select';

const Languages = [
  { label: 'Українська', value: 'uk' },
  { label: 'English', value: 'en' },
];

export const Footer = () => {
  const [selectedValue, setSelectedValue] = useState(Languages[0].value);

  const year = new Date().getFullYear();

  const handleChange = (value: string) => {
    console.log(value);
    setSelectedValue(value);
  };

  return (
    <footer className={styles.Footer}>
      <div className={styles.Settings}>
        <SelectCustom
          value={selectedValue}
          onChange={handleChange}
          options={Languages}
          helper="Оберіть мову"
        />
        <div>Mood</div>
      </div>
      <div className={styles.Info}>
        <p className={styles.InfoLink}>
          Open-source code available on{' '}
          <Link href="https://github.com/Yasya23/personalPlanner">GitHub</Link>.
        </p>
        <p className={styles.InfoCopyright}>©{year}</p>
      </div>
    </footer>
  );
};
