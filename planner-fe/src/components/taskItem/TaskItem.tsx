'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components';
import { Task, Note } from '@/types/tasks.type';
import { useTaskStore } from '@/store';
import { CiFaceSmile } from 'react-icons/ci';

import styles from './task.module.scss';

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
      {isNote ? (
        <CiFaceSmile size={25} />
      ) : (
        <label htmlFor={task?.id || ''} className={styles.checkbox}>
          <Checkbox
            isCompleted={isCompleted}
            isDisabled={!title}
            handleCheckboxChange={handleCheckboxChange}
          />
        </label>
      )}
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
