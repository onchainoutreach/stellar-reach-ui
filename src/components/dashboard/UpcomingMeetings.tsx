import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from "@/services/googleCalendar";
import { format, formatDistanceToNow } from "date-fns";
import { Clock, MapPin, Users, ExternalLink, Video, Phone } from "lucide-react";

interface UpcomingMeetingsProps {
  events: CalendarEvent[];
}

export const UpcomingMeetings = ({ events }: UpcomingMeetingsProps) => {
  const getQuickActions = (event: CalendarEvent) => {
    const actions = [];

    if (event.location?.includes("zoom") || event.location?.includes("meet")) {
      actions.push({
        icon: Video,
        label: "Join Video",
        variant: "default" as const,
      });
    }

    if (event.attendees && event.attendees.length > 0) {
      actions.push({
        icon: Phone,
        label: "Call",
        variant: "outline" as const,
      });
    }

    actions.push({
      icon: ExternalLink,
      label: "Open in Calendar",
      variant: "ghost" as const,
    });

    return actions;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
        <Badge variant="secondary" className="text-xs">
          {events.length} scheduled
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                No upcoming meetings
              </p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-medium text-sm leading-none">
                      {event.summary}
                    </h3>
                    {event.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs ml-2">
                    {formatDistanceToNow(new Date(event.start.dateTime), {
                      addSuffix: true,
                    })}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(new Date(event.start.dateTime), "MMM dd, HH:mm")} -
                    {format(new Date(event.end.dateTime), "HH:mm")}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                  )}
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.attendees.length} attendee
                      {event.attendees.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {getQuickActions(event).map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant={action.variant}
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => {
                          if (action.label === "Open in Calendar") {
                            window.open(event.htmlLink, "_blank");
                          }
                        }}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
