
import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "@/lib/utils";

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  const featuredEvents = events.filter(event => event.isFeatured);
  
  return (
    <div className="relative">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {featuredEvents.map((event) => (
            <CarouselItem key={event.id}>
              <div className="relative w-full aspect-[21/9] overflow-hidden rounded-lg">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <div className="max-w-3xl">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{event.title}</h2>
                    <p className="text-white/90 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 text-event-300" />
                        <span className="text-sm text-white">{formatDate(new Date(event.date))}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <MapPin className="h-4 w-4 text-event-300" />
                        <span className="text-sm text-white">{event.location}</span>
                      </div>
                    </div>
                    <Link to={`/events/${event.id}`}>
                      <Button className="bg-event-600 hover:bg-event-700">
                        <Ticket className="mr-2 h-4 w-4" />
                        Book for {formatCurrency(event.price)}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default FeaturedEvents;
