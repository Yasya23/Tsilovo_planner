'use client';

import { useState } from 'react';
import styles from './ManageGoal.module.scss';
import EmojiPickerCompoment from '../emojyPicker/EmojiPicker';
import GoalTaskInput from '@/shared/components/goalTaskInput/GoalTaskInput';
import { Goal } from '../../types/goals.type';
interface ManageGoalsProps {
  goal: Goal | null;
  handleSaveGoal: () => void;
  handleCancelGoal: () => void;
}
const ManageGoals = ({
  goal,
  handleSaveGoal,
  handleCancelGoal,
}: ManageGoalsProps) => {
  const [goalTitle, setGoalTitle] = useState(goal?.title || '');
  const [goalEmoji, setGoalEmoji] = useState(goal?.emoji || '☺︎');

  return (
    <div className={styles.AddGoalForm}>
      <EmojiPickerCompoment
        onEmojiClick={(emoji) => setGoalEmoji(emoji.emoji)}
        emoji={goalEmoji}
      />

      <GoalTaskInput
        value={goalTitle}
        onChange={(e) => setGoalTitle(e.target.value)}
        onSave={handleSaveGoal}
        onCancel={handleCancelGoal}
        placeholder="Add goal title"
        maxLength={50}
      />
    </div>
  );
};

export default ManageGoals;
