export const useStatistic = () => {
  const statistics = {
    year: 2025,
    availableYears: [2025],
    totalGoals: 3,
    totalCompleted: 10,
    monthlyStats: [
      {
        _id: '1',
        month: 4,
        totalCompleted: 10,
        totalGoals: 3,
        goals: [
          {
            title: 'Goal 1',
            completedTasks: 1,
          },
          {
            title: 'Goal 2',
            completedTasks: 1,
          },
          {
            title: 'Goal 3',
            completedTasks: 1,
          },
        ],
      },
    ],
  };

  return { statistics };
};
