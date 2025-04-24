import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="absolute inset-0 z-0 hero-gradient"></div>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Welcome to EventVibe
            </h1>
            <p className="mx-auto max-w-[700px] text-white/90 text-lg md:text-xl lg:text-2xl mt-4">
              Create, Manage, and Attend Amazing Events
            </p>
            <p className="mx-auto max-w-[700px] text-white/80 md:text-xl mt-2">
              Your all-in-one platform for event management and ticketing. Host memorable events or discover exciting experiences.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:items-center mt-8">
            <Link to="/events">
              <Button size="lg" className="bg-white text-event-700 hover:bg-gray-100">
                <Search className="mr-2 h-4 w-4" />
                Find Events
              </Button>
            </Link>
            <Link to="/create-event">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Calendar className="mr-2 h-4 w-4" />
                Host an Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
