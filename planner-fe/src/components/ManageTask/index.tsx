import * as React from 'react';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Theme } from '@mui/material/styles';

import { useTaskStore } from '@/store';
import MoodSelector from '@/components/moodSelector/MoodSelector';
import IconButtonCustom from '@/components/buttons/iconButton/IconButton';
import CheckboxCustom from '../Checkbox';
import SelectCustom from '../Select';

import styles from './ManageTasks.module.scss';
import ButtonCustom from '../buttons/Button';

const goals = [
  { label: 'Ціль', value: '0' },
  {
    label: '1',
    value: '1',
  },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

interface Task {
  id: number;
  title: string;
  goal: string;
  time: number;
}

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const ManageTasks = ({ open, handleClose }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: '', goal: '0', time: 0 },
    { id: 2, title: '', goal: '0', time: 0 },
    { id: 3, title: '', goal: '0', time: 0 },
  ]);

  const handleTaskChange = (
    id: number,
    key: keyof Task,
    value: string | number
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, [key]: value } : task))
    );
  };

  const handleSave = () => {
    console.log('Saving tasks:', tasks);
    // Save logic here
    handleClose();
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <MoodSelector />
        {tasks.map((task) => (
          <div key={task.id} className={styles.TaskItem}>
            <CheckboxCustom
              isCompleted={false}
              isDisabled={false}
              handleCheckboxChange={() => {}}
            />

            <TextField
              variant="standard"
              placeholder="Add the task"
              fullWidth
              value={task.title}
              onChange={(e) =>
                handleTaskChange(task.id, 'title', e.target.value)
              }
            />

            <SelectCustom
              value={task.goal}
              options={goals}
              minSize={100}
              onChange={(value) => handleTaskChange(task.id, 'goal', value)}
            />

            <IconButtonCustom type="trash" size="small" onClick={handleClose} />
          </div>
        ))}

        <div className={styles.closeButton}>
          <IconButtonCustom type="close" onClick={handleClose} />
        </div>

        <div className={styles.Buttons}>
          <ButtonCustom name="Відмінити" style="outlined" />
          <ButtonCustom name="Зберегти" />
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
