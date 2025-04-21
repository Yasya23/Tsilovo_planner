'use client';

import { useOptimistic, useState, useTransition } from 'react';

import { DragDropContext } from '@hello-pangea/dnd';
import classNames from 'classnames';

import { DaySection } from '@/features/planning/components/_parts/day-section/DaySection';
import { WeekHeader } from '@/features/planning/components/_parts/week-header/WeekHeader';
import { usePlanningContext } from '@/features/planning/context/usePlanningContext';
import { filterDays } from '@/features/planning/helpers/filter-days';
import { isDateToday } from '@/features/planning/helpers/is-today';
import { useDragDropHandler } from '@/features/planning/hooks/useDragDrogHandler';
import { WeeklyTasks } from '@/features/planning/types/task.type';

import styles from './WeeklyToDo.module.scss';

type WeekProps = {
  weeks: WeeklyTasks[];
};

export const WeeklyTodo = ({ weeks }: WeekProps) => {
  const { activeGoals, updateTask } = usePlanningContext();

  const [isListView, setIsListView] = useState(false);
  const [prioritizeTaskDays, setPrioritizeTaskDays] = useState(false);
  const [isTodayView, setIsTodayView] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [optimisticWeeks, addOptimisticWeeks] = useOptimistic(
    weeks,
    (_, newWeeks: WeeklyTasks[]) => newWeeks
  );

  const { handleDragEnd } = useDragDropHandler({
    weeksData: optimisticWeeks,
    addOptimistic: (weeksData: WeeklyTasks[]) => {
      startTransition(() => {
        addOptimisticWeeks(weeksData);
      });
    },
    // updateTask: (weeksData, task) => {
    //   startTransition(() => {
    //     addOptimisticWeeks(weeksData);
    //   });
    //   if (JSON.stringify(weeksData) !== JSON.stringify(optimisticWeeks)) {
    //     updateTask(task);
    //   }
    // },
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
        {optimisticWeeks.map((week) => {
          const tasks = prioritizeTaskDays
            ? filterDays(week)
            : isTodayView
              ? week.filter(({ date }) => isDateToday(date))
              : week;

          return (
            <div
              key={week[0]?.date || 'empty-week'}
              className={styles.WeekContainer}
            >
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
                })}
              >
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
