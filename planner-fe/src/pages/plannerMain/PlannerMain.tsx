'use client';

import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';
import Spinner from '@/components/spinner/Spinner';
import TaskList from '@/components/taskList/TaskList';
import SelectCustom from '@/components/select/Select';
import IconButtonCustom from '@/components/buttons/iconButton/IconButton';
import TooltipCustom from '@/components/Tooltip';

import { useAuthStore, useTaskStore } from '@/store';
import { weekCalculate } from '@/utils';
import { defaultWeekTasks } from '@/constants/defaultWeekTasks';
import { WeekTasks } from '@/types/tasks.type';
import classNames from 'classnames';
import styles from './main.module.scss';

const PdfFormats = [
  { label: 'Letter Size', value: 'letter' },
  { label: 'A4', value: 'a4' },
];

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

  if (isLoading) {
    <div className={styles.container}>
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
      ;
    </div>;
  }
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
            <SelectCustom
              value={format}
              onChange={setFormat}
              options={PdfFormats}
              helper="Вибрати PDF формат"
              format="standard"
              disabled={isLoading}
            />

            <IconButtonCustom type="download" onClick={handleDownloadPDF} />
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
          <div className=""></div>
        )}
      </div>
    </div>
  );
};

export default PlannerMain;
