import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
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

const SelectCustom = ({
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
    <FormControl sx={{ m: 1, minWidth: minWidth }} size="small">
      <Select
        className={styles.Select}
        onChange={handleChange}
        value={selectedValue}
        variant={format}
        disabled={disabled}>
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

export default SelectCustom;
