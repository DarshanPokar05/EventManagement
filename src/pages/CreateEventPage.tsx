import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Clock, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const CreateEventPage = () => {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newEvent = {
      id: uuidv4(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: new Date(`${formData.get("date")}T${formData.get("time")}`).toISOString(),
      location: formData.get("location") as string,
      venue: formData.get("venue") as string,
      price: parseFloat(formData.get("price") as string),
      capacity: parseInt(formData.get("capacity") as string),
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop", // Default image
      organizer: formData.get("organizer") as string,
      category: "General", // Default category
      attendees: 0,
    };

    // Get existing events from localStorage or use empty array
    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
    
    // Add new event
    const updatedEvents = [...existingEvents, newEvent];
    
    // Save to localStorage
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    setFormSubmitting(false);
    toast.success("Event created successfully!", {
      description: "Your event has been created and is now published.",
    });
    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="container py-6 md:py-8">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-event-600 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Create an Event</h1>
              <p className="text-muted-foreground mt-2">
                Fill out the form below to create your event
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Event Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" name="title" placeholder="Enter event title" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your event"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Date & Location</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" name="date" type="date" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" name="time" type="time" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="City, State" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="venue">Venue</Label>
                    <Input id="venue" name="venue" placeholder="Venue name" required />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Tickets & Capacity</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Ticket Price ($)</Label>
                      <Input id="price" name="price" type="number" min="0" step="0.01" placeholder="0.00" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="capacity">Event Capacity</Label>
                      <Input id="capacity" name="capacity" type="number" min="1" placeholder="100" required />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Organizer Information</h2>
                
                <div>
                  <Label htmlFor="organizer">Organizer Name</Label>
                  <Input id="organizer" name="organizer" placeholder="Organization or individual name" required />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-event-600 hover:bg-event-700"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Event
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Tips for a Successful Event</h3>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <div className="rounded-full bg-event-100 w-5 h-5 flex items-center justify-center text-event-600 flex-shrink-0">1</div>
                    <span>Add a compelling description that tells attendees what to expect</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="rounded-full bg-event-100 w-5 h-5 flex items-center justify-center text-event-600 flex-shrink-0">2</div>
                    <span>Upload a high-quality event image that captures attention</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="rounded-full bg-event-100 w-5 h-5 flex items-center justify-center text-event-600 flex-shrink-0">3</div>
                    <span>Price your tickets strategically based on your target audience</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="rounded-full bg-event-100 w-5 h-5 flex items-center justify-center text-event-600 flex-shrink-0">4</div>
                    <span>Share your event on social media to increase visibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-muted-foreground text-sm">
                  If you need assistance creating your event, check our help guides or contact our support team.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View Help Guides
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEventPage;
