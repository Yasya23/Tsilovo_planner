'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Draggable } from '@hello-pangea/dnd';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import icons from '@/shared/icons/icons';

import ManageTask from '@/features/planning/components/tasks/manage-task/ManageTask';
import { ActiveGoal } from '@/features/planning/types/goals.type';
import { CreateTask, Task } from '@/features/planning/types/task.type';

import styles from './TasksSection.module.scss';

interface TasksSectionProps {
  goal: ActiveGoal;
  goalTasks: Task[];
  date: string;
  allTasks: Task[];
}

export const TasksSection = ({
  goal,
  goalTasks,
  date,
  allTasks,
}: TasksSectionProps) => {
  const t = useTranslations('Common');
  const [manageTask, setManageTask] = useState<CreateTask | null>(null);

  const onFinishManage = () => setManageTask(null);

  return (
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

      {manageTask?.goalId === goal._id && manageTask?.date === date && (
        <ManageTask
          task={{
            title: '',
            goalId: goal._id,
            isCompleted: false,
            date,
          }}
          finishManage={onFinishManage}
          focusInput={true}
        />
      )}

      <div className={styles.GoalTasks}>
        {goalTasks.map((task) => {
          const globalIndex = allTasks.findIndex((t) => t._id === task._id);

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
                  <div className={styles.DraggableIcon} role-type="button">
                    <icons.Draggable />
                  </div>

                  <ManageTask task={task} finishManage={onFinishManage} />
                </div>
              )}
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};
