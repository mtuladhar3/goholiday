import { findTour } from "./tours";

export type Difficulty = "Easy" | "Moderate" | "Strenuous";

export type Trip = {
  slug: string;
  title: string;
  days: number;
  maxAltitude: number;
  rating: number;
  reviews: number;
  difficulty: Difficulty;
  price: number;
  location: string;
  image: string;
  excerpt: string;
};

export type ElevationPoint = { label: string; altitude: number };

/** Homepage card for a tour — the tagline doubles as the excerpt. */
const fromTour = (slug: string): Trip => {
  const t = findTour(slug);
  if (!t) throw new Error(`Unknown tour: ${slug}`);
  const { title, days, maxAltitude, rating, reviews, difficulty, price, location, image, tagline } = t;
  return { slug, title, days, maxAltitude, rating, reviews, difficulty, price, location, image, excerpt: tagline };
};

// Kailash and Tibet lead every homepage list.
export const trips: Trip[] = [
  "kailash-mansarovar-overland-tour",
  "kailash-mansarovar-yatra-by-helicopter",
  "kailash-mansarovar-tour-via-lhasa",
  "kathmandu-lhasa-overland-ebc",
  "lhasa-ebc-kailash-tour",
  "lhasa-city-tour",
].map(fromTour);

export const featuredTrips = trips;

export const popularTreks: Trip[] = ["gyirong-mt-kailash-tour", "tingri-everest-base-camp-trek", "ganden-samye-trek"].map(fromTour);

export const tripOfTheMonth = {
  trip: fromTour("kathmandu-lhasa-overland-ebc"),
  month: "November",
  elevation: [
    { label: "Kathmandu", altitude: 1400 },
    { label: "Kerung", altitude: 2700 },
    { label: "Tingri", altitude: 4300 },
    { label: "Everest BC", altitude: 5200 },
    { label: "Shigatse", altitude: 3840 },
    { label: "Lhasa", altitude: 3650 },
  ] satisfies ElevationPoint[],
};
