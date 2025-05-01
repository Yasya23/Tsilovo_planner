"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
let DateService = class DateService {
    constructor() {
        this.dateFormat = 'yyyy-MM-dd';
    }
    createDateArray(weekStart, weekEnd) {
        return (0, date_fns_1.eachDayOfInterval)({ start: weekStart, end: weekEnd }).map((date) => (0, date_fns_1.format)(date, this.dateFormat));
    }
    getWeekData() {
        const today = new Date();
        const isSunday = today.getDay() === 0;
        const currentWeekStart = (0, date_fns_1.startOfWeek)(today, { weekStartsOn: 1 });
        const currentWeekEnd = (0, date_fns_1.endOfWeek)(today, { weekStartsOn: 1 });
        const currentWeek = {
            weekStart: (0, date_fns_1.format)(currentWeekStart, this.dateFormat),
            weekEnd: (0, date_fns_1.format)(currentWeekEnd, this.dateFormat),
            weekDates: this.createDateArray(currentWeekStart, currentWeekEnd),
        };
        if (isSunday) {
            const nextWeekStart = (0, date_fns_1.addWeeks)(currentWeekStart, 1);
            const nextWeekEnd = (0, date_fns_1.endOfWeek)(nextWeekStart, { weekStartsOn: 1 });
            const nextWeek = {
                weekStart: (0, date_fns_1.format)(nextWeekStart, this.dateFormat),
                weekEnd: (0, date_fns_1.format)(nextWeekEnd, this.dateFormat),
                weekDates: this.createDateArray(nextWeekStart, nextWeekEnd),
            };
            return { currentWeek, nextWeek };
        }
        return { currentWeek };
    }
    getLastWeekData() {
        const today = new Date();
        const lastWeekStart = (0, date_fns_1.startOfWeek)((0, date_fns_1.subWeeks)(today, 1), { weekStartsOn: 1 });
        const lastWeekEnd = (0, date_fns_1.endOfWeek)((0, date_fns_1.subWeeks)(today, 1), { weekStartsOn: 1 });
        return {
            weekStart: (0, date_fns_1.format)(lastWeekStart, this.dateFormat),
            weekEnd: (0, date_fns_1.format)(lastWeekEnd, this.dateFormat),
        };
    }
};
exports.DateService = DateService;
exports.DateService = DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);
//# sourceMappingURL=date.service.js.map