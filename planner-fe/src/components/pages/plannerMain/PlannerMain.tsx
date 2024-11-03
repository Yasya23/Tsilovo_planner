'use client';

import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';

import { Spinner, TaskList } from '@/components';
import { useAuthStore, useTaskStore } from '@/store';
import { weekCalculate } from '@/utils';

import classNames from 'classnames';
import styles from './main.module.scss';

export const PlannerMain = () => {
  const { userAuth } = useAuthStore();
  const { tasks, setTasks, isLoading, setPdfMode } = useTaskStore();
  const { weekNumber } = weekCalculate();

  const [editTask, setEditTask] = useState(false);
  const [format, setFormat] = useState('a4');
  const taskListRef = useRef(null);

  useEffect(() => {
    if (userAuth && !tasks && !isLoading) {
      setTasks();
    }
  }, [userAuth, tasks, isLoading, setTasks]);

  const handleDownloadPDF = () => {
    if (!taskListRef.current) return;

    setPdfMode(true);

    const options = {
      filename: `Планувальник_${dayjs().format('YYYY-MM-DD')}.pdf`,
      jsPDF: { unit: 'mm', format },
    };

    html2pdf()
      .set(options)
      .from(taskListRef.current)
      .save()
      .finally(() => setPdfMode(false));
  };

  // const handleSave() = {

  // }

  return (
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        <div className={styles.tasksWrapper}>
          <div>
            <p className={styles.day}>Тиждень {weekNumber}</p>
          </div>
          <select
            className={styles.selectStyle}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            disabled={isLoading}>
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
          </select>
          <button
            className={styles.buttonStyle}
            onClick={handleDownloadPDF}
            disabled={isLoading}>
            Завантажити PDF
          </button>
          <button
            className={styles.buttonStyle}
            onClick={() => setEditTask(true)}
            disabled={isLoading}>
            {editTask ? 'Зберегти' : 'Редагувати список'}
          </button>
        </div>

        {tasks && !isLoading ? (
          <div
            ref={taskListRef}
            className={classNames(styles.taskListWrapper, {
              [styles.enable]: editTask,
            })}>
            <TaskList tasks={tasks} />
          </div>
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
