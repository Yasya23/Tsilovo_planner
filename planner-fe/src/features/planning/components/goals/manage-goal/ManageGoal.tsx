'use client';

import { useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { IconButtonCustom } from '@/shared/components/buttons/IconButton';
import { Dropdown } from '@/shared/components/dropdown-custom/Dropdown';
import { PlanningInput } from '@/shared/components/planning-input/PlanningInput';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';
import icons from '@/shared/icons/icons';

import { EmojiPickerCompoment } from '@/features/planning/components/goals/emojy-picker/EmojiPicker';
import { isObjectTheSame } from '@/features/planning/helpers/is-object-the-same';
import {
  ActiveGoal,
  CreateGoal,
  Goal,
} from '@/features/planning/types/goals.type';

import styles from './ManageGoal.module.scss';

type ManageGoalsProps = {
  goal: ActiveGoal | null;
  onSave: (goal: Goal | CreateGoal) => void;
  onCancel: () => void;
  onDelete?: (goal: Goal) => void;
};

export const defaultGoal: CreateGoal = {
  title: '',
  emoji: '@',
  isActive: true,
};

export const ManageGoals = ({
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
  const handleGoal = () => {
    if (
      !isObjectTheSame(localGoal, defaultGoal) &&
      !isObjectTheSame(localGoal, goal)
    ) {
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
      ref={formRef}
    >
      <div className={styles.EmojyPickerWrapper}>
        <button
          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          className={styles.EmojiButton}
          type="button"
        >
          {localGoal.emoji || defaultGoal.emoji}
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
        placeholder={t('placeholders.addGoal')}
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
              title: !!goal?.pendingTasks
                ? t('planning.forbiddenDeleteTask')
                : t('buttons.delete'),
              action: () => {
                if ('_id' in localGoal && onDelete) onDelete(localGoal as Goal);
              },
              type: !!goal?.pendingTasks ? 'message' : 'button',
            },
          ]}
        />
      </div>
    </form>
  );
};
