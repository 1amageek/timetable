import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { DateTime } from 'luxon';
import { Identifiable, DateTimeRange } from './timetable-types.js';

declare function calculateTimeInDay(dateTime: DateTime, targetDate: DateTime): number;
declare function Timeline<T extends Identifiable & DateTimeRange>({ date, items, children, cellHeight }: {
    date: DateTime;
    items: T[];
    children: (item: T) => React.ReactNode;
    cellHeight: number;
}): react_jsx_runtime.JSX.Element;

export { Timeline, calculateTimeInDay };
