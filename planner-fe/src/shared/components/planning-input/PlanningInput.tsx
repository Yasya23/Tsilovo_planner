import classNames from 'classnames';

import styles from './PlanningInput.module.scss';

type PlanningInput = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
  type?: 'text' | 'password';
  inputRef?: React.RefObject<HTMLInputElement | null>;
  isCompleted?: boolean;
};

export const PlanningInput = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength = 100,
  inputRef,
  isCompleted,
}: PlanningInput) => {
  return (
    <>
      <div className={styles.InputWrapper}>
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={classNames(styles.Input, {
            [styles.Completed]: isCompleted,
          })}
          maxLength={maxLength}
          required
        />
        <span className={styles.Counter}>{maxLength - value.length}</span>
      </div>
    </>
  );
};

export default PlanningInput;
