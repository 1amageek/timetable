import { DateTime } from 'luxon';

interface DateTimeRange {
    start: DateTime;
    end: DateTime;
}
interface Identifiable {
    id: string;
}
interface EdgeInsets {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
interface TimetableOptions {
    cellHeight: number;
    headerHeight: number;
    paddingInsets: EdgeInsets;
}
interface Position {
    left: string;
    width: string;
    top: string;
    height: string;
}
interface TimetableProps<T extends Identifiable & DateTimeRange> {
    start: DateTime;
    end: DateTime;
    items: T[];
    options?: TimetableOptions;
    children: (item: T) => React.ReactNode;
}
declare const MINUTES_PER_DAY: number;

export { type DateTimeRange, type EdgeInsets, type Identifiable, MINUTES_PER_DAY, type Position, type TimetableOptions, type TimetableProps };
