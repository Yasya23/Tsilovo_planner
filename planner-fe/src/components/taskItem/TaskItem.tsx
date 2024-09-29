import { FC, useState } from 'react';
import styles from './task.module.scss';
import { FaEdit, FaTrash } from 'react-icons/fa'; //
import classNames from 'classnames';
import ManageTaskModal from '../forms/manageTask/ManageTask';
import { Task } from '@/types/interfaces/task';

interface TaskItemProps {
  task: Task;
  onEdit?: (_id: string) => void;
  onDelete?: (_id: string) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [editTask, setEditTask] = useState(false);
  const [isChecked, setIsChecked] = useState(task.isCompleted);
  const { priority = '', _id } = task;
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={styles.taskItem}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task._id);
      }}>
      <label htmlFor={_id} className={styles.checkbox}>
        <input
          id={_id}
          type="checkbox"
          checked={!!isChecked}
          onChange={handleCheckboxChange}
        />
      </label>
      <div className={classNames(styles.priority, styles[priority])}></div>
      <div className={styles.taskTitle}>{task.title}</div>

      <div className={styles.actionButtons}>
        {!task.isCompleted && (
          <button
            className={styles.editButton}
            onClick={() => setEditTask(true)}
            title="Редагувати">
            <FaEdit />
          </button>
        )}
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(task._id)}
          title="Видалити">
          <FaTrash />
        </button>
      </div>
      {editTask && (
        <ManageTaskModal
          action="edit"
          heading="Редагувати завдання"
          task={task}
          isOpen={editTask}
          onClose={() => setEditTask(false)}
        />
      )}
    </div>
  );
};

export default TaskItem;
