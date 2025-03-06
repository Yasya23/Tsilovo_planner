import styles from './GoalTaskInput.module.scss';
interface GoalTaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
}

const GoalTaskInput = ({
  value,
  onChange,
  placeholder,
  maxLength = 100,
}: GoalTaskInputProps) => {
  return (
    <>
      <div className={styles.InputWrapper}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.Input}
          maxLength={maxLength}
          required
        />
        <span className={styles.Counter}>{maxLength - value.length}</span>
      </div>
    </>
  );
};

export default GoalTaskInput;
