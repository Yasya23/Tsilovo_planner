'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Draggable, Droppable } from '@hello-pangea/dnd';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import icons from '@/shared/icons/icons';

import { DayHeader } from '@/features/planning/components/tasks/day-header/DayHeader';
import { ManageTask } from '@/features/planning/components/tasks/manage-task/ManageTask';
import { limits } from '@/features/planning/constants/limits';
import { filterTasksByGoals } from '@/features/planning/helpers/filter-tasks-by-goal';
import { usePlanning } from '@/features/planning/hooks/usePlanning';
import { useTask } from '@/features/planning/hooks/useTasks';
import { CreateTask, Task } from '@/features/planning/types/task.type';

import styles from './DaySection.module.scss';

interface DaySectionProps {
  date: string;
  dayTasks: Task[];
}

export const DaySection = ({ date, dayTasks }: DaySectionProps) => {
  const { activeGoals } = usePlanning();
  const { updateTask, createTask, deleteTask, isCreatingTask, isUpdatingTask } =
    useTask();
  const t = useTranslations('Common');

  const [manageTask, setManageTask] = useState<CreateTask | null>(null);

  const { orderedGoals, completedTasksNumber, notCompletedTasksNumber } =
    filterTasksByGoals(dayTasks, activeGoals);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const hasId = (task: Task | CreateTask) => '_id' in task;

  const handleSaveTask = async (task: Task | CreateTask) => {
    if (hasId(task)) {
      setEditingTaskId(task._id);
      try {
        await updateTask(task);
      } finally {
        setEditingTaskId(null);
      }
    } else {
      await createTask(task);
      if (!isCreatingTask) setManageTask(null);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    deleteTask(task._id);
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
                        {dayTasks.length <= limits.maxTasksPerDayForGoal && (
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
                        )}
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
                            isPending={isCreatingTask}
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
                                    deleteTask={handleDeleteTask}
                                    handleSaveTask={handleSaveTask}
                                    isPending={
                                      isUpdatingTask &&
                                      editingTaskId === task._id
                                    }
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
