'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import { FiEdit, FiPlusCircle } from 'react-icons/fi';
import styles from './GoalsList.module.scss';
import ManageGoals from '../manageGoal/ManageGoal';
import { useGoals } from '../../hooks/useGoals';
import { Goal, CreateGoal } from '../../types/goals.type';

const GoalsList = () => {
  const { goals, isLoading, createGoal, updateGoal, deleteGoal } = useGoals();

  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [addingGoal, setAddingGoal] = useState(false);
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

      {/* {goals?.length === 0 && (
        <ManageGoals onSave={handleSaveGoal} onCancel={handleCancel} />
      )} */}

      <div className={styles.List}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          goals?.map((goal) => (
            <ul key={goal._id} className={styles.GoalItem}>
              {editingGoalId === goal._id ? (
                <ManageGoals
                  goal={goal}
                  onSave={(goalData: Goal | CreateGoal) =>
                    handleSaveGoal(goalData)
                  }
                  onCancel={handleCancel}
                  onDelete={() => deleteGoal(goal)}
                />
              ) : (
                <li className={styles.Goal}>
                  <p className={styles.GoalTitle}>
                    <span className={styles.Emoji}>{goal.emoji}</span>
                    {goal.title}
                  </p>
                  <IconButtonCustom
                    icon={<FiEdit />}
                    name="Edit"
                    onClick={() => setEditingGoalId(goal._id)}
                    size="small"
                  />
                </li>
              )}
            </ul>
          ))
        )}

        {goals && goals.length < 3 && !addingGoal && (
          <div className={styles.AddGoal}>
            <IconButtonCustom
              icon={<FiPlusCircle />}
              name="Add goal"
              size="small"
              onClick={() => setAddingGoal(true)}
            />
            <p className={styles.Description}>Додати ціль</p>
          </div>
        )}

        {addingGoal && (
          <ManageGoals
            goal={null}
            onSave={handleSaveGoal}
            onCancel={handleCancel}
          />
        )}
      </div>
    </section>
  );
};

export default GoalsList;
