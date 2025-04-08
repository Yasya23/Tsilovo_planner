'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import icons from '@/shared/icons/icons';
import { useTranslations } from 'next-intl';
import { CreateTask, WeeklyTasks } from '../../../types/task.type';
import { ActiveGoal } from '../../../types/goals.type';
import ManageTask from '../manage-task/ManageTask';
import { filterTasks } from '../../../helpers/filter-tasks';

import styles from './index.module.scss';
import classNames from 'classnames';

interface WeeklyListProps {
  tasks: WeeklyTasks;
  activeGoals: ActiveGoal[];
  isListView: boolean;
}

export const WeeklyList = ({
  tasks = [],
  activeGoals = [],
  isListView = false,
}: WeeklyListProps) => {
  const t = useTranslations('Common');

  const [manageTask, setManageTask] = useState<CreateTask | null>(null);

  return (
    <div className={classNames(styles.Day, { [styles.listView]: isListView })}>
      {tasks.map(({ date, tasks }, index) => {
        const { goalsWithTasks, goalsWithoutTasks } = filterTasks(
          tasks,
          activeGoals
        );

        return (
          <div key={date} className={styles.DayWrapper}>
            <div className={styles.Header}>
              <h3 className={styles.HeaderTitle}>
                {t(`days.${index}`)}
                <span> {new Date(date).getDate()}</span>
              </h3>
            </div>

            <div className={styles.Goals}>
              {[...goalsWithTasks, ...goalsWithoutTasks].map((goal) => {
                const goalTasks = tasks.filter(
                  (task) => task.goalId === goal._id
                );
                return (
                  <div key={goal._id} className={styles.Goal}>
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
                          finishManage={() => setManageTask(null)}
                        />
                      )}
                    <div className={styles.GoalTasks}>
                      {goalTasks.map((task) => (
                        <div className={styles.TaskItem} key={task._id}>
                          <icons.Draggable />

                          <ManageTask
                            task={task}
                            finishManage={() => setManageTask(null)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyList;
