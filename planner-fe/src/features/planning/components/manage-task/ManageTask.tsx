'use client';

import { useState, useRef } from 'react';

import { PlanningInput } from '@/shared/components/ui/planning-input/PlanningInput';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import icons from '@/shared/icons/icons';
import Dropdown from '@/shared/components/ui/dropdown/Dropdown';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';
import { CreateTask, Task } from '@/features/planning/types/task.type';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
import { usePlanning } from '../../hooks/usePlanning';
import styles from './index.module.scss';

type ManageTaskProps = {
  task: Task | CreateTask;
  taskIsEdded: () => void;
};

export const ManageTask = ({ task, taskIsEdded }: ManageTaskProps) => {
  const { createTask, updateTask, deleteTask, isLoading, isError } =
    usePlanning();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = useTranslations('Common.buttons');
  const [localTask, setLocalTask] = useState<Task | CreateTask>(task);
  const handleSaveTask = () => {
    if (JSON.stringify(localTask) === JSON.stringify(task)) {
      return;
    }

    if ('_id' in localTask) {
      updateTask(localTask as Task);
    } else {
      createTask(localTask);
    }
    taskIsEdded();
    inputRef.current?.blur();
  };

  const handleCheckboxChange = (task: Task) => {
    updateTask({ ...task, isCompleted: !task.isCompleted });
  };

  useClickOutside(formRef, handleSaveTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveTask();
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className={styles.ManageGoalForm}>
      <fieldset className={styles.Wrapper}>
        <CheckboxCustom
          isCompleted={!!task.isCompleted}
          isDisabled={!task.title}
          handleCheckboxChange={() => handleCheckboxChange(task as Task)}
        />
        <PlanningInput
          value={localTask?.title || ''}
          onChange={(e) =>
            setLocalTask((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Add task"
          maxLength={50}
          inputRef={inputRef}
        />

        <div className={styles.Actions}>
          <Dropdown
            trigger={
              <IconButtonCustom
                icon={<icons.MoreVertical />}
                name={t('menu')}
                size="small"
              />
            }
            menuItems={[
              {
                icon: <icons.Trash />,
                title: `${t('delete')}`,
                action: () => {
                  if ('_id' in localTask) deleteTask(localTask._id);
                },
                type: 'button',
              },
            ]}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ManageTask;
