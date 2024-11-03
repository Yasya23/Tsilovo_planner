export const weekCalculate = () => {
  const date = new Date();

  const dayNumber = (date.getUTCDay() + 6) % 7;
  const target = new Date(date.valueOf());
  target.setUTCDate(date.getUTCDate() + 4 - dayNumber);

  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );

  const lastDayOfYear = new Date(Date.UTC(target.getUTCFullYear(), 11, 31));
  const daysInLastWeek =
    (lastDayOfYear.getTime() - target.getTime()) / 86400000;
  const isLastWeekWithTwoDays = daysInLastWeek <= 2 && daysInLastWeek >= 0;

  return { weekNumber, isLastWeekWithTwoDays };
};
