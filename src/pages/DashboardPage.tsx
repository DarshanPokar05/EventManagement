import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChartBar, CreditCard, MapPin, Ticket, Users } from "lucide-react";
import { events as defaultEvents } from "@/data/events";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";

const DashboardPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Get events from localStorage or use default events
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(defaultEvents);
      localStorage.setItem("events", JSON.stringify(defaultEvents));
    }
  }, []);

  // Mock data for the dashboard
  const totalEvents = events.length;
  const totalTickets = events.reduce((acc, event) => acc + event.attendees, 0);
  const totalRevenue = events.reduce((acc, event) => acc + (event.price * event.attendees), 0);
  const activeEvents = events.filter(event => new Date(event.date) > new Date()).length;

  // Get upcoming events
  const upcomingEvents = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your events and track performance
            </p>
          </div>
          
          <Link to="/create-event" className="mt-4 md:mt-0">
            <Button className="bg-event-600 hover:bg-event-700">
              <Calendar className="mr-2 h-4 w-4" />
              Create New Event
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-3xl font-bold">{totalEvents}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Calendar className="h-8 w-8 text-event-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tickets Sold</p>
                <p className="text-3xl font-bold">{totalTickets}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Ticket className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Events</p>
                <p className="text-3xl font-bold">{activeEvents}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <ChartBar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Your next {upcomingEvents.length} scheduled events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No upcoming events</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <Link to={`/events/${event.id}`}>
                            <h3 className="font-medium hover:text-event-600">{event.title}</h3>
                          </Link>
                          <div className="flex items-center text-xs text-muted-foreground gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(event.date).toLocaleDateString(undefined, { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm">{event.attendees} / {event.capacity}</p>
                          <p className="text-xs text-muted-foreground">Attendees</p>
                        </div>
                        <Link to={`/events/${event.id}/manage`}>
                          <Button variant="ghost" size="sm">Manage</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
              <CardDescription>
                Popular event categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(events.map(event => event.category))).map(category => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{category}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {events.filter(event => event.category === category).length} events
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" size="sm" className="w-full">
                  <ChartBar className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Venue Popularity</CardTitle>
              <CardDescription>
                Most popular venues for your events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mock venue stats */}
                <div className="border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Convention Center</h4>
                    <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-event-50 text-event-700">
                        8 events
                      </Badge>
                    </div>
                  </div>
                  <MapPin className="h-5 w-5 text-event-600" />
                </div>
                <div className="border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Meadow Stage</h4>
                    <p className="text-xs text-muted-foreground">New York, NY</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-event-50 text-event-700">
                        6 events
                      </Badge>
                    </div>
                  </div>
                  <MapPin className="h-5 w-5 text-event-600" />
                </div>
                <div className="border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Waterfront Plaza</h4>
                    <p className="text-xs text-muted-foreground">Chicago, IL</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-event-50 text-event-700">
                        5 events
                      </Badge>
                    </div>
                  </div>
                  <MapPin className="h-5 w-5 text-event-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
