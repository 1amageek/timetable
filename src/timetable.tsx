import React from "react"
import { Timeline } from "./timeline";
import { DateTimeRange, Identifiable, TimetableOptions, TimetableProps } from "./timetable-types";
import { TimetableProvider } from "./timetable-context";
import { TimetableHeader } from "./timetable-header";
import { useTimetable } from "./use-timetable";

const defaultOptions: TimetableOptions = {
  cellHeight: 40,
  headerHeight: 32,
  paddingInsets: {
    top: 12,
    left: 48,
    right: 0,
    bottom: 24
  }
};

export function Timetable<T extends Identifiable & DateTimeRange>({
  start,
  end,
  items,
  options = defaultOptions,
  children,
}: TimetableProps<T>) {
  const { dates, timeSlots, itemsByDate } = useTimetable(start, end, items);
  const height = options.paddingInsets.top + (options.cellHeight * timeSlots.length) + options.paddingInsets.bottom
  return (
    <TimetableProvider items={items} start={start} end={end} dates={dates}>
      <div className="relative flex flex-col w-full h-full overflow-y-auto">
        <TimetableHeader options={options} />
        <div className="flex w-full h-full"
          style={{
            height: `${height}px`,           
          }}
        >
          <div
            className="flex shrink-0 flex-col w-full h-full select-none"
            style={{
              paddingTop: `${options.paddingInsets.top}px`,
              paddingLeft: `${options.paddingInsets.left}px`,
              paddingBottom: `${options.paddingInsets.bottom}px`
            }}
          >
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="relative shrink-0 border-t border-default-300 w-full"
                style={{ height: `${options.cellHeight}px` }}
              >
                <div className="absolute w-9 text-right -top-2 -left-10 text-xs text-default-600">
                  {`${hour.toString().padStart(2, "0")}:00`}
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute z-0 flex w-full h-full"
            style={{
              height: `${height}px`,
              paddingLeft: `${options.paddingInsets.left}px`,
              paddingBottom: `${options.paddingInsets.bottom}px`
            }}
          >
            {itemsByDate.map(({ date, items }, dateIndex) => (
              <div
                key={dateIndex}
                className="relative w-full h-full"
                style={{
                  top: `${options.paddingInsets.top}px`,
                  bottom: `${options.paddingInsets.bottom}px`
                }}
              >
                <Timeline
                  date={date}
                  items={items}
                  children={children}
                  cellHeight={options.cellHeight}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </TimetableProvider>
  );
}