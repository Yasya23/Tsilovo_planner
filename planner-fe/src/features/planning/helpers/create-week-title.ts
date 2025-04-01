import { WeeklyTasks } from '../types/task.type';
import { Formats, TranslationValues } from 'next-intl';
export const createTitle = (
  week: WeeklyTasks,
  t: (key: string, values?: TranslationValues, formats?: Formats) => string
) => {
  if (!week.length) return '';

  const start = new Date(week[0].date);
  const end = new Date(week[week.length - 1].date);

  const startMonth = t(`months.${start.getMonth()}`);
  const endMonth = t(`months.${end.getMonth()}`);

  return start.getMonth() === end.getMonth()
    ? `${startMonth} ${start.getDate()} - ${end.getDate()}`
    : `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
};
