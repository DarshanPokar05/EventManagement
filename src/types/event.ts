
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  location: string;
  venue: string;
  price: number;
  capacity: number;
  image: string;
  organizer: string;
  category: string;
  attendees: number;
  isFeatured?: boolean;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  quantity: number;
  type: "standard" | "vip" | "early-bird";
  price: number;
  status: "pending" | "confirmed" | "cancelled";
  purchaseDate: string; // ISO string
}
