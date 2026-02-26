import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
} from "date-fns";

// Unavailable date ranges based on Florida Rentals listing
const unavailableRanges = [
  // Feb 2027 - fully booked
  { start: new Date(2027, 1, 1), end: new Date(2027, 1, 28) },
  // March 2027 - fully booked
  { start: new Date(2027, 2, 1), end: new Date(2027, 2, 31) },
  // Some dates in April 2026
  { start: new Date(2026, 3, 1), end: new Date(2026, 3, 14) },
];

function isUnavailable(date: Date): boolean {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  for (const range of unavailableRanges) {
    const sy = range.start.getFullYear(), sm = range.start.getMonth(), sd = range.start.getDate();
    const ey = range.end.getFullYear(), em = range.end.getMonth(), ed = range.end.getDate();
    const dateVal = y * 10000 + m * 100 + d;
    const startVal = sy * 10000 + sm * 100 + sd;
    const endVal = ey * 10000 + em * 100 + ed;
    if (dateVal >= startVal && dateVal <= endVal) return true;
  }
  return false;
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const MonthGrid = ({ month }: { month: Date }) => {
  const days = useMemo(() => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    return eachDayOfInterval({ start, end });
  }, [month]);

  const startDayOfWeek = getDay(days[0]);

  return (
    <div className="flex-1 min-w-[200px]">
      <div className="bg-muted/50 py-2 px-3 mb-1">
        <h3 className="text-sm font-semibold text-foreground text-center">
          {format(month, "MMMM yyyy")}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-0">
        {DAYS.map((day, i) => (
          <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
        {/* Empty cells for offset */}
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}
        {days.map((date) => {
          const unavail = isUnavailable(date);
          return (
            <div
              key={date.toISOString()}
              className={`h-8 flex items-center justify-center text-sm ${
                unavail
                  ? "text-muted-foreground line-through bg-muted/30"
                  : "text-foreground"
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const AvailabilityCalendar = () => {
  const [startMonth, setStartMonth] = useState(new Date(2027, 1, 1)); // Feb 2027

  const months = useMemo(
    () => [startMonth, addMonths(startMonth, 1), addMonths(startMonth, 2)],
    [startMonth]
  );

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Availability</h2>
          <p className="text-sm text-muted-foreground italic">
            Last updated on February 17, 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStartMonth(subMonths(startMonth, 3))}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStartMonth(addMonths(startMonth, 3))}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* 3-month grid */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {months.map((m) => (
          <MonthGrid key={m.toISOString()} month={m} />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center border border-border rounded text-xs">
            20
          </div>
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center border border-border rounded text-xs text-muted-foreground line-through bg-muted/30">
            20
          </div>
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>
    </div>
  );
};
