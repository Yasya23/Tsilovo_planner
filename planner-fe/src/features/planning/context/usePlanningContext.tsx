'use client';

import { createContext, useContext } from 'react';

import { ActiveGoal } from '@/features/planning/types/goals.type';
import { CreateTask, Task } from '@/features/planning/types/task.type';

type PlanningContextProps = {
  activeGoals: ActiveGoal[];
  createTask: (task: CreateTask) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  isPending: boolean;
};

export const PlanningContext = createContext<PlanningContextProps | undefined>(
  undefined
);

export const usePlanningContext = () => {
  const context = useContext(PlanningContext);
  if (!context)
    throw new Error('usePlanningContext must be used within PlanningProvider');
  return context;
};
