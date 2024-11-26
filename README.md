# Timetable

A flexible and customizable React timetable component using Luxon for datetime handling.

## Features

- 📅 Flexible timetable layout supporting multiple days
- 🕒 Luxon-based datetime handling with timezone support
- ✨ Event selection and multi-select support
- 🎨 Customizable styling and themes
- 📱 Responsive design
- 💪 TypeScript support
- 🔄 Context-based state management
- 📚 Comprehensive documentation and Storybook

## Installation

```bash
npm install @1amageek/timetable
# or
yarn add @1amageek/timetable
# or
pnpm add @1amageek/timetable
```

## Quick Start

```tsx
import { DateTime } from "luxon";
import { Timetable } from "react-luxon-timetable";

interface Event {
  id: string;
  start: DateTime;
  end: DateTime;
  title: string;
  type: string;
}

function App() {
  const events: Event[] = [
    {
      id: "1",
      start: DateTime.local(2024, 3, 1, 12, 0),
      end: DateTime.local(2024, 3, 1, 14, 0),
      title: "Team Meeting",
      type: "meeting"
    }
  ];

  return (
    <div className="h-screen">
      <Timetable
        start={DateTime.local(2024, 3, 1)}
        end={DateTime.local(2024, 3, 7)}
        items={events}
        onChange={(selectedIds) => console.log("Selected:", selectedIds)}
      >
        {(item) => (
          <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
            <div className="font-medium">{item.title}</div>
            <div className="text-sm">
              {item.start.toFormat("HH:mm")} - {item.end.toFormat("HH:mm")}
            </div>
          </div>
        )}
      </Timetable>
    </div>
  );
}
```

## Props

### Timetable Props

```typescript
interface TimetableProps<T extends Identifiable & DateTimeRange> {
  start: DateTime;              // Start date
  end: DateTime;               // End date
  items: T[];                  // Array of events
  options?: TimetableOptions;  // Optional configuration
  children: (item: T) => React.ReactNode;  // Render function for events
  onChange?: (selectedIds: string[]) => void;  // Selection change handler
}

interface TimetableOptions {
  cellHeight: number;     // Height of each time slot
  headerHeight: number;   // Height of the header
  paddingInsets: {       // Padding configuration
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
}
```

### Event Interface

```typescript
interface DateTimeRange {
  start: DateTime;
  end: DateTime;
}

interface Identifiable {
  id: string;
}

// Your event type should extend both interfaces
interface Event extends Identifiable, DateTimeRange {
  title: string;
  // ... other properties
}
```

## Advanced Usage

### Custom Styling

```tsx
<Timetable>
  {(item) => (
    <div
      className={`
        p-2 rounded-xl 
        ${item.type === "meeting" ? "bg-blue-100 text-blue-800" : ""}
        ${item.type === "lunch" ? "bg-green-100 text-green-800" : ""}
      `}
    >
      {item.title}
    </div>
  )}
</Timetable>
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/1amageek/timetable.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook
```

### Building

```bash
# Build the library
npm run build

# Build Storybook documentation
npm run sb
```


## License

MIT © [1amageek]