import { images } from "./images";
import { findTour, tourHref } from "./tours";

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

type SlideCopy = Pick<HeroSlide, "name" | "location" | "title" | "description" | "image"> & { tour: string };

/** Days, altitude, price and link come from the tour itself so the slide never drifts from the tour page. */
const slide = ({ tour: slug, ...copy }: SlideCopy): HeroSlide => {
  const tour = findTour(slug);
  if (!tour) throw new Error(`Unknown tour: ${slug}`);
  return { ...copy, days: tour.days, altitude: tour.maxAltitude, price: tour.price, href: tourHref(tour) };
};

export const heroSlides: HeroSlide[] = [
  {
    name: "Kailash",
    location: "Western Tibet",
    title: "Circle the *sacred* mountain",
    description: "The three-day kora around Mt. Kailash, over the 5,630 m Dolma La with yak and porter support.",
    image: images.sunsetPeaks,
    tour: "kailash-mansarovar-overland-tour",
  },
  {
    name: "Manasarovar",
    location: "Western Tibet",
    title: "Bathe in the *holy* lake",
    description: "Sunrise puja and parikrama on the turquoise shores of Lake Manasarovar, reached by helicopter in days.",
    image: images.prayerFlags,
    tour: "kailash-mansarovar-yatra-by-helicopter",
  },
  {
    name: "Lhasa",
    location: "Central Tibet",
    title: "Rise to the *roof* of the world",
    description: "The Potala Palace, the Jokhang Temple and pilgrims circling the Barkhor at dusk.",
    image: images.prayerWheels,
    tour: "lhasa-city-tour",
  },
  {
    name: "Everest North",
    location: "Tingri, Tibet",
    title: "See Everest from the *north*",
    description: "Overland from Kathmandu across high passes to Rongbuk and the quiet north face of Chomolungma.",
    image: images.amaDablam,
    tour: "kathmandu-lhasa-overland-ebc",
  },
  {
    name: "Kathmandu",
    location: "Gateway to Tibet",
    title: "Where every *yatra* begins",
    description: "Every Kailash and Tibet journey starts here — stupas, old courtyards and a day to rest before the plateau.",
    image: images.swayambhu,
    tour: "kathmandu-heritage-tour",
  },
].map(slide);
