import React from "react"
import { createContext, useContext } from "react";
import { DateTime } from "luxon";
import { DateTimeRange, Identifiable } from "./timetable-types";

interface TimetableContextType<T extends Identifiable & DateTimeRange> {  
  items: T[];
  dates: DateTime[];
  start: DateTime;
  end: DateTime;
}

const TimetableContext = createContext<TimetableContextType<any> | null>(null);

export interface TimetableProviderProps<T extends Identifiable & DateTimeRange> {
  children: React.ReactNode;
  items: T[];
  dates: DateTime[];
  start: DateTime;
  end: DateTime;
}

export function TimetableProvider<T extends Identifiable & DateTimeRange>({
  children,
  items,
  dates,
  start,
  end,
}: TimetableProviderProps<T>) {

  const value = {
    items,
    dates,
    start,
    end
  };

  return (
    <TimetableContext.Provider value={value}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetableContext<T extends Identifiable & DateTimeRange>() {
  const context = useContext(TimetableContext);
  if (!context) {
    throw new Error("useTimetableContext must be used within a TimetableProvider");
  }
  return context as TimetableContextType<T>;
}

// useTimetableDatesのカスタムフック
export function useTimetableDates() {
  const { dates, start, end } = useTimetableContext();
  
  return {
    dates,
    start,
    end
  };
}
