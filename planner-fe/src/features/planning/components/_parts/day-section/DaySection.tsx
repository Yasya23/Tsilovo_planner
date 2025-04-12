'use client';

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

  const {
    orderedGoals,
    allTasks,
    completedTasksNumber,
    notCompletedTasksNumber,
  } = filterTasks(dayTasks, activeGoals);

  return (
    <div className={styles.DayWrapper}>
      <div className={styles.Header}>
        <DayHeader date={date} completedTasks={completedTasksNumber} notCompletedTasks={ notCompletedTasksNumber} />
      </div>
      <div className={styles.Goals}>
        {orderedGoals.map((goal) => {
          const goalTasks = dayTasks.filter((task) => task.goalId === goal._id);

          return (
            <Droppable
              key={goal._id}
              droppableId={`${goal._id}|${date}`}
              type="task">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TasksSection
                    goal={goal}
                    goalTasks={goalTasks}
                    date={date}
                    allTasks={allTasks}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </div>
  );
};
