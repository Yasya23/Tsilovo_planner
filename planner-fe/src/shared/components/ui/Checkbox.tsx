'use client';

import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

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
      disabled={isDisabled}
    />
  );
};

export default CheckboxCustom;
