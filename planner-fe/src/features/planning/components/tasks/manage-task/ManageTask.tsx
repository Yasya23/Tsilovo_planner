'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import classNames from 'classnames';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import CheckboxCustom from '@/shared/components/Checkbox';
import { Dropdown } from '@/shared/components/dropdown-custom/Dropdown';
import { PlanningInput } from '@/shared/components/planning-input/PlanningInput';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';
import icons from '@/shared/icons/icons';

import { isObjectTheSame } from '@/features/planning/helpers/is-object-the-same';
import { CreateTask, Task } from '@/features/planning/types/task.type';

import styles from './ManageTask.module.scss';

type ManageTaskProps = {
  task: Task | CreateTask;
  finishManage?: () => void;
  deleteTask?: (task: Task) => void;
  handleSaveTask: (task: Task | CreateTask) => void;
  isPending: boolean;
};

export const ManageTask = ({
  task,
  finishManage,
  deleteTask,
  isPending,
  handleSaveTask,
}: ManageTaskProps) => {
  const t = useTranslations('Common');

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [localTask, setLocalTask] = useState<Task | CreateTask>(task);

  const hasId = '_id' in localTask;
  const saveTask = () => {
    if (isObjectTheSame(localTask, task)) return;
    handleSaveTask(localTask);
    inputRef?.current?.blur();
  };

  const handleCheckboxChange = () => {
    const updatedTask = {
      ...localTask,
      isCompleted: !localTask.isCompleted,
    } as Task;

    setLocalTask(updatedTask);
    handleSaveTask(updatedTask);
  };

  useClickOutside(formRef, saveTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTask();
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className={classNames(styles.ManageTaskForm, {
        [styles.Pending]: isPending,
      })}
    >
      <fieldset className={styles.Wrapper}>
        <CheckboxCustom
          isCompleted={!!localTask.isCompleted}
          isDisabled={!localTask.title || isPending}
          handleCheckboxChange={handleCheckboxChange}
        />
        <PlanningInput
          value={localTask?.title || ''}
          onChange={(e) =>
            setLocalTask((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder={t('placeholders.addTask')}
          maxLength={50}
          isCompleted={localTask.isCompleted}
          inputRef={inputRef}
          autoFocus={!hasId}
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
                  action: () => deleteTask && deleteTask(localTask as Task),
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
