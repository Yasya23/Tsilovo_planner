'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface ProgressChartProps {
  total: number;
  todo: number;
  done: number;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  total,
  todo,
  done,
}) => {
  const todoPercentage = total > 0 ? Math.round((todo / total) * 100) : 0;
  const donePercentage = total > 0 ? Math.round((done / total) * 100) : 0;

  const data = [
    { name: `Невиконані ${todo}`, value: todoPercentage },
    { name: `Зроблено ${done}`, value: donePercentage },
  ];

  const COLORS = ['#FF8042', '#75cc75'];

  return (
    <div style={{ height: '250px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            labelLine={true}
            outerRadius={60}
            dataKey="value">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
