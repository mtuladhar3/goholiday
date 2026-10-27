import { images } from "./images";

export type Blog = {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  href: string;
};

export const blogs: Blog[] = [
  {
    title: "The ultimate guide to acclimatization for high altitude treks",
    excerpt: "How to pace your climb, what to eat, and the warning signs every trekker should know before crossing 4,000 metres.",
    image: images.hikers,
    date: "Nov 22, 2024",
    readTime: "8 min read",
    category: "Trekking",
    href: "#journal",
  },
  {
    title: "Prayer wheels, stupas & butter lamps: a visitor's etiquette",
    excerpt: "A respectful traveller's guide to the sacred sites of the Kathmandu Valley.",
    image: images.prayerWheels,
    date: "Oct 08, 2024",
    readTime: "5 min read",
    category: "Culture",
    href: "#journal",
  },
  {
    title: "When to visit Tibet and Mt. Kailash",
    excerpt: "Permits, weather windows and festivals to plan around.",
    image: images.boudha,
    date: "Sep 15, 2024",
    readTime: "6 min read",
    category: "Planning",
    href: "#journal",
  },
  {
    title: "48 hours in Pokhara, slowly",
    excerpt: "Lakeside cafés, sunrise viewpoints and the best paragliding launch.",
    image: images.phewaLake,
    date: "Aug 29, 2024",
    readTime: "4 min read",
    category: "City guide",
    href: "#journal",
  },
];
