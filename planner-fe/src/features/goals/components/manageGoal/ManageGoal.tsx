'use client';

import { useState } from 'react';
import EmojiPickerCompoment from '../emojyPicker/EmojiPicker';
import { EmojiClickData } from 'emoji-picker-react';
import GoalTaskInput from '@/shared/components/ui/goalTaskInput/GoalTaskInput';
import { Goal, CreateGoal } from '../../types/goals.type';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import icons from '@/shared/icons/icons';
import Dropdown from '@/shared/components/ui/dropdown/Dropdown';
import { MenuItem } from '@/shared/components/ui/dropdown/Dropdown';

import styles from './ManageGoal.module.scss';

interface ManageGoalsProps {
  goal: Goal | null;
  onSave: (goal: Goal | CreateGoal) => void;
  onCancel: () => void;
  onDelete?: (goal: Goal) => void;
}

const defaultGoal: CreateGoal = {
  title: '',
  emoji: '@',
  isActive: true,
};

const ManageGoals = ({
  goal,
  onSave,
  onCancel,
  onDelete,
}: ManageGoalsProps) => {
  const [localGoal, setLocalGoal] = useState<Goal | CreateGoal>(
    goal || defaultGoal
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localGoal);
  };

  const generateMenu = () => {
    const menu: MenuItem[] = [
      {
        icon: <icons.X />,
        title: 'Cancel',
        action: onCancel,
        type: 'button',
      },
    ];

    if ('_id' in localGoal && onDelete) {
      menu.push(
        {
          type: 'divider',
        },
        {
          icon: <icons.Trash />,
          title: 'Delete',
          action: () => onDelete(localGoal as Goal),
          type: 'button',
        }
      );
    }

    return menu;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.ManageGoalForm}>
      <EmojiPickerCompoment
        onEmojiClick={({ emoji }: EmojiClickData) => {
          console.log(1, emoji);
          setLocalGoal((prev) => ({ ...prev, emoji: emoji }));
        }}
        emoji={localGoal.emoji || '@'}
      />
      <GoalTaskInput
        value={localGoal.title}
        onChange={(e) =>
          setLocalGoal((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Add goal title"
        maxLength={50}
      />

      <div className={styles.Actions}>
        <IconButtonCustom
          icon={<icons.Save />}
          name="Save"
          type="submit"
          size="small"
        />

        <Dropdown
          trigger={
            <IconButtonCustom
              icon={<icons.MoreVertical />}
              name="More"
              size="small"
            />
          }
          menuItems={generateMenu()}
        />
      </div>
    </form>
  );
};

export default ManageGoals;
