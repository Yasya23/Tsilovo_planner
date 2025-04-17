'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { IconButtonCustom } from '@/shared/components/ui/buttons/IconButton';
import SkeletonLoader from '@/shared/components/ui/SkeletonLoader';
import icons from '@/shared/icons/icons';

import { ActiveGoal, CreateGoal, Goal } from '../../types/goals.type';
import ManageGoals from '../_parts/manage-goal/ManageGoal';
import styles from './GoalsList.module.scss';

type GoalsListProps = {
  activeGoals: ActiveGoal[];
  createGoal: (goal: CreateGoal) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goal: Goal) => void;
};

export const GoalsList = ({
  activeGoals,
  createGoal,
  updateGoal,
  deleteGoal,
}: GoalsListProps) => {
  const t = useTranslations('Common');

  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [addingGoal, setAddingGoal] = useState(false);

  const handleSaveGoal = (goalData: CreateGoal | Goal) => {
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
                onDelete={() => deleteGoal(goal)}
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

      {activeGoals && activeGoals.length < 5 && !addingGoal && (
        <div className={styles.AddGoal}>
          <IconButtonCustom
            icon={<icons.PlusCircle />}
            name={t('buttons.addGoal')}
            onClick={() => setAddingGoal(true)}
            size="small"
          />
          <p className={styles.Description}>{t('buttons.addGoal')}</p>
        </div>
      )}
    </section>
  );
};
