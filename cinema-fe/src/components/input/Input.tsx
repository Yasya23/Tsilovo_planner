import React from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './input.module.scss';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.inputWrapper}>
      <FiSearch className={styles.searchIcon} />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
