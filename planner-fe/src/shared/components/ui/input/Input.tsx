'use client';

import { useState, forwardRef } from 'react';
import {
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
  FiCheckCircle,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

import styles from './index.module.scss';
import classNames from 'classnames';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  icon?: IconType;
  type?: 'text' | 'password' | 'email';
  label?: string;
  hasMessages?: boolean;
  error?: string;
  hasAbilityHideValue?: boolean;
  isLabelVisibilityHidden?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      type = 'text',
      icon: Icon,
      error,
      placeholder,
      hasMessages = true,
      hasAbilityHideValue = false,
      disabled = false,
    },
    ref
  ) => {
    const [fieldType, setFieldType] = useState(type);

    const toggleVisibility = (e: React.MouseEvent) => {
      e.preventDefault();
      setFieldType((prevType) =>
        prevType === 'password' ? 'text' : 'password'
      );
    };

    const isSuccess = hasMessages && !error && value;
    const inputClass = classNames(styles.InputWrapper, {
      [styles.error]: error,
      [styles.success]: isSuccess,
    });

    return (
      <div className={styles.Wrapper}>
        <div className={inputClass}>
          {isSuccess && <FiCheckCircle className={styles.SuccessValidation} />}
          {Icon && <Icon className={styles.Icon} />}

          <input
            type={fieldType}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              if (onFocus) onFocus(e);
            }}
            onBlur={(e) => {
              if (onBlur) onBlur(e);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className={styles.Input}
            ref={ref}
          />

          <span className={styles.Label}>{placeholder}</span>

          {hasAbilityHideValue && (
            <div
              role="button"
              onClick={toggleVisibility}
              className={styles.EyeIcon}>
              {fieldType === 'password' ? <FiEyeOff /> : <FiEye />}
            </div>
          )}
        </div>

        {hasMessages && (
          <p className={styles.Error}>
            {error && <FiAlertTriangle />}
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
