'use client';

import { useState, useRef } from 'react';
import EmojiPickerCompoment from '../emojy-picker/EmojiPicker';

import { PlanningInput } from '@/shared/components/ui/planning-input/PlanningInput';
import { Goal, CreateGoal } from '../../types/goals.type';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';
import icons from '@/shared/icons/icons';
import Dropdown from '@/shared/components/ui/dropdown/Dropdown';
import { MenuItem } from '@/shared/components/ui/dropdown/Dropdown';
import { useTranslations } from 'next-intl';
import styles from './index.module.scss';
import { useClickOutside } from '@/shared/hooks/ useClickOutside';

type ManageGoalsProps = {
  goal: Goal | null;
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
  const t = useTranslations('Common.buttons');

  const formRef = useRef<HTMLFormElement>(null);
  const [localGoal, setLocalGoal] = useState<Goal | CreateGoal>(
    goal || defaultGoal
  );
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

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

  const generateMenu = () => {
    const menu: MenuItem[] = [
      {
        icon: <icons.X />,
        title: `${t('cancel')}`,
        action: onCancel,
        type: 'button',
      },
    ];

    if ('id' in localGoal && onDelete) {
      menu.push(
        {
          type: 'divider',
        },
        {
          icon: <icons.Trash />,
          title: `${t('delete')}`,
          action: () => onDelete(localGoal as Goal),
          type: 'button',
        }
      );
    }

    return menu;
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
          name={t('save')}
          type="submit"
          size="small"
        />

        <Dropdown
          trigger={
            <IconButtonCustom
              icon={<icons.MoreVertical />}
              name={t('menu')}
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
