
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedEvents from "@/components/events/FeaturedEvents";
import { events } from "@/data/events";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";
import EventsList from "@/components/events/EventsList";

const Index = () => {
  // Filter events to get only upcoming ones
  const upcomingEvents = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  return (
    <Layout>
      <Hero />
      <div className="container py-8 md:py-12">
        <FeaturedEvents events={events} />
      </div>
      <div className="container py-8 md:py-12">
        <EventsList events={upcomingEvents} title="Upcoming Events" />
      </div>
      <Features />
      <Stats />
      <Testimonials />
      <CtaSection />
    </Layout>
  );
};

export default Index;
