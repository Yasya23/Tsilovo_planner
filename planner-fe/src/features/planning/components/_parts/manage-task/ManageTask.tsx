'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { IconButtonCustom } from '@/shared/components/ui/buttons/IconButton';
import CheckboxCustom from '@/shared/components/ui/Checkbox';
import { Dropdown } from '@/shared/components/ui/dropdown/Dropdown';
import { PlanningInput } from '@/shared/components/ui/planning-input/PlanningInput';
import { isObjectTheSame } from '@/shared/helpers/is-object-the-same';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';
import icons from '@/shared/icons/icons';

import { usePlanningContext } from '@/features/planning/context/usePlanningContext';
import { CreateTask, Task } from '@/features/planning/types/task.type';

import styles from './ManageTask.module.scss';

type ManageTaskProps = {
  task: Task | CreateTask;
  finishManage: () => void;
};

export const ManageTask = ({ task, finishManage }: ManageTaskProps) => {
  const t = useTranslations('Common');
  const { updateTask, createTask, deleteTask } = usePlanningContext();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [localTask, setLocalTask] = useState<Task | CreateTask>(task);

  const hasId = '_id' in localTask;

  const handleSaveTask = () => {
    if (!isObjectTheSame(localTask, task)) {
      console.log('ManageTask');

      if (hasId) {
        updateTask(localTask);
      } else {
        createTask(localTask);
      }
      finishManage();
      inputRef.current?.blur();
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
      className={styles.ManageTaskForm}
    >
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
          placeholder={t('placeholders.addTask')}
          maxLength={50}
          isCompleted={task.isCompleted}
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
