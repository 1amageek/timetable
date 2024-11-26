import React from "react"
import { useTimetableContext } from "./timetable-context";
import { TimetableOptions } from "./timetable-types";
import { DateTime } from "luxon";

export function TimetableHeader({ options }: { options: TimetableOptions }) {
  const { dates } = useTimetableContext()

  return (
    <div
      className="sticky top-0 flex text-center justify-center items-center border-b-2 border-default-300 bg-default z-20"
      style={{
        paddingLeft: `${options.paddingInsets.left}px`,
        height: `${options.headerHeight}px`
      }}
    >
      {dates.map((date, index) => {
        const isToday = date.hasSame(DateTime.local(), "day");
        return (
          <div
            key={index}
            className={`flex w-full gap-1 items-center justify-center
              ${isToday ? "relative" : ""}`}
          >
            <div className="text-sm">
              {date.toFormat("ccc")}
            </div>

            <div className={`
              w-6 h-6 flex items-center justify-center rounded-full text-sm
              ${isToday ? "bg-red-500 text-white" : ""}
            `}>
              {date.toFormat("d")}
            </div>
          </div>
        );
      })}
    </div>
  )
}