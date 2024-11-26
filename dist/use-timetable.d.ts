import { DateTime } from 'luxon';
import { Identifiable, DateTimeRange } from './timetable-types.js';

declare function useTimetable<T extends Identifiable & DateTimeRange>(start: DateTime, end: DateTime, items: T[]): {
    dates: DateTime<boolean>[];
    timeSlots: number[];
    itemsByDate: {
        date: DateTime<boolean>;
        items: T[];
    }[];
};

export { useTimetable };
