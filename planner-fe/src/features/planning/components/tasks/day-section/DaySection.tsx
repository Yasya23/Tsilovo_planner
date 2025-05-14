'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Draggable, Droppable } from '@hello-pangea/dnd';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import icons from '@/shared/icons/icons';

import { DayHeader } from '@/features/planning/components/tasks/day-header/DayHeader';
import { ManageTask } from '@/features/planning/components/tasks/manage-task/ManageTask';
import { usePlanningContext } from '@/features/planning/context/usePlanningContext';
import { filterTasksByGoals } from '@/features/planning/helpers/filter-tasks-by-goal';
import { CreateTask, Task } from '@/features/planning/types/task.type';

import styles from './DaySection.module.scss';

interface DaySectionProps {
  date: string;
  dayTasks: Task[];
}

export const DaySection = ({ date, dayTasks }: DaySectionProps) => {
  const { activeGoals, updateTask, createTask, deleteTask, isPending } =
    usePlanningContext();
  const t = useTranslations('Common');
  const [manageTask, setManageTask] = useState<CreateTask | null>(null);

  const { orderedGoals, completedTasksNumber, notCompletedTasksNumber } =
    filterTasksByGoals(dayTasks, activeGoals);

  const handleSaveTask = (task: Task | CreateTask) => {
    if ('_id' in task) {
      updateTask(task);
    } else {
      createTask(task);
      setManageTask(null);
    }
  };

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
        <p className={styles.NoGoals}>{t('planning.noGoalsMessage')}</p>
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
                    <div className={styles.Goal}>
                      <div className={styles.GoalHeader}>
                        <h4 className={styles.GoalTitle}>
                          {goal.emoji} {goal.title}
                        </h4>
                        <IconButtonCustom
                          icon={<icons.PlusCircle />}
                          name={t('buttons.addTask')}
                          onClick={() =>
                            setManageTask({
                              date,
                              goalId: goal._id,
                            } as CreateTask)
                          }
                          size="small"
                        />
                      </div>

                      {manageTask?.goalId === goal._id &&
                        manageTask?.date === date && (
                          <ManageTask
                            task={{
                              title: '',
                              goalId: goal._id,
                              isCompleted: false,
                              date,
                            }}
                            deleteTask={deleteTask}
                            isPending={isPending}
                            handleSaveTask={handleSaveTask}
                            finishManage={() => setManageTask(null)}
                          />
                        )}

                      <div className={styles.GoalTasks}>
                        {goalTasks.map((task) => {
                          const globalIndex = dayTasks.findIndex(
                            (t) => t._id === task._id
                          );

                          return (
                            <Draggable
                              draggableId={task._id}
                              index={globalIndex}
                              key={task._id}
                            >
                              {(provided) => (
                                <div
                                  className={styles.TaskItem}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={styles.DraggableIcon}
                                    role-type="button"
                                  >
                                    <icons.Draggable />
                                  </div>

                                  <ManageTask
                                    task={task}
                                    deleteTask={deleteTask}
                                    handleSaveTask={handleSaveTask}
                                    isPending={isPending}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      </div>
                    </div>
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
