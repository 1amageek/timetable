import React from "react"
import { DateTime } from "luxon";
import { useMemo } from "react";
import { DateTimeRange, Identifiable } from "./timetable-types";

export function useTimetable<T extends Identifiable & DateTimeRange>(
  start: DateTime,
  end: DateTime,
  items: T[]
) {
  const dates = useMemo(() => {
    const days = end.diff(start, "days").days;
    return Array.from(
      { length: Math.ceil(days) + 1 },
      (_, i) => start.plus({ days: i })
    );
  }, [start, end]);

  const timeSlots = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const itemsByDate = useMemo(() => {
    return dates.map(date => ({
      date,
      items: items.filter(item => 
        item.start.hasSame(date, "day") || 
        item.end.hasSame(date, "day") ||
        (item.start < date && item.end > date)
      )
    }));
  }, [dates, items]);

  return {
    dates,
    timeSlots,
    itemsByDate
  };
}