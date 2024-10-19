'use client';

import { useState } from 'react';

import { Spinner, TaskList, ManageTask } from '@/components';
import { useAuthStore, useTaskStore } from '@/store';

import styles from './main.module.scss';

export const PlannerMain = () => {
  const { userAuth } = useAuthStore();
  const { tasks, setTasks } = useTaskStore();
  console.log(tasks);

  const [addTask, setAddTask] = useState(false);

  if (!tasks && userAuth) {
    setTasks();
    return <Spinner />;
  }

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
            onClick={() => setAddTask(true)}>
            + Додати завдання
          </button>
        </div>
        <TaskList tasks={tasks} />
      </div>
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
