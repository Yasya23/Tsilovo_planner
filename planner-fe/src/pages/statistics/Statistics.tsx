'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store';
import { TaskService } from '@/services/task.service';
import { TotalTasks } from '@/types/tasks.type';
import { StatisticsChart } from '@/components/charts/statisticChart';
import { Spinner } from '@/components/Spinner';

import styles from './statistics.module.scss';

const fetchAllTasks = async (): Promise<TotalTasks> => {
  return await TaskService.getAll();
};

export const Statistics = () => {
  const { userAuth } = useAuthStore();

  if (!userAuth) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.message}>
          Загальна статистика доступна тільки для зареєстрованих користувачів
        </p>
      </div>
    );
  }
  const {
    data: statistics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allTasks'],
    queryFn: fetchAllTasks,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Spinner />
      </div>
    );
  }

  if (isError || !statistics || !statistics.tasksList) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.message}>
          Немає доступних даних для відображення. Статистика оновлюється кожні
          24 години.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3>Статистика Завдань</h3>
      <StatisticsChart statistics={statistics} />
      <p className={styles.notification}>
        Статистика оновлюється кожні 24 години.
      </p>
    </div>
  );
};

export default Statistics;
