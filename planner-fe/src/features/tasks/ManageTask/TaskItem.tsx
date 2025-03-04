'use client';

import { useState } from 'react';
import { Task } from '@/shared/types/tasks.type';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
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
        isDisabled={false}
        handleCheckboxChange={handleCheckboxChange}
      />
      <p className={styles.Description}>{title}</p>
    </div>
  );
};

export default TaskItem;
