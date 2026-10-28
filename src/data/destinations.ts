import { images } from "./images";
import { categoryHref, toursIn, type CategorySlug } from "./tours";

export type Destination = {
  name: string;
  tagline: string;
  trips: number;
  highlights: string[];
  image: string;
  href: string;
};

const journeys = (...slugs: CategorySlug[]) => slugs.reduce((n, slug) => n + toursIn(slug).length, 0);

// Kailash first: it's what most travellers come to us for.
export const destinations: Destination[] = [
  {
    name: "Mt. Kailash",
    tagline: "The holiest mountain in Asia, circled on foot by pilgrims of four faiths, with Lake Manasarovar at its feet.",
    trips: journeys("kailash"),
    highlights: ["Kailash kora", "Dolma La", "Manasarovar", "Darchen"],
    image: images.sunsetPeaks,
    href: categoryHref("kailash"),
  },
  {
    name: "Tibet",
    tagline: "High plateaus, turquoise lakes and monasteries carved into the roof of the world.",
    trips: journeys("tibet", "tibet-treks"),
    highlights: ["Lhasa", "Potala Palace", "Everest North", "Shigatse"],
    image: images.everestStupa,
    href: categoryHref("tibet"),
  },
  {
    name: "Nepal",
    tagline: "The gateway to Tibet — and eight of the world's ten highest peaks for the days before or after.",
    trips: journeys("nepal"),
    highlights: ["Kathmandu", "Everest", "Annapurna", "Pokhara"],
    image: images.amaDablam,
    href: categoryHref("nepal"),
  },
  {
    name: "Bhutan",
    tagline: "The last Himalayan kingdom, where happiness is measured and forests are protected by law.",
    trips: journeys("bhutan"),
    highlights: ["Paro", "Tiger's Nest", "Punakha", "Thimphu"],
    image: images.prayerWheels,
    href: categoryHref("bhutan"),
  },
];
