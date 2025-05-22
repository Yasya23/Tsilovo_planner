'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import icons from '@/shared/icons/icons';

import { ManageGoals } from '@/features/planning/components/goals/manage-goal/ManageGoal';
import { limits } from '@/features/planning/constants/limits';
import { useGoalLogic } from '@/features/planning/hooks/useGoals';
import {
  ActiveGoal,
  CreateGoal,
  Goal,
} from '@/features/planning/types/goals.type';

import styles from './GoalsList.module.scss';

type GoalsListProps = {
  activeGoals: ActiveGoal[];
};

export const GoalsList = ({ activeGoals }: GoalsListProps) => {
  const t = useTranslations('Common');
  const { createGoal, updateGoal, deleteGoal, isPending } = useGoalLogic();
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [addingGoal, setAddingGoal] = useState(false);

  const handleSaveGoal = async (goalData: CreateGoal | Goal) => {
    if (!goalData.title.length) return;

    if ('_id' in goalData) {
      updateGoal({ ...goalData });
      setEditingGoalId(null);
    } else {
      createGoal({ ...goalData, isActive: true });
      setAddingGoal(false);
    }
  };

  const handleCancel = () => {
    setEditingGoalId(null);
    setAddingGoal(false);
  };

  return (
    <section className={styles.GoalsWrapper}>
      <h2 className={styles.Subtitle}>{t('planning.goals')}</h2>

      <ul className={styles.GoalsList}>
        {activeGoals?.map((goal) => (
          <li key={goal._id} className={styles.Goal}>
            {editingGoalId === goal._id ? (
              <ManageGoals
                goal={goal}
                onSave={handleSaveGoal}
                onCancel={handleCancel}
                onDelete={() => deleteGoal(goal._id)}
              />
            ) : (
              <div className={styles.Content}>
                <p className={styles.GoalTitle}>
                  <span className={styles.Emoji}>{goal.emoji}</span>
                  {goal.title}
                </p>
                <IconButtonCustom
                  icon={<icons.Edit />}
                  name={t('buttons.edit')}
                  onClick={() => setEditingGoalId(goal._id)}
                  size="small"
                  color="default"
                  disabled={isPending}
                />
              </div>
            )}
          </li>
        ))}

        {addingGoal && (
          <li className={styles.Goal}>
            <ManageGoals
              goal={null}
              onSave={handleSaveGoal}
              onCancel={handleCancel}
            />
          </li>
        )}
      </ul>

      {activeGoals && activeGoals.length < limits.maxGoals && !addingGoal && (
        <div className={styles.AddGoal}>
          <IconButtonCustom
            icon={<icons.PlusCircle />}
            name={t('buttons.addGoal')}
            onClick={() => setAddingGoal(true)}
            size="small"
            disabled={isPending}
          />
          <p className={styles.Description}>{t('buttons.addGoal')}</p>
        </div>
      )}
    </section>
  );
};
