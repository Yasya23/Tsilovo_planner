'use client';

import { useState } from 'react';
import { useTaskStore } from '@/store';
import Checkbox from '@mui/material/Checkbox';

import styles from './Checkbox.module.scss';
interface Props {
  isCompleted: boolean;
  isDisabled: boolean;
  handleCheckboxChange: () => void;
}

export const CheckboxCustom = ({
  isCompleted,
  isDisabled = false,
  handleCheckboxChange,
}: Props) => {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    handleCheckboxChange();
  };

  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      disabled={isDisabled}
    />
  );
};

export default CheckboxCustom;
