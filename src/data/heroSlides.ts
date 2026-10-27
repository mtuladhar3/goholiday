import { images } from "./images";

export type HeroSlide = {
  /** Short name used in the slider navigation. */
  name: string;
  location: string;
  /** Words wrapped in *asterisks* render as italic serif. */
  title: string;
  description: string;
  image: string;
  days: number;
  altitude: number;
  price: number;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  {
    name: "Everest",
    location: "Khumbu, Nepal",
    title: "Walk where the *sky* begins",
    description: "Fourteen days through Sherpa villages and rhododendron forests to the foot of the world's highest mountain.",
    image: images.everestStupa,
    days: 14,
    altitude: 5545,
    price: 1450,
    href: "#plan",
  },
  {
    name: "Kailash",
    location: "Western Tibet",
    title: "Circle the *sacred* mountain",
    description: "A pilgrim's kora around Mt. Kailash and the turquoise stillness of Lake Manasarovar.",
    image: images.sunsetPeaks,
    days: 10,
    altitude: 5630,
    price: 2650,
    href: "#plan",
  },
  {
    name: "Annapurna",
    location: "Mardi Himal, Nepal",
    title: "Chase above the *clouds*",
    description: "A wild ridge walk with front-row views of Machhapuchhre, prayer flags snapping in the wind.",
    image: images.prayerFlags,
    days: 7,
    altitude: 4500,
    price: 690,
    href: "#plan",
  },
  {
    name: "Kathmandu",
    location: "Kathmandu Valley, Nepal",
    title: "Where every stone *prays*",
    description: "Seven UNESCO sites, hidden courtyards and the living culture of an ancient valley.",
    image: images.swayambhu,
    days: 4,
    altitude: 1400,
    price: 420,
    href: "#plan",
  },
  {
    name: "Pokhara",
    location: "Phewa Lake, Nepal",
    title: "Slow down by the *lake*",
    description: "Sunrise at Sarangkot, paddling on Phewa and paragliding over the valley.",
    image: images.phewaLake,
    days: 5,
    altitude: 1600,
    price: 380,
    href: "#plan",
  },
];
