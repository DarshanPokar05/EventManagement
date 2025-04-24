
const testimonials = [
  {
    quote: "EventFlow transformed how we manage our annual conference. The platform is intuitive and the analytics help us make better decisions for future events.",
    author: "Sarah Johnson",
    role: "Event Director, TechSummit",
  },
  {
    quote: "We increased our ticket sales by 40% after switching to EventFlow. The customizable pages and marketing tools made all the difference.",
    author: "Michael Chen",
    role: "Marketing Manager, MusicFest",
  },
  {
    quote: "The attendee management features are a game-changer. Check-ins are seamless and our guests love the mobile tickets.",
    author: "Priya Patel",
    role: "Operations Lead, Global Forum",
  },
];

const Testimonials = () => {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl">
          Trusted by Event Organizers Worldwide
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          See why thousands of event professionals choose our platform for their events.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="flex flex-col p-6 bg-background border rounded-lg shadow-sm">
            <div className="flex-1">
              <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
            </div>
            <div>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
