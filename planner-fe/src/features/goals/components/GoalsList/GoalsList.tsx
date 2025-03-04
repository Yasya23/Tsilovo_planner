'use client';

import { useState } from 'react';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import styles from './GoalsList.module.scss';
import ManageGoals from '../manageGoal/ManageGoal';
import { useGoals } from '../../hooks/useGoals';

const GoalsList = () => {
  const { goals, isLoading, createGoal, deleteGoal } = useGoals();

  const [addGoal, setAddGoal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalEmoji, setGoalEmoji] = useState('☺︎');

  const handleSaveGoal = () => {
    createGoal({ title: goalTitle.trim(), emoji: goalEmoji, isActive: true });
    setGoalTitle('');
    setGoalEmoji('☺︎');
    setAddGoal(false);
  };

  const handleCancelGoal = () => {
    setGoalTitle('');
    setGoalEmoji('☺︎');
    setAddGoal(false);
  };

  return (
    <section className={styles.Goals}>
      <h1 className={styles.Title}>Goals</h1>
      <ManageGoals
        goal={null}
        handleSaveGoal={handleSaveGoal}
        handleCancelGoal={handleCancelGoal}
      />
      <div className={styles.GoalList}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          goals?.map((goal) => (
            <div key={goal._id} className={styles.GoalItem}>
              <span className={styles.Emoji}>{goal.emoji}</span>
              <span className={styles.GoalTitle}>{goal.title}</span>

              <IconButtonCustom
                icon={<FiTrash2 />}
                name="Delete goal"
                onClick={() => deleteGoal(goal)}
                size="small"
              />
            </div>
          ))
        )}
        {goals && goals.length < 3 && (
          <div className={styles.AddGoal}>
            <IconButtonCustom
              icon={<FiPlusCircle />}
              name="Add goal"
              size="small"
              onClick={() => setAddGoal(true)}
            />
            <p className={styles.Description}>Додати ціль</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoalsList;
