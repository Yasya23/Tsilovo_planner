'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';
import TaskList from '@/features/tasks/taskList/TaskList';
import SelectCustom from '@/shared/components/ui/Select';
import IconButtonCustom from '@/shared/components/ui/buttons/iconButton/IconButton';

import { useTaskStore } from '@/shared/store';
import Layout from './layout';

import styles from './Planner.module.scss';

const PdfFormats = [
  { label: 'Letter Size', value: 'letter' },
  { label: 'A4', value: 'a4' },
];

export const Planner = () => {
  const { isLoading, setPdfMode, pdfMode } = useTaskStore();

  const [format, setFormat] = useState('a4');

  const handleDownloadPDF = () => {
    // if (!taskListRef.current) return;

    setPdfMode(true);

    const options = {
      filename: `Планувальник_${dayjs().format('YYYY-MM-DD')}.pdf`,
      jsPDF: { unit: 'mm', format },
    };

    // html2pdf()
    //   .set(options)
    //   .from(taskListRef.current)
    //   .save()
    //   .finally(() => setPdfMode(false));
  };

  return (
    <Layout>
      <div className={styles.Container}>
        <div className={styles.Top}>
          <div className={styles.WeekDates}>Тиждень</div>
          <div className={styles.Download}>
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
        <TaskList />
      </div>
    </Layout>
  );
};

export default Planner;
