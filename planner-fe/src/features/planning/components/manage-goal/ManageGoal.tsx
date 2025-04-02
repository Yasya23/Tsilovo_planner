'use client';

import { useState, useRef } from 'react';
import EmojiPickerCompoment from '../emojy-picker/EmojiPicker';

import { PlanningInput } from '@/shared/components/ui/planning-input/PlanningInput';
import { Goal, CreateGoal, ActiveGoal } from '../../types/goals.type';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import icons from '@/shared/icons/icons';
import { Dropdown } from '@/shared/components/ui/dropdown/Dropdown';
import { useTranslations } from 'next-intl';
import styles from './index.module.scss';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';

type ManageGoalsProps = {
  goal: ActiveGoal;
  onSave: (goal: Goal | CreateGoal) => void;
  onCancel: () => void;
  onDelete?: (goal: Goal) => void;
};

export const defaultGoal: CreateGoal = {
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
  const t = useTranslations('Common');

  const formRef = useRef<HTMLFormElement>(null);
  const [localGoal, setLocalGoal] = useState<Goal | CreateGoal>(
    goal || defaultGoal
  );
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  console.log(localGoal);
  const handleGoal = () => {
    if (JSON.stringify(localGoal) !== JSON.stringify(defaultGoal)) {
      onSave(localGoal);
    } else {
      onCancel();
    }
  };
  useClickOutside(formRef, handleGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGoal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.ManageGoalForm}
      ref={formRef}>
      <div className={styles.EmojyPickerWrapper}>
        <button
          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          className={styles.EmojiButton}
          type="button">
          {localGoal.emoji || '@'}
        </button>
        {isEmojiPickerOpen && (
          <EmojiPickerCompoment
            onEmojiClick={({ emoji }) => {
              setLocalGoal((prev) => ({ ...prev, emoji: emoji }));
              setIsEmojiPickerOpen(false);
            }}
            handleClickOuside={() => setIsEmojiPickerOpen(false)}
          />
        )}
      </div>

      <PlanningInput
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
          name={t('buttons.save')}
          type="submit"
          size="small"
        />

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
              title: !!goal.pendingTasks
                ? t('notifications.forbiddenDeleteTask')
                : t('buttons.delete'),
              action: () => {
                if ('_id' in localGoal && onDelete) onDelete(localGoal as Goal);
              },
              type: !!goal.pendingTasks ? 'message' : 'button',
            },
          ]}
        />
      </div>
    </form>
  );
};

export default ManageGoals;
