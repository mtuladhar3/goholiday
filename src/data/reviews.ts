import { images } from "./images";

export type Review = {
  name: string;
  country: string;
  rating: number;
  text: string;
  avatar: string;
  trip: string;
};

export const reviews: Review[] = [
  // Kailash and Tibet reviews lead.
  {
    name: "Daniel Okafor",
    country: "United Kingdom",
    rating: 5,
    text: "The Kailash kora was the hardest and most rewarding thing I've ever done. Their care at altitude made all the difference.",
    avatar: images.avatar2,
    trip: "Mt. Kailash Kora",
  },
  {
    name: "James Carter",
    country: "USA",
    rating: 5,
    text: "Overland from Kathmandu to Lhasa was spectacular. Smooth border crossing and fantastic stays along the way.",
    avatar: images.avatar2,
    trip: "Kathmandu to Lhasa",
  },
  {
    name: "Sarah Mitchell",
    country: "Australia",
    rating: 5,
    text: "Every detail, from permits to teahouses, was handled perfectly. Our guide was the most delightful and insightful companion.",
    avatar: images.avatar1,
    trip: "Everest Base Camp",
  },
  {
    name: "Elena García",
    country: "Spain",
    rating: 5,
    text: "Kathmandu's heritage sites came alive with our guide's stories. Small group, flexible schedule, genuinely warm people.",
    avatar: images.avatar3,
    trip: "Kathmandu Heritage",
  },
  {
    name: "Mia Schneider",
    country: "Germany",
    rating: 5,
    text: "Mardi Himal at sunrise is something I'll never forget. Honest advice, great gear checklist, zero stress.",
    avatar: images.avatar1,
    trip: "Mardi Himal",
  },
  {
    name: "Priya Raman",
    country: "India",
    rating: 5,
    text: "They tailored the whole itinerary around my parents' pace. Thoughtful, patient and always one step ahead.",
    avatar: images.avatar3,
    trip: "Pokhara Escape",
  },
];
