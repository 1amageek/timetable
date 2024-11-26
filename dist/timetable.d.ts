import * as react_jsx_runtime from 'react/jsx-runtime';
import { Identifiable, DateTimeRange, TimetableProps } from './timetable-types.js';
import 'luxon';

declare function Timetable<T extends Identifiable & DateTimeRange>({ start, end, items, options, children, }: TimetableProps<T>): react_jsx_runtime.JSX.Element;

export { Timetable };
