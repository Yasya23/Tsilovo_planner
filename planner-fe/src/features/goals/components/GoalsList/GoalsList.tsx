'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import icons from '@/shared/icons/icons';
import ManageGoals from '../manageGoal/ManageGoal';
import { useGoals } from '../../hooks/useGoals';
import { Goal, CreateGoal } from '../../types/goals.type';
import SkeletonLoader from '@/shared/components/ui/SkeletonLoader';
import { useTranslations } from 'next-intl';
import styles from './GoalsList.module.scss';

const GoalsList = () => {
  const { goals, isLoading, createGoal, updateGoal, deleteGoal } = useGoals();

  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [addingGoal, setAddingGoal] = useState(false);

  const translate = useTranslations('buttons');

  const handleSaveGoal = (goalData: CreateGoal | Goal) => {
    const title = goalData.title.length === 0 ? 'No title' : goalData.title;
    if ('_id' in goalData) {
      updateGoal({ ...goalData, title });
      setEditingGoalId(null);
    } else {
      createGoal({ ...goalData, title, isActive: true });
      setAddingGoal(false);
    }
  };

  const handleCancel = () => {
    setEditingGoalId(null);
    setAddingGoal(false);
  };

  return (
    <section className={styles.Goals}>
      <h1 className={styles.Title}>Goals</h1>

      <div className={styles.Wrapper}>
        {isLoading ? (
          <div className={styles.Skeleton}>
            <SkeletonLoader count={3} width={250} height={20} />
          </div>
        ) : (
          <ul className={styles.GoalsList}>
            {goals?.map((goal) => (
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
                      name={translate('edit')}
                      onClick={() => setEditingGoalId(goal._id)}
                      size="small"
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
        )}

        {goals && goals.length < 3 && !addingGoal && (
          <div className={styles.AddGoal}>
            <IconButtonCustom
              icon={<icons.PlusCircle />}
              name={translate('add goal')}
              onClick={() => setAddingGoal(true)}
              size="small"
            />
            <p className={styles.Description}>{translate('add goal')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoalsList;
