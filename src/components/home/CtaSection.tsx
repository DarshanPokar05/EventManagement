
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="container py-12 md:py-16">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="mesh-gradient absolute inset-0"></div>
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl mb-4">
              Ready to Create Your Next Amazing Event?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Join thousands of event organizers who trust our platform to create successful events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/create-event">
                <Button size="lg" className="bg-event-600 hover:bg-event-700">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
