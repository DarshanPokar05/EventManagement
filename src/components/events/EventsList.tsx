
import { Event } from "@/types/event";
import EventCard from "./EventCard";

interface EventsListProps {
  events: Event[];
  title?: string;
}

const EventsList = ({ events, title }: EventsListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No events found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
