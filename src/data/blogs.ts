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
    title: "Preparing for the Kailash kora: acclimatisation and the Dolma La",
    excerpt: "How to pace the climb, what to eat, and the warning signs every pilgrim should know before crossing 5,630 metres.",
    image: images.hikers,
    date: "Nov 22, 2024",
    readTime: "8 min read",
    category: "Kailash",
    href: "#journal",
  },
  {
    title: "Tibet permits, explained",
    excerpt: "Group visas, the Tibet Travel Permit and the extra papers for Kailash — and how long each one takes.",
    image: images.prayerFlags,
    date: "Oct 08, 2024",
    readTime: "5 min read",
    category: "Planning",
    href: "#journal",
  },
  {
    title: "When to visit Tibet and Mt. Kailash",
    excerpt: "Weather windows, closures and festivals like Saga Dawa to plan around.",
    image: images.sunsetPeaks,
    date: "Sep 15, 2024",
    readTime: "6 min read",
    category: "Planning",
    href: "#journal",
  },
  {
    title: "Three days in Lhasa, slowly",
    excerpt: "The Potala at sunrise, the Barkhor kora at dusk and the best butter tea in the old town.",
    image: images.prayerWheels,
    date: "Aug 29, 2024",
    readTime: "4 min read",
    category: "City guide",
    href: "#journal",
  },
];
