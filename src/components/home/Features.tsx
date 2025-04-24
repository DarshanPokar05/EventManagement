
import { Calendar, CreditCard, Mail, MapPin, Ticket, Users } from "lucide-react";

const features = [
  {
    title: "Easy Event Creation",
    description: "Create professional event pages with custom branding in minutes.",
    icon: Calendar,
  },
  {
    title: "Ticket Management",
    description: "Sell tickets online with flexible pricing options and secure checkout.",
    icon: Ticket,
  },
  {
    title: "Attendee Management",
    description: "Manage guest lists, track RSVPs, and communicate with attendees.",
    icon: Users,
  },
  {
    title: "Venue Booking",
    description: "Browse and book venues that match your event needs and budget.",
    icon: MapPin,
  },
  {
    title: "Payment Processing",
    description: "Accept payments securely with multiple payment methods.",
    icon: CreditCard,
  },
  {
    title: "Email Notifications",
    description: "Automated emails for confirmations, reminders, and updates.",
    icon: Mail,
  },
];

const Features = () => {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl">
          Everything You Need to Manage Events
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          From planning and promotion to ticket sales and check-ins, our platform simplifies every step of the event management process.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-all">
            <div className="p-2 rounded-full bg-event-100 text-event-700 mb-4">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
