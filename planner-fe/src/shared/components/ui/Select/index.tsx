import * as React from 'react';
import { Select } from '@base-ui-components/react/select';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

import styles from './Select.module.scss';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string | number }[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const SelectCustom = ({
  value,
  onChange,
  options,
  disabled = false,
  icon,
}: CustomSelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={styles.Select}>
        <div className={styles.SelectedValueWrapper}>
          {icon && icon}
          <Select.Value />
        </div>
        <Select.Icon className={styles.SelectIcon}>
          <FiChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={styles.Positioner} sideOffset={3}>
          <Select.Popup className={styles.Popup}>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={String(option.value)}
                disabled={disabled}
                className={styles.Item}>
                <Select.ItemIndicator className={styles.ItemIndicator}>
                  <FiCheck className={styles.ItemIndicatorIcon} />
                </Select.ItemIndicator>
                <Select.ItemText className={styles.ItemText}>
                  {option.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectCustom;
