import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from './Select.module.scss';

interface CustomSelectProps {
  value: string;
  onChange: (event: string) => void;
  options: { label: string; value: string | number }[];
  helper?: string;
  showValue?: boolean;
  format?: 'standard' | 'outlined';
  disabled?: boolean;
  minWidth?: number;
}

export const SelectCustom = ({
  value,
  onChange,
  options,
  helper,
  format = 'outlined',
  showValue = false,
  disabled = false,
  minWidth = 100,
}: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: minWidth }}
      size="small"
      className={styles.FormControl}
    >
      <Select
        className={styles.Select}
        onChange={handleChange}
        value={selectedValue}
        variant={format}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label} {showValue && option.value}
          </MenuItem>
        ))}
      </Select>
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};
