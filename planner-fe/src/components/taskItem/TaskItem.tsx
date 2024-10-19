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

  const id = task?._id ? task._id : '';

  const handleDelete = () => {
    if (task?._id) {
      const isConfirmed = confirm(
        'Ви впевнені, що хочете видалити це завдання?'
      );
      // if (isConfirmed) onDelete(task._id);
    }
  };

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={styles.taskItem}>
      <label htmlFor={id} className={styles.checkbox}>
        <Checkbox
          isCompleted={!!task?.isCompleted}
          handleCheckboxChange={handleCheckboxChange}
        />
      </label>
      <div className={styles.taskTitle}>{task?.title}</div>

      <div className={styles.actionButtons}>
        <Button
          label="Edit"
          onClick={() => setEditTask(true)}
          icon={<FiEdit />}
          className={styles.editButton}
        />
        <Button
          label="Delete"
          onClick={handleDelete}
          icon={<FiTrash2 />}
          className={styles.deleteButton}
        />
      </div>
      {task && editTask && (
        <ManageTask
          action="edit"
          heading="Редагувати завдання"
          task={task}
          isOpen={editTask}
          onClose={() => setEditTask(false)}
        />
      )}
    </div>
  );
};

export default TaskItem;
