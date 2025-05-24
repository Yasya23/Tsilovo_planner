import { Injectable } from '@nestjs/common';
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  subWeeks,
} from 'date-fns';

interface WeekInterval {
  weekStart: string;
  weekEnd: string;
}
interface WeekData extends WeekInterval {
  weekDates: string[];
}

@Injectable()
export class DateService {
  private toISOStringDate(date: Date): string {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    ).toISOString(); // Ensures time is 00:00:00.000Z
  }

  private createDateArray(weekStart: Date, weekEnd: Date): string[] {
    return eachDayOfInterval({ start: weekStart, end: weekEnd }).map((date) =>
      this.toISOStringDate(date),
    );
  }

  public getWeekData(): { currentWeek: WeekData; nextWeek?: WeekData } {
    const today = new Date();
    const isSunday = today.getDay() === 0;

    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

    const currentWeek: WeekData = {
      weekStart: this.toISOStringDate(currentWeekStart),
      weekEnd: this.toISOStringDate(currentWeekEnd),
      weekDates: this.createDateArray(currentWeekStart, currentWeekEnd),
    };

    if (isSunday) {
      const nextWeekStart = addWeeks(currentWeekStart, 1);
      const nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 1 });

      const nextWeek: WeekData = {
        weekStart: this.toISOStringDate(nextWeekStart),
        weekEnd: this.toISOStringDate(nextWeekEnd),
        weekDates: this.createDateArray(nextWeekStart, nextWeekEnd),
      };

      return { currentWeek, nextWeek };
    }

    return { currentWeek };
  }

  public getLastWeekData(): WeekInterval {
    const today = new Date();
    const lastWeekStart = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
    const lastWeekEnd = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });

    return {
      weekStart: this.toISOStringDate(lastWeekStart),
      weekEnd: this.toISOStringDate(lastWeekEnd),
    };
  }
}
