'use client';

import { useTranslations } from 'next-intl';

import { Droppable } from '@hello-pangea/dnd';

import { DayHeader } from '@/features/planning/components/tasks/day-header/DayHeader';
import { TasksSection } from '@/features/planning/components/tasks/tasks-section/TasksSection';
import { usePlanningContext } from '@/features/planning/context/usePlanningContext';
import { filterTasksByGoals } from '@/features/planning/helpers/filter-tasks-by-goal';
import { Task } from '@/features/planning/types/task.type';

import styles from './DaySection.module.scss';

interface DaySectionProps {
  date: string;
  dayTasks: Task[];
}

export const DaySection = ({ date, dayTasks }: DaySectionProps) => {
  const { activeGoals } = usePlanningContext();
  const t = useTranslations('Common.planning');

  const { orderedGoals, completedTasksNumber, notCompletedTasksNumber } =
    filterTasksByGoals(dayTasks, activeGoals);

  return (
    <div className={styles.DayWrapper}>
      <div className={styles.Header}>
        <DayHeader
          date={date}
          completedTasks={completedTasksNumber}
          notCompletedTasks={notCompletedTasksNumber}
        />
      </div>
      {orderedGoals.length === 0 ? (
        <p className={styles.NoGoals}>{t('noGoalsMessage')}</p>
      ) : (
        <div className={styles.Goals}>
          {orderedGoals.map((goal) => {
            const goalTasks = dayTasks.filter(
              (task) => task.goalId === goal._id
            );

            return (
              <Droppable
                key={goal._id}
                droppableId={`${goal._id}|${date}`}
                type="task"
              >
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TasksSection
                      goal={goal}
                      goalTasks={goalTasks}
                      date={date}
                      allTasks={dayTasks}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      )}
    </div>
  );
};
