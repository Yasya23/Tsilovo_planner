'use client';

import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { filterDays } from '@/features/planning/helpers/filter-days';
import { usePlanningContext } from '../../context/usePlanningContext';
import { isDateToday } from '../../helpers/is-today';
import { WeeklyTasks } from '../../types/task.type';
import { useDragDropHandler } from '../../hooks/useDragDrogHandler';
import { WeekHeader } from '../_parts/week-header/WeekHeader';
import classNames from 'classnames';
import styles from './WeeklyToDo.module.scss';
import { DaySection } from '../_parts/day-section/DaySection';

type WeekProps = {
  weeks: WeeklyTasks[];
};

export const WeeklyTodo = ({ weeks }: WeekProps) => {
  const { activeGoals, updateTask } = usePlanningContext();

  const [isListView, setIsListView] = useState(false);
  const [prioritizeTaskDays, setPrioritizeTaskDays] = useState(false);
  const [isTodayView, setIsTodayView] = useState(false);

  const [weeksData, setWeeksData] = useState<WeeklyTasks[]>(weeks);

  useEffect(() => {
    setWeeksData(weeks);
  }, [weeks]);

  const { handleDragEnd } = useDragDropHandler({
    weeksData,
    setWeeksData,
    updateTask,
    activeGoals,
  });

  const toggleTodayView = () => {
    if (isListView) setIsListView(false);
    if (prioritizeTaskDays) setPrioritizeTaskDays(false);
    setIsTodayView((prev) => !prev);
  };

  return (
    <section className={styles.WeeklyTodo}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {weeksData.map((week) => {
          const tasks = prioritizeTaskDays
            ? filterDays(week)
            : isTodayView
            ? week.filter(({ date }) => isDateToday(date))
            : week;

          return (
            <div
              key={week[0]?.date || 'empty-week'}
              className={styles.WeekContainer}>
              <WeekHeader
                week={week}
                isListView={isListView}
                prioritizeTaskDays={prioritizeTaskDays}
                isTodayView={isTodayView}
                onToggleListView={() => setIsListView((prev) => !prev)}
                onTogglePrioritizeDays={() =>
                  setPrioritizeTaskDays((prev) => !prev)
                }
                onToggleIsTodayView={toggleTodayView}
              />
              <div
                className={classNames(styles.Day, {
                  [styles.listView]: isListView || isTodayView,
                })}>
                {tasks.map(({ date, tasks: dayTasks }) => (
                  <DaySection key={date} date={date} dayTasks={dayTasks} />
                ))}
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </section>
  );
};
