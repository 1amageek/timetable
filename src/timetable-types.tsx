import { DateTime } from "luxon";

export interface DateTimeRange {
  start: DateTime;
  end: DateTime;
}

export interface Identifiable {
  id: string;
}

export interface EdgeInsets {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface TimetableOptions {
  cellHeight: number;
  headerHeight: number;
  paddingInsets: EdgeInsets;
}

export interface Position {
  left: string;
  width: string;
  top: string;
  height: string;
}

export interface TimetableProps<T extends Identifiable & DateTimeRange> {
  start: DateTime;
  end: DateTime;
  items: T[];
  options?: TimetableOptions;
  children: (item: T) => React.ReactNode;
}

export const MINUTES_PER_DAY = 24 * 60;