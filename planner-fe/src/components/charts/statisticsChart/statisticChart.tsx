// 'use client';

import { TotalTasks } from '@/types/tasks.type';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  statistics: TotalTasks;
}

export const StatisticsChart = ({ statistics }: Props) => {
  const { tasksList, completedTasks, totalTasks } = statistics;

  const overallStatistics = {
    name: 'Загалом',
    completed: completedTasks,
    remaining: totalTasks - completedTasks,
  };

  const weeklyStatistics = tasksList.map((week: any) => ({
    name: `Тиждень ${week.week}`,
    completed: week.statistics?.completedTasks || 0,
    remaining:
      week.statistics?.totalTasks - (week.statistics?.completedTasks || 0),
  }));

  const chartData = [overallStatistics, ...weeklyStatistics];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#ee5e99" name="Виконані Завдання" />
        <Bar dataKey="remaining" fill="#5370f4" name="Невиконані Завдання" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
