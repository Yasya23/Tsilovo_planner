interface WeekInterval {
    weekStart: string;
    weekEnd: string;
}
interface WeekData extends WeekInterval {
    weekDates: string[];
}
export declare class DateService {
    private dateFormat;
    private createDateArray;
    getWeekData(): {
        currentWeek: WeekData;
        nextWeek?: WeekData;
    };
    getLastWeekData(): WeekInterval;
}
export {};
