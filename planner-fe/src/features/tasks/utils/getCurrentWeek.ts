import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
  eachDayOfInterval,
} from 'date-fns';

interface WeekData {
  weekStart: Date;
  weekEnd: Date;
  weekDates: string[];
  nextWeekStart?: Date;
  nextWeekEnd?: Date;
  nextWeekDates?: string[];
}

const createDateArray = (weekStart: Date, weekEnd: Date) => {
  return eachDayOfInterval({ start: weekStart, end: weekEnd }).map((date) =>
    format(date, 'yyyy-MM-dd')
  );
};

export const getWeekData = (type: 'current' | 'next' = 'current'): WeekData => {
  const today = new Date();
  const offset = type === 'next' ? 1 : 0;

  const weekStart = startOfWeek(addWeeks(today, offset), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(addWeeks(today, offset), { weekStartsOn: 1 });

  const weekDates = createDateArray(weekStart, weekEnd);

  const result: WeekData = { weekStart, weekEnd, weekDates };

  if (today.getDay() === 0) {
    const nextWeekStart = startOfWeek(addWeeks(today, offset + 1), {
      weekStartsOn: 1,
    });
    const nextWeekEnd = endOfWeek(addWeeks(today, offset + 1), {
      weekStartsOn: 1,
    });

    result['nextWeekStart'] = nextWeekStart;
    result['nextWeekEnd'] = nextWeekEnd;
    result['nextWeekDates'] = createDateArray(nextWeekStart, nextWeekEnd);
  }

  return result;
};

export const createTitle = (
  type: 'current' | 'next',
  t: (key: string) => string
) => {
  const { weekStart, weekEnd } = getWeekData({ type });

  const startMonth = weekStart.getMonth().toString();
  const endMonth = weekEnd.getMonth().toString();
  const theSameMonth = startMonth === endMonth;

  return `${t(startMonth)} ${weekStart.getDate()} - ${
    theSameMonth ? '' : t(endMonth) + ' '
  }${weekEnd.getDate()}`;
};
