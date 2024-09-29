'use client';
import { useState } from 'react';
import ManageTaskModal from '../../forms/manageTask/ManageTask';

import styles from './main.module.scss';
import TaskList from '@/components/taskList/TaskList';
import useTaskStore from '@/store/TaskStore';
import Spinner from '@/components/spinner/Spinner';

const PlannerMain = () => {
  const { tasks, setTasks } = useTaskStore();

  const [addTask, setAddTask] = useState(false);

  if (!tasks) {
    setTasks();
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <p className={styles.day}>
            Monday <span>12.05</span>
          </p>
        </div>
        <div className={styles.arrowButtons}>
          <button className={styles.outlineButton}>&lt;</button>
          <button className={styles.outlineButton}>&gt;</button>
        </div>
        <button className={styles.buttonStyle} onClick={() => setAddTask(true)}>
          + Додати завдання
        </button>
      </div>
      <TaskList tasks={tasks} />

      {addTask && (
        <ManageTaskModal
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
