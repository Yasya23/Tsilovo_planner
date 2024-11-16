'use client';

import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';

import { Spinner, TaskList, ProgressChart } from '@/components';
import { useAuthStore, useTaskStore } from '@/store';
import { weekCalculate } from '@/utils';
import { defaultWeekTasks } from '@/constants/defaultWeekTasks';
import { WeekTasks } from '@/types/tasks.type';
import classNames from 'classnames';
import styles from './main.module.scss';

export const PlannerMain = () => {
  const { userAuth } = useAuthStore();
  const { tasks, setTasks, isLoading, updateTask, setPdfMode, pdfMode } =
    useTaskStore();
  const { weekNumber } = weekCalculate();

  const [editTask, setEditTask] = useState(false);
  const [temporaryTasks, setTemporaryTasks] =
    useState<WeekTasks>(defaultWeekTasks);
  const [format, setFormat] = useState('a4');
  const taskListRef = useRef(null);

  useEffect(() => {
    if (editTask && tasks) {
      setTemporaryTasks({ ...tasks });
    } else {
      setTemporaryTasks(defaultWeekTasks);
    }
  }, [editTask, tasks]);
  console.log(tasks, userAuth);
  useEffect(() => {
    if (userAuth && !tasks) {
      setTasks(weekNumber, true);
    } else if (!userAuth && !tasks) {
      setTasks(weekNumber, false);
    }
  }, [userAuth, tasks, weekNumber, setTasks]);

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

  const handleSave = () => {
    if (temporaryTasks) {
      updateTask(temporaryTasks, !!userAuth);
    }
    setEditTask(false);
  };

  const handleCancel = () => {
    setTemporaryTasks(defaultWeekTasks);
    setEditTask(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        <div className={styles.tasksWrapper}>
          <div>
            <p className={styles.day}>
              Тиждень <span>{weekNumber}</span>
            </p>
          </div>
          <div className={styles.downloadWrapper}>
            <select
              className={styles.selectStyle}
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              disabled={isLoading}>
              <option value="a4">Формат A4</option>
              <option value="letter">Формат Letter</option>
            </select>
            <button
              className={styles.buttonStyle}
              onClick={handleDownloadPDF}
              disabled={isLoading}>
              Завантажити PDF
            </button>
          </div>
          <div className={styles.saveBtnWrapper}>
            {editTask ? (
              <>
                <button
                  className={classNames(
                    styles.buttonStyle,
                    styles.outlineButton
                  )}
                  onClick={handleSave}
                  disabled={isLoading}>
                  Зберегти
                </button>
                <button
                  className={styles.buttonStyle}
                  onClick={handleCancel}
                  disabled={isLoading}>
                  Відмінити
                </button>
              </>
            ) : (
              <button
                className={classNames(styles.buttonStyle, styles.outlineButton)}
                onClick={() => setEditTask(true)}
                disabled={isLoading}>
                Редагувати список
              </button>
            )}
          </div>
        </div>

        {tasks && !isLoading ? (
          <div
            ref={taskListRef}
            className={classNames(styles.taskListWrapper, {
              [styles.enable]: editTask,
              [styles.pdfMode]: pdfMode,
            })}>
            <TaskList
              tasks={editTask ? temporaryTasks : tasks}
              onUpdateTasks={setTemporaryTasks}
            />
          </div>
        ) : (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
      </div>
      <div className={styles.asideContainer}>
        <h3>
          Прогрес тижня <span>{weekNumber}</span>
        </h3>
        <ProgressChart
          total={tasks?.statistics?.totalTasks ?? 0}
          todo={Math.max(
            Number(tasks?.statistics?.totalTasks) -
              Number(tasks?.statistics?.completedTasks),
            0
          )}
          done={tasks?.statistics?.completedTasks ?? 0}
        />
      </div>
    </div>
  );
};

export default PlannerMain;
