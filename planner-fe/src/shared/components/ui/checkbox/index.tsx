'use client';

import { useState } from 'react';
import { Checkbox } from '@base-ui-components/react/checkbox';
import { FiCheck } from 'react-icons/fi';

import styles from './CheckboxCustom.module.scss';

interface Props {
  isCompleted: boolean;
  isDisabled?: boolean;
  label?: string;
  handleCheckboxChange: () => void;
}

export const CheckboxCustom = ({
  isCompleted,
  isDisabled = false,
  label = '',
  handleCheckboxChange,
}: Props) => {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleChange = (checked: boolean) => {
    if (isDisabled) return;
    setIsChecked(checked);
    handleCheckboxChange();
  };

  return (
    <label className={styles.Label}>
      <Checkbox.Root
        className={styles.Checkbox}
        disabled={isDisabled}
        checked={isChecked}
        onCheckedChange={handleChange}>
        <Checkbox.Indicator className={styles.Indicator}>
          <FiCheck className={styles.Icon} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label}
    </label>
  );
};

export default CheckboxCustom;
