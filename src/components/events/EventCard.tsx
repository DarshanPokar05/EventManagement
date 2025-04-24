
import { Event } from "@/types/event";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link to={`/events/${event.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full"
          />
          {event.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-event-600">Featured</Badge>
          )}
          <div className="absolute left-2 bottom-2">
            <Badge variant="secondary" className="font-medium">
              {event.category}
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
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Users className="h-4 w-4 text-event-500" />
            <span className="text-xs">{event.attendees} attending</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
          <div className="font-semibold">{formatCurrency(event.price)}</div>
          <div className="flex items-center gap-1 text-event-600">
            <Ticket className="h-4 w-4" />
            <span className="text-xs font-medium">Book Now</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
