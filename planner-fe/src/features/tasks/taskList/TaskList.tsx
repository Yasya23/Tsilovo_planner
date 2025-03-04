'use client';

import styles from './TaskList.module.scss';
import TaskItem from '../ManageTask/TaskItem';
import IconButtonCustom from '@/shared/components/ui/buttons/IconButton';

import { FiEdit } from 'react-icons/fi';

const tasks = {
  dailyTasks: [
    {
      day: 'Monday',
      tasks: [
        { id: '1', title: 'Complete project proposal', isCompleted: false },
        {
          id: '2',
          title: 'mgkrejgeklrfwff  klekwlqeklrkel jrkjtwelkrlwe orsktoelk',
          isCompleted: true,
        },
        {
          id: '3',
          title: 'mgkrejgeklrfwk lekwlqeklrkel jrkjtwe lkrlwe orktoelk',
          isCompleted: false,
        },
      ],
    },
    {
      day: 'Tuesday',
      tasks: [
        { id: '4', title: 'Update task planner UI', isCompleted: false },
        { id: '5', title: 'Team meeting at 10 AM', isCompleted: true },
        { id: '6', title: 'Fix authentication bug', isCompleted: false },
      ],
    },
    {
      day: 'Wednesday',
      tasks: [
        { id: '7', title: 'Refactor API endpoints', isCompleted: false },
        { id: '8', title: 'Write test cases for backend', isCompleted: true },
        { id: '9', title: 'Plan new feature roadmap', isCompleted: false },
      ],
    },
  ],
};

export const TaskList = () => {
  return (
    <div className={styles.Wrapper}>
      {tasks.dailyTasks.map((dayTask) => {
        return (
          <div key={dayTask.day} className={styles.TaskWrapper}>
            <div className={styles.Task}>
              {dayTask.tasks.map((task, taskIndex) => (
                <TaskItem
                  key={`${dayTask.day}-${taskIndex}`}
                  task={task}
                  title={task.title}
                  onUpdate={() => {}}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
