'use client';

import { useState, useEffect } from 'react';
import { Task, Note } from '@/types/tasks.type';
import { useTaskStore } from '@/store';
import { CiFaceSmile } from 'react-icons/ci';
import CheckboxCustom from '@/components/Checkbox';
import styles from './Task.module.scss';
import Checkbox from '@mui/material/Checkbox';

interface TaskItemProps {
  task?: Task;
  title?: string;
  isNote?: boolean;
  onUpdate: (updatedTask: Task | Note) => void;
}

export const TaskItem = ({
  task,
  title = '',
  isNote = false,
  onUpdate,
}: TaskItemProps) => {
  const { pdfMode } = useTaskStore();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (task) setIsCompleted(task?.isCompleted);
  }, [task]);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    if (task) {
      onUpdate({ ...task, isCompleted: !isCompleted });
    }
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedDetails = e.target.value;
    if (isNote) {
      onUpdate(updatedDetails);
    }
    if (task) {
      onUpdate({ ...task, title: updatedDetails });
    }
  };

  return (
    <div className={styles.taskItem}>
      <label htmlFor={task?.id || ''} className={styles.checkbox}>
        <CheckboxCustom
          isCompleted={!!task?.isCompleted}
          isDisabled={!title}
          handleCheckboxChange={handleCheckboxChange}
        />
      </label>

      <div className={styles.detailsContainer}>
        <hr className={styles.horizontalLine} />

        {pdfMode ? (
          <div className={styles.pdfTaskDetails}>{title}</div>
        ) : (
          <textarea
            className={styles.taskDetails}
            value={title}
            onChange={handleDetailsChange}
            rows={2}
            maxLength={67}
          />
        )}
      </div>
    </div>
  );
};

export default TaskItem;
