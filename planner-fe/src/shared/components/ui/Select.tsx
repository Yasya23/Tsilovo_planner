import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CustomSelectProps {
  value: string;
  onChange: (event: string) => void;
  options: { label: string; value: string | number }[];
  helper?: string;
  showValue?: boolean;
  format?: 'standard' | 'outlined';
  disabled?: boolean;
  minSize?: number;
}

const SelectCustom = ({
  value,
  onChange,
  options,
  helper,
  format = 'standard',
  showValue = false,
  disabled = false,
  minSize = 180,
}: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: minSize }}>
      <Select
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
