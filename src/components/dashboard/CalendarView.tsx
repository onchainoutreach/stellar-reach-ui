import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from "@/services/googleCalendar";
import { format, isSameDay, startOfMonth, endOfMonth } from "date-fns";

interface CalendarViewProps {
  events: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
}

export const CalendarView = ({ events, onDateSelect }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const eventsForSelectedDate = events.filter((event) =>
    isSameDay(new Date(event.start.dateTime), selectedDate)
  );

  const getEventsForDate = (date: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.start.dateTime), date)
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={{
              hasEvents: (date) => getEventsForDate(date).length > 0,
            }}
            modifiersStyles={{
              hasEvents: {
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                borderRadius: "50%",
              },
            }}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Events for {format(selectedDate, "MMM dd, yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {eventsForSelectedDate.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No events scheduled
              </p>
            ) : (
              eventsForSelectedDate.map((event) => (
                <div key={event.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{event.summary}</h4>
                    <Badge variant="outline" className="text-xs">
                      {format(new Date(event.start.dateTime), "HH:mm")}
                    </Badge>
                  </div>
                  {event.description && (
                    <p className="text-xs text-muted-foreground">
                      {event.description}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-xs text-muted-foreground">
                      📍 {event.location}
                    </p>
                  )}
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {attendee.displayName || attendee.email}
                        </Badge>
                      ))}
                      {event.attendees.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{event.attendees.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
