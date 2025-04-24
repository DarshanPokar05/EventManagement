import { Button } from "@/components/ui/button";
import { Calendar, Ticket, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-event-600" />
          <span className="text-xl font-bold">EventVibe</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/events" className="text-sm font-medium hover:text-event-600 transition-colors">
            Browse Events
          </Link>
          <Link to="/create-event" className="text-sm font-medium hover:text-event-600 transition-colors">
            Create Event
          </Link>
          <Link to="/my-tickets" className="text-sm font-medium hover:text-event-600 transition-colors">
            My Tickets
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-event-600 transition-colors">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Link to="/create-event">
            <Button size="sm" className="hidden md:flex">
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
          <Link to="/my-tickets">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Ticket className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
