
export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
  location?: string;
  htmlLink: string;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

class GoogleCalendarService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage() {
    this.accessToken = localStorage.getItem('google_access_token');
    this.refreshToken = localStorage.getItem('google_refresh_token');
  }

  private saveTokensToStorage(accessToken: string, refreshToken?: string) {
    localStorage.setItem('google_access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('google_refresh_token', refreshToken);
    }
  }

  private clearTokensFromStorage() {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_refresh_token');
    localStorage.removeItem('google_user');
    this.accessToken = null;
    this.refreshToken = null;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  async authenticate(): Promise<GoogleUser> {
    // For demo purposes, we'll simulate the OAuth flow
    // In a real implementation, you would use Google OAuth2
    const mockUser: GoogleUser = {
      id: 'user123',
      email: 'user@example.com',
      name: 'Stellar Reach',
      picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };

    const mockToken = 'mock_access_token_' + Date.now();
    this.accessToken = mockToken;
    this.saveTokensToStorage(mockToken, 'mock_refresh_token');
    localStorage.setItem('google_user', JSON.stringify(mockUser));
    
    return mockUser;
  }

  disconnect() {
    this.clearTokensFromStorage();
  }

  getUser(): GoogleUser | null {
    const userStr = localStorage.getItem('google_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  async getUpcomingEvents(maxResults: number = 10): Promise<CalendarEvent[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    // Mock calendar events for demo
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        summary: 'Team Standup',
        description: 'Daily team sync meeting',
        start: {
          dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
          timeZone: 'America/New_York'
        },
        attendees: [
          { email: 'alice@company.com', displayName: 'Alice Smith' },
          { email: 'bob@company.com', displayName: 'Bob Johnson' }
        ],
        location: 'Conference Room A',
        htmlLink: 'https://calendar.google.com/event?eid=1'
      },
      {
        id: '2',
        summary: 'Client Presentation',
        description: 'Q4 results presentation to stakeholders',
        start: {
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
          timeZone: 'America/New_York'
        },
        attendees: [
          { email: 'client@example.com', displayName: 'Client Representative' }
        ],
        location: 'Zoom Meeting',
        htmlLink: 'https://calendar.google.com/event?eid=2'
      },
      {
        id: '3',
        summary: 'Sales Planning',
        description: 'Planning next quarter sales',
        start: {
          dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: new Date(Date.now() + 49.5 * 60 * 60 * 1000).toISOString(),
          timeZone: 'America/New_York'
        },
        attendees: [
          { email: 'sales@company.com', displayName: 'Sales Team' }
        ],
        location: 'Conference Room B',
        htmlLink: 'https://calendar.google.com/event?eid=3'
      }
    ];

    return mockEvents.slice(0, maxResults);
  }

  async getCalendarEvents(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    // Generate mock events for the calendar view
    const events: CalendarEvent[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // Add some random events
      if (Math.random() > 0.7) {
        const hour = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
        const duration = Math.random() > 0.5 ? 1 : 0.5; // 30 min or 1 hour
        
        events.push({
          id: `event_${currentDate.getTime()}_${hour}`,
          summary: ['Team Meeting', 'Client Call', 'Planning Session', 'Review Meeting'][Math.floor(Math.random() * 4)],
          start: {
            dateTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour).toISOString(),
            timeZone: 'America/New_York'
          },
          end: {
            dateTime: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour + duration).toISOString(),
            timeZone: 'America/New_York'
          },
          htmlLink: `https://calendar.google.com/event?eid=${events.length}`
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return events;
  }
}

export const googleCalendarService = new GoogleCalendarService();
