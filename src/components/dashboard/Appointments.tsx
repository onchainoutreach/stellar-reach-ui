import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarView } from "./CalendarView";
import { UpcomingMeetings } from "./UpcomingMeetings";
import {
  googleCalendarService,
  GoogleUser,
  CalendarEvent,
} from "@/services/googleCalendar";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  LogOut,
  RefreshCw,
  Users,
  Clock,
  Loader2,
} from "lucide-react";
import { startOfMonth, endOfMonth } from "date-fns";

export const Appointments = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = googleCalendarService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const userData = googleCalendarService.getUser();
        setUser(userData);
        await loadEvents();
      }
    };

    checkAuth();
  }, []);

  const loadEvents = async () => {
    if (!googleCalendarService.isAuthenticated()) return;

    setIsLoading(true);
    try {
      const [upcoming, calendar] = await Promise.all([
        googleCalendarService.getUpcomingEvents(3),
        googleCalendarService.getCalendarEvents(
          startOfMonth(new Date()),
          endOfMonth(new Date())
        ),
      ]);

      setUpcomingEvents(upcoming);
      setCalendarEvents(calendar);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load calendar events",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const userData = await googleCalendarService.authenticate();
      setUser(userData);
      setIsAuthenticated(true);
      await loadEvents();

      toast({
        title: "Connected!",
        description: "Successfully connected to Google Calendar",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Google Calendar",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    googleCalendarService.disconnect();
    setIsAuthenticated(false);
    setUser(null);
    setUpcomingEvents([]);
    setCalendarEvents([]);

    toast({
      title: "Disconnected",
      description: "Google Calendar has been disconnected",
    });
  };

  const handleRefresh = async () => {
    await loadEvents();
    toast({
      title: "Refreshed",
      description: "Calendar events updated",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
        </div>

        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertDescription>
            Connect your Google account to view and manage your calendar
            appointments.
          </AlertDescription>
        </Alert>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <CardTitle>Connect Google Calendar</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Access your Google Calendar to view appointments, schedule
              meetings, and manage your time effectively.
            </p>

            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full"
              size="lg"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Connect Google Account
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Appointments</h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user?.picture} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user?.name}</span>
            <Badge variant="secondary" className="text-xs">
              Connected
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Button variant="outline" size="sm" onClick={handleDisconnect}>
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Upcoming
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <CalendarView events={calendarEvents} />
          </TabsContent>

          <TabsContent value="upcoming">
            <UpcomingMeetings events={upcomingEvents} />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="w-4 h-4" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule New Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Clock className="w-4 h-4 mr-2" />
              View Availability
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Users className="w-4 h-4 mr-2" />
              Meeting Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
