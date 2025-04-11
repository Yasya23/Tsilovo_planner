'use client';

import { ActiveGoal } from '../../../types/goals.type';
import { filterTasks } from '../../../helpers/filter-tasks';
import { Droppable } from '@hello-pangea/dnd';
import { DayHeader } from '../day-header/DayHeader';
import { TasksSection } from '../tasks-section/TasksSection';
import { Task } from '@/features/planning/types/task.type';
import { usePlanningContext } from '@/features/planning/context/usePlanningContext';

import styles from './DaySection.module.scss';

interface DaySectionProps {
  date: string;
  dayTasks: Task[];
}

export const DaySection = ({ date, dayTasks }: DaySectionProps) => {
  const { activeGoals } = usePlanningContext();

  const { goalsWithTasks, goalsWithoutTasks } = filterTasks(
    dayTasks,
    activeGoals
  );

  const allTasks = [...goalsWithTasks, ...goalsWithoutTasks].flatMap((goal) =>
    dayTasks.filter((task) => task.goalId === goal._id)
  );

  return (
    <div className={styles.DayWrapper}>
      <DayHeader date={date} />
      <Droppable droppableId={date}>
        {(provided) => (
          <div
            className={styles.Goals}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {[...goalsWithTasks, ...goalsWithoutTasks].map((goal) => {
              const goalTasks = dayTasks.filter(
                (task) => task.goalId === goal._id
              );
              return (
                <TasksSection
                  key={goal._id}
                  goal={goal}
                  goalTasks={goalTasks}
                  date={date}
                  allTasks={allTasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
