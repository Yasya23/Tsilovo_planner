'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
import icons from '@/shared/icons/icons';
import { useTranslations } from 'next-intl';
import styles from './WeeklyList.module.scss';

const tasks = {
  dailyTasks: [
    {
      day: 'Monday',
      tasks: [
        { id: '1', title: 'Complete project proposal', isCompleted: false },
        {
          id: '2',
          title: 'mgkrejgeklrfwff  klekwlqeklrkel jrkjtwelkrlwe orsktoelk',
          isCompleted: true,
        },
        {
          id: '3',
          title: 'mgkrejgeklrfwk lekwlqeklrkel jrkjtwe lkrlwe orktoelk',
          isCompleted: false,
        },
      ],
    },
    {
      day: 'Tuesday',
      tasks: [
        { id: '4', title: 'Update task planner UI', isCompleted: false },
        { id: '5', title: 'Team meeting at 10 AM', isCompleted: true },
        { id: '6', title: 'Fix authentication bug', isCompleted: false },
      ],
    },
    {
      day: 'Wednesday',
      tasks: [
        { id: '7', title: 'Refactor API endpoints', isCompleted: false },
        { id: '8', title: 'Write test cases for backend', isCompleted: true },
        { id: '9', title: 'Plan new feature roadmap', isCompleted: false },
      ],
    },
  ],
};

export const WeeklyList = () => {
  const t = useTranslations('buttons');

  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={styles.Wrapper}>
      {tasks.dailyTasks.map((dayTask) => {
        return (
          <div key={dayTask.day} className={styles.TaskWrapper}>
            <div className={styles.Header}>
              <h3>{dayTask.day}</h3>
              <IconButtonCustom
                icon={<icons.Edit />}
                name={t('edit')}
                onClick={() => {}}
                size="small"
              />
            </div>
            <div className={styles.Task}>
              {dayTask.tasks.map((task, taskIndex) => (
                <div className={styles.TaskItem} key={taskIndex}>
                  <icons.Draggable />
                  <CheckboxCustom
                    isCompleted={!!task?.isCompleted}
                    isDisabled={false}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                  <p className={styles.Description}>{task.title}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyList;
