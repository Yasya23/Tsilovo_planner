'use client';

import { forwardRef, useState } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

import classNames from 'classnames';

import styles from './Input.module.scss';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  type?: 'text' | 'password' | 'email';
  label?: string;
  hasMessages?: boolean;
  error?: string;
  hasAbilityHideValue?: boolean;
  isLabelVisibilityHidden?: boolean;
  disabled?: boolean;
  placeholder?: string;
  serverError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      type = 'text',
      icon,
      error,
      placeholder,
      hasMessages = true,
      hasAbilityHideValue = false,
      disabled = false,
      serverError = false,
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

    const isSuccess = hasMessages && !error && value && !serverError;
    const inputClass = classNames(styles.InputWrapper, {
      [styles.error]: error,
      [styles.success]: isSuccess,
    });

    return (
      <div className={styles.Wrapper}>
        <div className={inputClass}>
          {isSuccess && <FiCheckCircle className={styles.SuccessValidation} />}
          {icon && <div className={styles.Icon}>{icon}</div>}

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
              className={styles.EyeIcon}
            >
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
