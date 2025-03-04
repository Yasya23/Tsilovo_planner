import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import { FiSave, FiX } from 'react-icons/fi';
import styles from './GoalTaskInput.module.scss';

interface GoalTaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
}

const GoalTaskInput = ({
  value,
  onChange,
  onSave,
  onCancel,
  placeholder,
  minLength = 3,
  maxLength = 100,
}: GoalTaskInputProps) => {
  return (
    <div className={styles.InputWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.Input}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span className={styles.Counter}>{maxLength - value.length}</span>

      <div className={styles.Actions}>
        <IconButtonCustom icon={<FiSave />} name="Save" onClick={onSave} />
        <IconButtonCustom icon={<FiX />} name="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
};

export default GoalTaskInput;
