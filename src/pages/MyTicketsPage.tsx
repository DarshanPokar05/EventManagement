import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DownloadIcon, MapPin, QrCode, Ticket as TicketIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/events";
import { Event as EventType, Ticket } from "@/types/event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

const MyTicketsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    // Get user tickets from localStorage
    const storedTickets = localStorage.getItem("userTickets");
    const tickets = storedTickets ? JSON.parse(storedTickets) : [];
    setUserTickets(tickets);

    // Get events from localStorage
    const storedEvents = localStorage.getItem("events");
    const eventsData = storedEvents ? JSON.parse(storedEvents) : events;
    setEvents(eventsData);
  }, []);

  const generateQRCode = async (ticketId: string): Promise<string> => {
    try {
      return await QRCode.toDataURL(ticketId);
    } catch (err) {
      console.error('Error generating QR code:', err);
      return '';
    }
  };

  const handleDownloadTicket = async (ticket: Ticket, event: EventType) => {
    try {
      // Create new PDF document (A4 format)
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;

      // Add title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      const title = event.title;
      doc.text(title, pageWidth / 2, margin, { align: 'center' });

      // Add event details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      let yPos = margin + 20;

      // Event information
      doc.text(`Event Date: ${formatDate(new Date(event.date))}`, margin, yPos);
      yPos += 10;
      doc.text(`Location: ${event.location}`, margin, yPos);
      yPos += 10;

      // Ticket information
      doc.text(`Ticket Type: ${ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}`, margin, yPos);
      yPos += 10;
      doc.text(`Quantity: ${ticket.quantity}`, margin, yPos);
      yPos += 10;
      doc.text(`Total Price: ${formatCurrency(ticket.price * ticket.quantity)}`, margin, yPos);
      yPos += 20;

      // Add separator line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 20;

      // Ticket details
      doc.setFontSize(10);
      doc.text(`Ticket ID: ${ticket.id}`, margin, yPos);
      yPos += 8;
      doc.text(`Purchase Date: ${formatDate(new Date(ticket.purchaseDate))}`, margin, yPos);
      yPos += 20;

      // Generate and add QR code
      try {
        const qrCodeDataUrl = await generateQRCode(ticket.id);
        if (qrCodeDataUrl) {
          const qrSize = 40;
          doc.addImage(
            qrCodeDataUrl,
            'PNG',
            pageWidth - margin - qrSize,
            yPos - 10,
            qrSize,
            qrSize
          );
        }
      } catch (qrError) {
        console.error('Error adding QR code:', qrError);
      }

      // Add footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        'This ticket is valid only with a matching ID. Present this ticket at the event entrance.',
        pageWidth / 2,
        doc.internal.pageSize.height - margin,
        { align: 'center' }
      );

      // Save the PDF
      doc.save(`${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_ticket_${ticket.id}.pdf`);

      toast.success("Ticket downloaded successfully", {
        description: "Your ticket has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to download ticket", {
        description: "There was an error generating your ticket. Please try again.",
      });
    }
  };

  // Match tickets with events
  const ticketsWithEvents = userTickets.map(ticket => {
    const event = events.find(e => e.id === ticket.eventId);
    return { ...ticket, event };
  });

  // Filter tickets based on date
  const now = new Date();
  const upcomingTickets = ticketsWithEvents.filter(ticket => 
    ticket.event && new Date(ticket.event.date) > now
  );
  
  const pastTickets = ticketsWithEvents.filter(ticket => 
    ticket.event && new Date(ticket.event.date) <= now
  );

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="flex gap-2">
              <TicketIcon className="h-4 w-4" />
              Upcoming Events
              <Badge className="ml-1 bg-event-600">{upcomingTickets.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="past">
              <Calendar className="h-4 w-4 mr-2" />
              Past Events
              <Badge variant="outline" className="ml-1">{pastTickets.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingTickets.length === 0 ? (
              <div className="text-center py-12">
                <TicketIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No upcoming tickets</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any tickets for upcoming events yet.
                </p>
                <Link to="/events">
                  <Button className="bg-event-600 hover:bg-event-700">Browse Events</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingTickets.map(ticket => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    event={ticket.event!} 
                    onDownload={() => handleDownloadTicket(ticket, ticket.event!)} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastTickets.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No past tickets</h3>
                <p className="text-muted-foreground">
                  You haven't attended any events yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastTickets.map(ticket => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    event={ticket.event!}
                    isPast 
                    onDownload={() => handleDownloadTicket(ticket, ticket.event!)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface TicketCardProps {
  ticket: Ticket;
  event: EventType;
  isPast?: boolean;
  onDownload: () => void;
}

const TicketCard = ({ ticket, event, isPast = false, onDownload }: TicketCardProps) => {
  return (
    <Card className={isPast ? "opacity-80" : ""}>
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className={`object-cover w-full h-full ${isPast ? "grayscale" : ""}`}
        />
        <div className="absolute top-2 right-2">
          <Badge variant={isPast ? "outline" : "default"} className={isPast ? "" : "bg-event-600"}>
            {ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{event.title}</h3>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <Calendar className="h-4 w-4 text-event-500" />
          <span className="text-xs">{formatDate(new Date(event.date))}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
          <MapPin className="h-4 w-4 text-event-500" />
          <span className="text-xs truncate">{event.location}</span>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-muted-foreground">Quantity</div>
            <div className="font-medium">{ticket.quantity} {ticket.quantity === 1 ? "ticket" : "tickets"}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="font-medium">{formatCurrency(ticket.price * ticket.quantity)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onDownload}>
          <DownloadIcon className="mr-1 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm">
          <QrCode className="mr-1 h-4 w-4" />
          View QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyTicketsPage;
