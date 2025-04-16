import { DropResult } from '@hello-pangea/dnd';

import { Task, WeeklyTasks } from '@/features/planning/types/task.type';

import { filterTasks } from '../helpers/filter-tasks';
import { ActiveGoal } from '../types/goals.type';

interface DragDropHandlerProps {
  weeksData: WeeklyTasks[];
  setWeeksData: (data: WeeklyTasks[]) => void;
  updateTask: (task: Task) => void;
  activeGoals: ActiveGoal[];
}

export const useDragDropHandler = ({
  weeksData,
  setWeeksData,
  updateTask,
  activeGoals,
}: DragDropHandlerProps) => {
  const findTaskById = (taskId: string) => {
    for (let wi = 0; wi < weeksData.length; wi++) {
      for (let di = 0; di < weeksData[wi].length; di++) {
        const dayData = weeksData[wi][di];
        const foundIndex = dayData.tasks.findIndex((t) => t._id === taskId);

        if (foundIndex !== -1) {
          return {
            task: JSON.parse(JSON.stringify(dayData.tasks[foundIndex])),
            weekIndex: wi,
            dayIndex: di,
            taskIndex: foundIndex,
          };
        }
      }
    }
    return null;
  };

  const findDayByDate = (date: string) => {
    for (let wi = 0; wi < weeksData.length; wi++) {
      for (let di = 0; di < weeksData[wi].length; di++) {
        if (weeksData[wi][di].date === date) {
          return {
            weekIndex: wi,
            dayIndex: di,
          };
        }
      }
    }
    return null;
  };

  const getFlattenedTasks = (dayTasks: Task[]) => {
    const relevantGoals = [
      ...filterTasks(dayTasks, activeGoals).goalsWithTasks,
      ...filterTasks(dayTasks, activeGoals).goalsWithoutTasks,
    ];

    return relevantGoals.flatMap((goal) =>
      dayTasks.filter((task) => task.goalId === goal._id)
    );
  };

  const removeTaskFromSource = (
    updatedWeeks: WeeklyTasks[],
    source: { weekIndex: number; dayIndex: number; taskIndex: number }
  ) => {
    updatedWeeks[source.weekIndex][source.dayIndex].tasks.splice(
      source.taskIndex,
      1
    );
  };

  const insertTaskAtDestination = (
    updatedWeeks: WeeklyTasks[],
    destination: { weekIndex: number; dayIndex: number },
    destinationIndex: number,
    taskToMove: Task
  ) => {
    const destDayTasks =
      updatedWeeks[destination.weekIndex][destination.dayIndex].tasks;
    const destFlattenedTasks = getFlattenedTasks(destDayTasks);

    if (destinationIndex < destFlattenedTasks.length) {
      const referenceTaskId = destFlattenedTasks[destinationIndex]._id;
      const refTaskIndex = destDayTasks.findIndex(
        (t) => t._id === referenceTaskId
      );
      destDayTasks.splice(refTaskIndex, 0, taskToMove);
    } else {
      destDayTasks.push(taskToMove);
    }
  };

  const cloneWeeksData = () => JSON.parse(JSON.stringify(weeksData));

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const [destGoalId, destDate] = destination.droppableId.split('|');

    const taskData = findTaskById(draggableId);
    if (!taskData) return;

    const destDay = findDayByDate(destDate);
    if (!destDay) return;

    const updatedWeeks = cloneWeeksData();

    removeTaskFromSource(updatedWeeks, {
      weekIndex: taskData.weekIndex,
      dayIndex: taskData.dayIndex,
      taskIndex: taskData.taskIndex,
    });

    const taskToMove = {
      ...taskData.task,
      date: destDate,
      goalId: destGoalId,
    };

    insertTaskAtDestination(
      updatedWeeks,
      { weekIndex: destDay.weekIndex, dayIndex: destDay.dayIndex },
      destination.index,
      taskToMove
    );

    setWeeksData(updatedWeeks);

    try {
      updateTask(taskToMove);
    } catch (error) {
      console.error('Failed to update task:', error);
      setWeeksData(weeksData);
    }
  };

  return { handleDragEnd };
};
