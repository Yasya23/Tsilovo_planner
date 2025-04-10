'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DragDropContext } from '@hello-pangea/dnd';
import { createTitle } from '@/features/planning/helpers/create-week-title';
import { filterDays } from '@/features/planning/helpers/filter-days';
import { WeeklyList } from '@/features/planning/components/_parts/weekly-task-list/WeeklyList';
import { Task, WeeklyTasks } from '../../types/task.type';
import { ActiveGoal } from '../../types/goals.type';
import { useDragDropHandler } from '../../hooks/useDragDrogHandler';
import { WeekHeader } from '../_parts/week-header/WeekHeader';

import styles from './WeeklyToDo.module.scss';

type WeekProps = {
  currentWeek: WeeklyTasks;
  nextWeek: WeeklyTasks | null;
  activeGoals: ActiveGoal[];
  createTask?: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask?: (taskId: string) => void;
};

export const WeeklyTodo = ({
  currentWeek,
  nextWeek,
  activeGoals,
  updateTask,
  createTask,
  deleteTask,
}: WeekProps) => {
  const t = useTranslations('Common');
  const [isListView, setIsListView] = useState(false);
  const [prioritizeTaskDays, setPrioritizeTaskDays] = useState(false);
  const [weeksData, setWeeksData] = useState<WeeklyTasks[]>(
    nextWeek ? [currentWeek, nextWeek] : [currentWeek]
  );

  const { handleDragEnd } = useDragDropHandler({
    weeksData,
    setWeeksData,
    updateTask,
    activeGoals,
  });

  return (
    <section className={styles.WeeklyTodo}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {weeksData.map((week) => (
          <div
            key={week[0]?.date || 'empty-week'}
            className={styles.WeekContainer}>
            <WeekHeader
              title={createTitle(week, t)}
              isListView={isListView}
              prioritizeTaskDays={prioritizeTaskDays}
              onToggleListView={() => setIsListView((prev) => !prev)}
              onTogglePrioritizeDays={() =>
                setPrioritizeTaskDays((prev) => !prev)
              }
            />
            <WeeklyList
              tasks={prioritizeTaskDays ? filterDays(week) : week}
              activeGoals={activeGoals}
              isListView={isListView}
            />
          </div>
        ))}
      </DragDropContext>
    </section>
  );
};

export default WeeklyTodo;
