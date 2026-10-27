import { images } from "./images";

export type Destination = {
  name: string;
  tagline: string;
  trips: number;
  highlights: string[];
  image: string;
  href: string;
};

export const destinations: Destination[] = [
  {
    name: "Nepal",
    tagline: "Eight of the world's ten highest peaks, and the warmest welcome in the Himalaya.",
    trips: 64,
    highlights: ["Everest", "Annapurna", "Langtang", "Kathmandu"],
    image: images.amaDablam,
    href: "#trips",
  },
  {
    name: "Tibet",
    tagline: "High plateaus, turquoise lakes and monasteries carved into the roof of the world.",
    trips: 28,
    highlights: ["Lhasa", "Mt. Kailash", "Everest North", "Shigatse"],
    image: images.sunsetPeaks,
    href: "#trips",
  },
  {
    name: "Bhutan",
    tagline: "The last Himalayan kingdom, where happiness is measured and forests are protected by law.",
    trips: 18,
    highlights: ["Paro", "Tiger's Nest", "Punakha", "Thimphu"],
    image: images.prayerWheels,
    href: "#trips",
  },
];
