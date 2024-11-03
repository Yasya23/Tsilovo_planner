'use client';

import { useState } from 'react';
import { Checkbox } from '@/components';
import { Task } from '@/types/interfaces/task';
import { useTaskStore } from '@/store';
import { CiFaceSmile } from 'react-icons/ci';

import styles from './task.module.scss';

interface TaskItemProps {
  task: Task | null;
  isNote?: boolean;
}

export const TaskItem = ({ task, isNote = false }: TaskItemProps) => {
  const { pdfMode } = useTaskStore();
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted || false);
  const [details, setDetails] = useState(task?.title || '');

  const id = task?._id ? task._id : '';

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={styles.taskItem}>
      {isNote ? (
        <CiFaceSmile size={25} />
      ) : (
        <label htmlFor={id} className={styles.checkbox}>
          <Checkbox
            isCompleted={!!task?.isCompleted}
            isDisabled={!details}
            handleCheckboxChange={handleCheckboxChange}
          />
        </label>
      )}
      <div className={styles.detailsContainer}>
        <hr className={styles.horizontalLine} />

        {pdfMode ? (
          <div className={styles.pdfTaskDetails}>{details}</div>
        ) : (
          <textarea
            className={styles.taskDetails}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={2}
            maxLength={67}
          />
        )}
      </div>
    </div>
  );
};

export default TaskItem;
