import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { events as defaultEvents } from "@/data/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NotFound from "./NotFound";
import { Calendar, ChevronLeft, Clock, CreditCard, MapPin, Share2, Ticket, Users } from "lucide-react";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Event } from "@/types/event";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ticketQuantity, setTicketQuantity] = useState("1");
  const [event, setEvent] = useState<Event | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  useEffect(() => {
    // Get events from localStorage or use default events
    const storedEvents = localStorage.getItem("events");
    const events = storedEvents ? JSON.parse(storedEvents) : defaultEvents;
    const foundEvent = events.find((e: Event) => e.id === id);
    setEvent(foundEvent || null);
  }, [id]);
  
  if (!event) {
    return <NotFound />;
  }

  const eventDate = new Date(event.date);
  
  const handleBookTickets = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to book tickets", {
        description: "You need to be signed in to book tickets for this event.",
        action: {
          label: "Sign In",
          onClick: () => navigate("/login")
        }
      });
      return;
    }

    // Get existing events
    const storedEvents = localStorage.getItem("events");
    const events = storedEvents ? JSON.parse(storedEvents) : defaultEvents;
    
    // Update the attendees count
    const updatedEvents = events.map((e: Event) => {
      if (e.id === event.id) {
        const newAttendees = e.attendees + parseInt(ticketQuantity);
        if (newAttendees <= e.capacity) {
          return { ...e, attendees: newAttendees };
        }
      }
      return e;
    });
    
    // Save back to localStorage
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    // Add to user's tickets
    const userTickets = JSON.parse(localStorage.getItem("userTickets") || "[]");
    const newTicket = {
      id: `tkt-${Date.now()}`,
      eventId: event.id,
      userId: localStorage.getItem("userEmail"),
      quantity: parseInt(ticketQuantity),
      type: "standard",
      price: event.price,
      status: "confirmed",
      purchaseDate: new Date().toISOString()
    };
    localStorage.setItem("userTickets", JSON.stringify([...userTickets, newTicket]));
    
    toast.success(`${ticketQuantity} ticket(s) booked for ${event.title}`, {
      description: "You'll receive a confirmation email shortly.",
    });
    
    navigate("/my-tickets");
  };
  
  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const remainingTickets = event.capacity - event.attendees;
  const isSoldOut = remainingTickets <= 0;

  return (
    <Layout>
      <div className="container py-6 md:py-8">
        <Link to="/events" className="inline-flex items-center text-sm font-medium text-event-600 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Events
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{event.category}</Badge>
                  {isSoldOut && <Badge variant="destructive">Sold Out</Badge>}
                </div>
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <p className="text-muted-foreground mt-2">{event.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-event-600" />
                  <span>{formatDate(eventDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-event-600" />
                  <span>{formatTime(eventDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-event-600" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-event-600" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">{event.capacity} attendees</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-event-600" />
                    <div>
                      <p className="font-medium">Ticket Price</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(event.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Venue</h2>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">{event.venue}</h3>
                  <p className="text-muted-foreground mt-1">{event.location}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                <p className="font-medium">{event.organizer}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Get Tickets</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Price per ticket</p>
                    <p className="text-2xl font-bold">{formatCurrency(event.price)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Ticket quantity</p>
                    <Select value={ticketQuantity} onValueChange={setTicketQuantity} disabled={isSoldOut}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: Math.min(8, remainingTickets) }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "ticket" : "tickets"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Total price</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(event.price * parseInt(ticketQuantity))}
                    </p>
                  </div>
                  
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleBookTickets}
                    disabled={isSoldOut}
                  >
                    {isSoldOut ? "Sold Out" : "Book Tickets"}
                  </Button>
                  
                  {!isSoldOut && (
                    <p className="text-sm text-muted-foreground text-center">
                      {remainingTickets} tickets remaining
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-event-600" />
                    <span className="font-medium">{event.attendees} people attending</span>
                  </div>
                  
                  <Button variant="ghost" size="icon" onClick={handleShareEvent}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    <span className="font-medium">Capacity:</span> {event.capacity} attendees
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mb-1">
                    <div 
                      className="bg-event-600 h-2 rounded-full" 
                      style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs">
                    {Math.round((event.attendees / event.capacity) * 100)}% booked
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
