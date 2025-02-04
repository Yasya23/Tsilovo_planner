'use client';

import { useState, forwardRef } from 'react';
import {
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
  FiCheckCircle,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

import styles from './input.module.scss';
import classNames from 'classnames';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  icon?: IconType;
  type?: string;
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
      label,
      error,
      placeholder,
      hasMessages = true,
      isLabelVisibilityHidden = false,
      hasAbilityHideValue = false,
      disabled = false,
    },
    ref
  ) => {
    const [fieldType, setFieldType] = useState(type);
    const [isFocused, setIsFocused] = useState(false);

    const toggleVisibility = (e: React.MouseEvent) => {
      e.preventDefault();
      setFieldType((prevType) =>
        prevType === 'password' ? 'text' : 'password'
      );
    };

    const showSuccessIcon = hasMessages && !isFocused && !error && value;

    return (
      <div className={styles.fieldsWrapper}>
        <label>
          <span
            className={classNames(styles.label, {
              [styles.hidden]: isLabelVisibilityHidden,
            })}>
            {label}
          </span>

          {showSuccessIcon && <FiCheckCircle className={styles.successIcon} />}
          <div className={styles.inputWrapper}>
            {Icon && <Icon className={styles.icon} />}
            <input
              type={fieldType}
              value={value}
              onChange={onChange}
              onFocus={(e) => {
                setIsFocused(true);
                if (onFocus) onFocus(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                if (onBlur) onBlur(e);
              }}
              placeholder={placeholder}
              disabled={disabled}
              className={classNames(styles.input, { [styles.noIcon]: !Icon })}
              ref={ref}
            />

            {hasAbilityHideValue && (
              <div
                role="button"
                onClick={toggleVisibility}
                className={styles.eyeIcon}>
                {fieldType === 'password' ? <FiEyeOff /> : <FiEye />}
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
  }
);

export default Input;
