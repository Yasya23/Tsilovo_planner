'use client';

import { useState, FocusEvent } from 'react';
import styles from './input.module.scss';
import { IconType } from 'react-icons';
import {
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
  FiCheckCircle,
} from 'react-icons/fi';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  icon?: IconType;
  type?: string;
  label?: string;
  hasMessages?: boolean;
  error?: string;
  successValidation?: boolean;
  hasAbilityHideValue?: boolean;
  placeholder?: string;
}

const Input = ({
  value,
  onChange,
  onFocus,
  onBlur,
  type = 'text',
  icon: Icon,
  label,
  error,
  placeholder,
  hasMessages = true,
  hasAbilityHideValue = false,
}: InputProps) => {
  const [fieldType, setFieldType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);

  const toggleVisibility = () => {
    setFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const showSuccessIcon = hasMessages && !isFocused && !error && value;

  return (
    <div className={styles.fieldsWrapper}>
      <label className={styles.label}>
        {showSuccessIcon && <FiCheckCircle className={styles.successIcon} />}
        {label}
        <div className={styles.inputWrapper}>
          {Icon && <Icon className={styles.icon} />}
          <input
            type={fieldType}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              if (!onFocus) return;
              setIsFocused(true);
              onFocus(e);
            }}
            onBlur={(e) => {
              if (!onBlur) return;
              setIsFocused(false);
              onBlur(e);
            }}
            placeholder={placeholder}
            className={styles.input}
          />
          {hasAbilityHideValue && (
            <div
              role="button"
              onClick={toggleVisibility}
              className={styles.eyeIcon}>
              {fieldType === 'password' ? <FiEye /> : <FiEyeOff />}
            </div>
          )}
        </div>
      </label>

      {hasMessages && (
        <div className={styles.messageField}>
          {error && (
            <p className={styles.error}>
              <FiAlertTriangle />
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
