'use client';

import { useState, useRef } from 'react';

import { PlanningInput } from '@/shared/components/ui/planning-input/PlanningInput';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import icons from '@/shared/icons/icons';
import { Dropdown } from '@/shared/components/ui/dropdown/Dropdown';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';
import { CreateTask, Task } from '@/features/planning/types/task.type';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
import toast from 'react-hot-toast';
import { usePlanning } from '../../../hooks/usePlanning';
import styles from './ManageTask.module.scss';

type ManageTaskProps = {
  task: Task | CreateTask;
  finishManage: () => void;
};

export const ManageTask = ({ task, finishManage }: ManageTaskProps) => {
  const t = useTranslations('Common');

  const { createTask, updateTask, deleteTask, isLoading, isError } =
    usePlanning();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [localTask, setLocalTask] = useState<Task | CreateTask>(task);

  const hasId = '_id' in localTask;

  const handleSaveTask = () => {
    if (JSON.stringify(localTask) !== JSON.stringify(task)) {
      if (hasId) {
        updateTask(localTask as Task);
      } else {
        createTask(localTask);
      }
      finishManage();
      inputRef.current?.blur();
    }
    if (isError) {
      toast.error(t('errors.somethingWentWrong'));
    }
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
      className={styles.ManageTaskForm}>
      <fieldset className={styles.Wrapper} disabled={isLoading}>
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
          placeholder={t('placeholders.addTask')}
          maxLength={50}
          inputRef={inputRef}
        />

        <div className={styles.Actions}>
          {hasId ? (
            <Dropdown
              trigger={
                <IconButtonCustom
                  icon={<icons.MoreVertical />}
                  name={t('buttons.menu')}
                  size="small"
                />
              }
              menuItems={[
                {
                  icon: <icons.Trash />,
                  title: `${t('buttons.delete')}`,
                  action: () => {
                    if ('_id' in localTask) deleteTask(localTask._id);
                  },
                  type: 'button',
                },
              ]}
            />
          ) : (
            <div>
              <IconButtonCustom
                icon={<icons.X />}
                name={t('buttons.cancel')}
                size="small"
                onClick={finishManage}
              />
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
};

export default ManageTask;
