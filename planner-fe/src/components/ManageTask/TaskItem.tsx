'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/tasks.type';
import { useTaskStore } from '@/store';
import CheckboxCustom from '@/components/Checkbox';
import styles from './ManageTasks.module.scss';

interface TaskItemProps {
  task?: Task;
  title?: string;
  onUpdate: (updatedTask: Task) => void;
}

export const TaskItem = ({ task, title = '', onUpdate }: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(task?.isCompleted);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    if (task) {
      onUpdate({ ...task, isCompleted: !isCompleted });
    }
  };

  return (
    <div className={styles.TaskItem}>
      <CheckboxCustom
        isCompleted={!!task?.isCompleted}
        isDisabled={!false}
        handleCheckboxChange={handleCheckboxChange}
      />
      <p className={styles.Description}>{title}</p>
    </div>
  );
};

export default TaskItem;
