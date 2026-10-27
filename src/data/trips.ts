import { images } from "./images";

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

export const trips: Trip[] = [
  {
    slug: "everest-base-camp-trek",
    title: "Everest Base Camp Trek",
    days: 14,
    maxAltitude: 5545,
    rating: 5,
    reviews: 128,
    difficulty: "Strenuous",
    price: 1450,
    location: "Khumbu, Nepal",
    image: images.amaDablam,
    excerpt: "Walk in the footsteps of legends through Sherpa villages to the foot of the world's highest peak.",
  },
  {
    slug: "kathmandu-lhasa-overland-ebc",
    title: "Kathmandu to Lhasa Overland via Everest Base Camp",
    days: 8,
    maxAltitude: 5200,
    rating: 5,
    reviews: 74,
    difficulty: "Strenuous",
    price: 1890,
    location: "Tibet",
    image: images.everestStupa,
    excerpt:
      "Cross the roof of the world by road — from the Kerung border over high passes to the north face of Everest and on to the Potala Palace.",
  },
  {
    slug: "gyirong-mt-kailash-tour",
    title: "Gyirong – Mt. Kailash Kora",
    days: 10,
    maxAltitude: 5630,
    rating: 5,
    reviews: 56,
    difficulty: "Strenuous",
    price: 2650,
    location: "Western Tibet",
    image: images.sunsetPeaks,
    excerpt: "A sacred kora around Mt. Kailash and the turquoise shores of Lake Manasarovar.",
  },
  {
    slug: "mardi-himal-trek",
    title: "Mardi Himal Ridge Trek",
    days: 7,
    maxAltitude: 4500,
    rating: 5,
    reviews: 91,
    difficulty: "Moderate",
    price: 690,
    location: "Annapurna, Nepal",
    image: images.prayerFlags,
    excerpt: "A short, wild ridge walk with front-row views of Machhapuchhre and Annapurna South.",
  },
  {
    slug: "kathmandu-heritage-tour",
    title: "Kathmandu Valley Heritage",
    days: 4,
    maxAltitude: 1400,
    rating: 4,
    reviews: 63,
    difficulty: "Easy",
    price: 420,
    location: "Kathmandu, Nepal",
    image: images.swayambhu,
    excerpt: "Seven UNESCO sites, ancient courtyards and the living culture of the Newar people.",
  },
  {
    slug: "pokhara-lakeside-escape",
    title: "Pokhara Lakeside Escape",
    days: 5,
    maxAltitude: 1600,
    rating: 5,
    reviews: 47,
    difficulty: "Easy",
    price: 380,
    location: "Pokhara, Nepal",
    image: images.phewaLake,
    excerpt: "Sunrise at Sarangkot, paddling on Phewa Lake and paragliding above the valley.",
  },
];

export const featuredTrips = trips;

export const popularTreks: Trip[] = [
  trips[0],
  trips[3],
  {
    slug: "langtang-valley-trek",
    title: "Langtang Valley Trek",
    days: 9,
    maxAltitude: 4984,
    rating: 5,
    reviews: 38,
    difficulty: "Moderate",
    price: 780,
    location: "Langtang, Nepal",
    image: images.alpineValley,
    excerpt: "Glacier-carved valleys, Tamang hospitality and the cheese factory at Kyanjin Gompa.",
  },
];

export const tripOfTheMonth = {
  trip: trips[1],
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
