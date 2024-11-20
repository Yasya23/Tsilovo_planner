'use client';

import { useState } from 'react';
import { useTaskStore } from '@/store';
import { FiCheck } from 'react-icons/fi';

import styles from './checkbox.module.scss';
import classNames from 'classnames';
interface Props {
  isCompleted: boolean;
  isDisabled: boolean;
  handleCheckboxChange?: () => void;
}

export const Checkbox = ({
  isCompleted,
  isDisabled = false,
  handleCheckboxChange,
}: Props) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const pdfMode = useTaskStore((state) => state.pdfMode);

  const handleChange = () => {
    setIsChecked(!isChecked);
    if (handleCheckboxChange) {
      handleCheckboxChange();
    }
  };

  return (
    <div className={styles['checkbox-wrapper-12']}>
      {pdfMode ? (
        <div
          className={classNames(styles.pdfCheckbox, {
            [styles.checked]: isChecked,
          })}>
          {isChecked && <FiCheck />}
        </div>
      ) : (
        <div className={styles.cbx}>
          <input
            id="cbx-12"
            type="checkbox"
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange}
          />
          <label htmlFor="cbx-12"></label>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>
      )}

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo-12">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="4"
              result="blur"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              result="goo-12"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Checkbox;
