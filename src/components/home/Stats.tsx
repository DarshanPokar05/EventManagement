
const Stats = () => {
  return (
    <section className="bg-event-100 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          <div className="p-6">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-event-700">250K+</p>
            <p className="text-sm md:text-base font-medium text-muted-foreground mt-2">Events Created</p>
          </div>
          <div className="p-6">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-event-700">2.5M+</p>
            <p className="text-sm md:text-base font-medium text-muted-foreground mt-2">Tickets Sold</p>
          </div>
          <div className="p-6">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-event-700">50K+</p>
            <p className="text-sm md:text-base font-medium text-muted-foreground mt-2">Event Organizers</p>
          </div>
          <div className="p-6">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-event-700">100+</p>
            <p className="text-sm md:text-base font-medium text-muted-foreground mt-2">Countries</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
