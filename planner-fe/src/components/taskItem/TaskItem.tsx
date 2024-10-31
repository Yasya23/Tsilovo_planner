'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button, Checkbox, ManageTask } from '@/components';
import { Task } from '@/types/interfaces/task';

import styles from './task.module.scss';

interface TaskItemProps {
  task: Task | null;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [editTask, setEditTask] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted || false);
  const [details, setDetails] = useState(task?.title || '');

  const id = task?._id ? task._id : '';

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={styles.taskItem}>
      <label htmlFor={id} className={styles.checkbox}>
        <Checkbox
          isCompleted={!!task?.isCompleted}
          isDisabled={!details}
          handleCheckboxChange={handleCheckboxChange}
        />
      </label>
      <div className={styles.detailsContainer}>
        <textarea
          className={styles.taskDetails}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={2}
          maxLength={67}
        />
        <hr className={styles.horizontalLine} />
      </div>
      <div className={styles.taskTitle}>{}</div>
    </div>
  );
};

export default TaskItem;
