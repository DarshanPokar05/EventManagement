
import { Event } from "@/types/event";

export const events: Event[] = [
  {
    id: "evt-001",
    title: "Summer Music Festival",
    description: "A three-day music festival featuring indie and alternative artists from around the world. Experience great music, food, and community in a beautiful outdoor setting.",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    location: "Central Park, New York",
    venue: "Meadow Stage",
    price: 89.99,
    capacity: 5000,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop",
    organizer: "SoundWave Productions",
    category: "Music",
    attendees: 3789,
    isFeatured: true
  },
  {
    id: "evt-002",
    title: "Tech Conference 2025",
    description: "Join tech industry leaders for a weekend of workshops, talks, and networking. Learn about the latest innovations in AI, blockchain, and web development.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    location: "San Francisco, CA",
    venue: "Innovation Center",
    price: 299.99,
    capacity: 2000,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    organizer: "TechConnect",
    category: "Technology",
    attendees: 1205,
    isFeatured: true
  },
  {
    id: "evt-003",
    title: "Food & Wine Festival",
    description: "Sample cuisine from top chefs and taste premium wines from across the globe at this annual culinary celebration.",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
    location: "Chicago, IL",
    venue: "Waterfront Plaza",
    price: 75.00,
    capacity: 1500,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    organizer: "Gourmet Events",
    category: "Food",
    attendees: 985,
  },
  {
    id: "evt-004",
    title: "Business Leadership Summit",
    description: "Network with business leaders and attend workshops on leadership, management, and entrepreneurship.",
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
    location: "Boston, MA",
    venue: "Harbor Conference Center",
    price: 349.99,
    capacity: 800,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    organizer: "Business Growth Network",
    category: "Business",
    attendees: 412,
  },
  {
    id: "evt-005",
    title: "Fitness Expo",
    description: "Explore the latest in fitness equipment, nutrition supplements, and workout techniques. Join classes and meet fitness influencers.",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    location: "Los Angeles, CA",
    venue: "Convention Center",
    price: 35.00,
    capacity: 3000,
    image: "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=1200&auto=format&fit=crop",
    organizer: "FitLife Expos",
    category: "Health",
    attendees: 1850,
  },
  {
    id: "evt-006",
    title: "Art Exhibition: Modern Perspectives",
    description: "View works from contemporary artists exploring themes of identity, technology, and society in the modern world.",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    location: "Miami, FL",
    venue: "Contemporary Art Museum",
    price: 25.00,
    capacity: 500,
    image: "https://images.unsplash.com/photo-1545033131-485ea67fd7c3?q=80&w=1200&auto=format&fit=crop",
    organizer: "Arts Alliance",
    category: "Arts",
    attendees: 328,
  }
];
