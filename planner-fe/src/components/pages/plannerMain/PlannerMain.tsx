'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { Spinner, TaskList, ManageTask } from '@/components';
import { useAuthStore, useTaskStore } from '@/store';

import styles from './main.module.scss';

export const PlannerMain = () => {
  const { userAuth } = useAuthStore();
  const { tasks, setTasks, isLoading } = useTaskStore();

  const [editTask, setEditTask] = useState(false);

  useEffect(() => {
    if (userAuth && !tasks && !isLoading) {
      setTasks();
    }
  }, [userAuth, tasks, isLoading, setTasks]);

  return (
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        <div className={styles.tasksWrapper}>
          <div>
            <p className={styles.day}>Листопад</p>
          </div>
          <button
            className={styles.buttonStyle}
            onClick={() => {}}
            disabled={isLoading}>
            Завантажити PDF
          </button>
          <button
            className={styles.buttonStyle}
            onClick={() => setEditTask(true)}
            disabled={isLoading}>
            {editTask ? 'Зберегти' : '+ Редагувати список'}
          </button>
        </div>

        {tasks && !isLoading ? (
          <TaskList tasks={tasks} />
        ) : (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
      </div>
      <div className={styles.asideContainer}></div>
    </div>
  );
};

export default PlannerMain;
