'use client';

import { useState } from 'react';
import Input from '@/components/input/Input';
import classNames from 'classnames';
import { Task } from '@/types/tasks.type';

import styles from './manageTask.module.scss';
interface ManageTaskModalProps {
  task?: Task;
  action: string;
  isOpen: boolean;
  heading: string;
  onClose: () => void;
}

export const ManageTask = ({
  action,
  task,
  heading,
  isOpen,
  onClose,
}: ManageTaskModalProps) => {
  const [title, setTitle] = useState(task?.title || '');
  const [priority, setPriority] = useState(task?.priority || '');

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask = { ...task, title, priority };
    // onSave(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {action === 'edit' && !task ? (
          <>
            <div>
              Вибачте, виникла помилка при отриманні данних для редагування :(
            </div>
            <button
              type="button"
              onClick={onClose}
              className={classNames(styles.closeButton, styles.outlineBorder)}>
              <span>x</span>
            </button>
          </>
        ) : (
          <>
            <h2>{heading}</h2>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Напишіть завдання"
                label="Завдання"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <label htmlFor="priority">Важливість</label>
                <select
                  id="priority"
                  value={priority || ''}
                  className={styles[priority]}
                  onChange={handlePriorityChange}>
                  <option value="">Не зазначено</option>
                  <option value="high">Висока</option>
                  <option value="medium">Середня</option>
                  <option value="low">Низька</option>
                </select>
              </div>
              <button type="submit" className={styles.outlineBorder}>
                Зберегти
              </button>
            </form>
            <button
              type="button"
              onClick={onClose}
              className={classNames(styles.closeButton, styles.outlineBorder)}>
              <span>x</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageTask;
