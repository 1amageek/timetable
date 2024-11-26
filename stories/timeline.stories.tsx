// stories/Timetable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { DateTime } from "luxon";
import { Timetable, TimetableProps } from "../src";

interface Event {
  id: string;
  start: DateTime;
  end: DateTime;
  title: string;
  type: "meeting" | "lunch" | "client";
}

const meta: Meta<typeof Timetable> = {
  title: "Components/Timetable",
  component: Timetable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;


const events: Event[] = [
  {
    id: "1",
    start: DateTime.local(2024, 3, 1, 12, 0),
    end: DateTime.local(2024, 3, 1, 14, 0),
    title: "朝会",
    type: "meeting"
  },
  {
    id: "2",
    start: DateTime.local(2024, 3, 1, 13, 0),
    end: DateTime.local(2024, 3, 1, 15, 0),
    title: "プロジェクトMTG",
    type: "meeting"
  },
  {
    id: "3",
    start: DateTime.local(2024, 3, 2, 20, 0),
    end: DateTime.local(2024, 3, 3, 2, 0),
    title: "Dinner",
    type: "lunch"
  },
  {
    id: "4",
    start: DateTime.local(2024, 3, 2, 11, 0),
    end: DateTime.local(2024, 3, 2, 12, 0),
    title: "ランチミーティング",
    type: "lunch"
  },
  {
    id: "5",
    start: DateTime.local(2024, 3, 1, 8, 0),
    end: DateTime.local(2024, 3, 1, 12, 0),
    title: "クライアントMTG",
    type: "client"
  },
];

const getEventStyle = (type: Event["type"], isSelected: boolean) => {
  let baseStyle = "";
  switch (type) {
    case "meeting":
      baseStyle = "bg-blue-100 text-blue-800 border-l-4 border-blue-600";
      break;
    case "lunch":
      baseStyle = "bg-green-100 text-green-800 border-l-4 border-green-600";
      break;
    case "client":
      baseStyle = "bg-purple-100 text-purple-800 border-l-4 border-purple-600";
      break;
    default:
      baseStyle = "bg-gray-100 text-gray-800 border-l-4 border-gray-600";
  }
  return `${baseStyle} ${isSelected ? 'ring-2 ring-blue-400' : ''} shadow-sm`;
};

const Template = (args: TimetableProps<Event>) => {

  return (
    <Timetable
      {...args}
    >
      {(item: Event) => (
        <div
          className={`p-1.5 rounded ${getEventStyle(item.type, false)} 
          text-tiny w-full h-full cursor-pointer transition-all duration-200 
          hover:shadow-md group`}
        >
          <div className="font-medium line-clamp-2 text-xs">
            {item.title}
          </div>
          <div className="text-xs opacity-75 line-clamp-1">
            {item.start.toFormat("HH:mm")} - {item.end.toFormat("HH:mm")}
          </div>
        </div>
      )}
    </Timetable>
  );
};


export const OutsideScroll = {
  render: Template,
  args: {
    start: DateTime.local(2024, 12, 1),
    end: DateTime.local(2024, 12, 7),
    items: events
  },
};