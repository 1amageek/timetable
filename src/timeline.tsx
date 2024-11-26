import React from "react"
import { DateTime, Interval } from "luxon";
import { useMemo } from "react";
import { DateTimeRange, Identifiable, Position, MINUTES_PER_DAY } from "./timetable-types";

export function calculateTimeInDay(
  dateTime: DateTime,
  targetDate: DateTime
): number {
  const itemStartOfDay = dateTime.startOf("day");
  const targetStartOfDay = targetDate.startOf("day");
  
  // 日付の差分を計算
  const daysDiff = itemStartOfDay.diff(targetStartOfDay, "days").days;
  
  // その日の経過分を計算（時間と分から）
  const minutesInDay = (dateTime.hour * 60) + dateTime.minute + (daysDiff * MINUTES_PER_DAY);

  if (minutesInDay < 0) {
    return 0;
  } else if (daysDiff > 0) {
    // 翌日以降の場合は24時間後
    return MINUTES_PER_DAY;
  }

  return Math.max(0, Math.min(minutesInDay, MINUTES_PER_DAY));
}

function useTimelineStyles<T extends DateTimeRange>(
  date: DateTime,
  items: T[],
  cellHeight: number
): Map<T, Position> {
  return useMemo(() => {
    const styles = new Map<T, Position>();
    if (items.length === 0) return styles;

    const sortedItems = [...items].sort((a, b) => {
      const aStart = calculateTimeInDay(a.start, date);
      const bStart = calculateTimeInDay(b.start, date);
      if (aStart !== bStart) return aStart - bStart;
      
      const aEnd = calculateTimeInDay(a.end, date);
      const bEnd = calculateTimeInDay(b.end, date);
      return bEnd - aEnd;
    });

    // Group overlapping items
    const overlappingGroups = sortedItems.reduce<T[][]>((groups, item) => {
      const lastGroup = groups[groups.length - 1];
      if (!lastGroup) {
        return [[item]];
      }

      const overlapsWithLastGroup = lastGroup.some(groupItem => {
        const itemInterval = Interval.fromDateTimes(item.start, item.end);
        const groupItemInterval = Interval.fromDateTimes(groupItem.start, groupItem.end);
        return itemInterval.overlaps(groupItemInterval);
      });

      if (overlapsWithLastGroup) {
        lastGroup.push(item);
      } else {
        groups.push([item]);
      }
      return groups;
    }, []);

    // Calculate positions for each group
    overlappingGroups.forEach(group => {
      group.forEach((item, index) => {
        const startMinutes = calculateTimeInDay(item.start, date);
        const endMinutes = calculateTimeInDay(item.end, date);
        const duration = Math.max(0, endMinutes - startMinutes);
        const top = (startMinutes * cellHeight) / 60;
        const height = (duration * cellHeight) / 60;

        styles.set(item, {
          left: `${(index * 100) / group.length}%`,
          width: `${100 / group.length}%`,
          top: `${top}px`,
          height: `${height}px`
        });
      });
    });

    return styles;
  }, [date, items, cellHeight]);
}

export function Timeline<T extends Identifiable & DateTimeRange>({ 
  date,
  items, 
  children, 
  cellHeight 
}: {
  date: DateTime;
  items: T[];
  children: (item: T) => React.ReactNode;
  cellHeight: number;
}) {
  const styles = useTimelineStyles(date, items, cellHeight);
  return (
    <div className="relative border-r w-full h-full border-default-200">
      {items.map((item) => {
        const style = styles.get(item);
        if (!style) return null;

        return (
          <div
            key={item.id}
            style={style}
            className="absolute py-0.5"
          >
            {children(item)}
          </div>
        );
      })}
    </div>
  );
}
