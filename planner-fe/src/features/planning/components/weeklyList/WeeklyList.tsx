'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
import icons from '@/shared/icons/icons';
import { useTranslations } from 'next-intl';
import styles from './WeeklyList.module.scss';
import { Task } from '../../types/task.type';

interface WeeklyListProps {
  tasks?: Task[];
  weekDate: string[];
}

export const WeeklyList = ({ tasks = [], weekDate }: WeeklyListProps) => {
  const t = useTranslations('buttons');
  const td = useTranslations('days');

  const [completedTasks, setCompletedTasks] = useState<{
    [key: string]: boolean;
  }>(
    tasks.reduce((acc, task) => {
      acc[task._id] = task.isCompleted || false;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  // Handle checkbox state change
  const handleCheckboxChange = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId], // Toggle the completion state for the task
    }));
  };

  return (
    <div className={styles.Wrapper}>
      {weekDate.map((day, index) => (
        <div key={day} className={styles.TaskWrapper}>
          <div className={styles.Header}>
            <h3>{td(index.toString())}</h3>
            <IconButtonCustom
              icon={<icons.Edit />}
              name={t('edit')}
              onClick={() => {}}
              size="small"
            />
          </div>
          <div className={styles.Task}>
            {tasks
              .filter(
                (task) => new Date(task.date).toISOString().slice(0, 10) === day
              )
              .map((task) => (
                <div className={styles.TaskItem} key={task._id}>
                  <icons.Draggable />
                  <CheckboxCustom
                    isCompleted={completedTasks[task._id]}
                    isDisabled={false}
                    handleCheckboxChange={() => handleCheckboxChange(task._id)}
                  />
                  <p className={styles.Description}>{task.title}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyList;
