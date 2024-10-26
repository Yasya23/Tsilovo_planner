'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { Spinner, TaskList, ManageTask } from '@/components';
import { useAuthStore, useTaskStore } from '@/store';

import styles from './main.module.scss';

export const PlannerMain = () => {
  const { userAuth } = useAuthStore();
  const { tasks, setTasks, isLoading } = useTaskStore();

  const [addTask, setAddTask] = useState(false);

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
            <p className={styles.day}>
              Monday <span>12.05</span>
            </p>
          </div>
          <div className={styles.arrowButtons}>
            <button className={styles.outlineButton}>&lt;</button>
            <button className={styles.outlineButton}>&gt;</button>
          </div>
          <button
            className={styles.buttonStyle}
            onClick={() => setAddTask(true)}
            disabled={isLoading}>
            + Додати завдання
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
      {addTask && (
        <ManageTask
          heading="Додати завдання"
          action="add"
          isOpen={addTask}
          onClose={() => setAddTask(false)}
        />
      )}
    </div>
  );
};

export default PlannerMain;
