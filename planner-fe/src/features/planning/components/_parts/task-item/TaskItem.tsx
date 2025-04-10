'use client';

import { Draggable } from '@hello-pangea/dnd';
import icons from '@/shared/icons/icons';
import ManageTask from '../manage-task/ManageTask';
import styles from './TaskItem.module.scss';
import { Task } from '@/features/planning/types/task.type';

interface TaskItemProps {
  task: Task;
  globalIndex: number;
  onFinishManage: () => void;
}

export const TaskItem = ({
  task,
  globalIndex,
  onFinishManage,
}: TaskItemProps) => {
  return (
    <Draggable draggableId={task._id} index={globalIndex} key={task._id}>
      {(provided) => (
        <div
          className={styles.TaskItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div className={styles.DraggableIcon}>
            <icons.Draggable />
          </div>

          <ManageTask task={task} finishManage={onFinishManage} />
        </div>
      )}
    </Draggable>
  );
};
