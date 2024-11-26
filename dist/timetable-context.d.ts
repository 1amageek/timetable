import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { DateTime } from 'luxon';
import { Identifiable, DateTimeRange } from './timetable-types.js';

interface TimetableContextType<T extends Identifiable & DateTimeRange> {
    items: T[];
    dates: DateTime[];
    start: DateTime;
    end: DateTime;
}
interface TimetableProviderProps<T extends Identifiable & DateTimeRange> {
    children: React.ReactNode;
    items: T[];
    dates: DateTime[];
    start: DateTime;
    end: DateTime;
}
declare function TimetableProvider<T extends Identifiable & DateTimeRange>({ children, items, dates, start, end, }: TimetableProviderProps<T>): react_jsx_runtime.JSX.Element;
declare function useTimetableContext<T extends Identifiable & DateTimeRange>(): TimetableContextType<T>;
declare function useTimetableDates(): {
    dates: DateTime<boolean>[];
    start: DateTime<boolean>;
    end: DateTime<boolean>;
};

export { TimetableProvider, type TimetableProviderProps, useTimetableContext, useTimetableDates };
