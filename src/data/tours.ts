import { images } from "./images";
import type { Difficulty, ElevationPoint } from "./trips";

export type CategorySlug = "kailash" | "nepal" | "tibet" | "tibet-treks" | "bhutan";

export type TourCategory = {
  slug: CategorySlug;
  name: string;
  /** Supports *emphasis*. */
  title: string;
  intro: string;
  image: string;
  /** 1–12; months with the best conditions. */
  bestMonths: number[];
  highlights: { title: string; text: string }[];
  includes: string[];
  excludes: string[];
  faqs: { q: string; a: string }[];
};

export type ItineraryDay = {
  /** Short place name used for the route profile. */
  place: string;
  altitude: number;
  title: string;
  text: string;
  stay?: string;
};

export type Tour = {
  slug: string;
  category: CategorySlug;
  title: string;
  tagline: string;
  days: number;
  maxAltitude: number;
  difficulty: Difficulty;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  gallery: string[];
  badge?: "Bestseller" | "New" | "Small group" | "Luxury";
  groupSize: string;
  start: string;
  end: string;
  transport: string;
  accommodation: string;
  highlights: string[];
  itinerary: ItineraryDay[];
};

const day = (place: string, altitude: number, title: string, text: string, stay?: string): ItineraryDay => ({ place, altitude, title, text, stay });

// Every Kailash journey shares the same high-plateau core: Saga → Manasarovar → the three-day kora.
const kailashCore = (from = "Saga"): ItineraryDay[] => [
  day("Manasarovar", 4590, `${from} to Lake Manasarovar`, "A long, spectacular drive across the plateau to the first sight of Kailash rising above the turquoise lake.", "Lakeside guesthouse"),
  day("Manasarovar", 4590, "Puja and parikrama at Manasarovar", "Sunrise rituals on the shore, a holy dip for those who wish, and a drive around the lake past Chiu Gompa.", "Lakeside guesthouse"),
  day("Darchen", 4575, "Manasarovar to Darchen", "A short drive to the gateway town of the kora. Meet your yaks and porters, pack light and rest.", "Hotel"),
  day("Dirapuk", 4900, "Kora day 1 — Darchen to Dirapuk", "Walk the Lha Chu valley beneath red cliffs to Dirapuk, facing Kailash's sheer north face at sunset.", "Guesthouse"),
  day("Dolma La", 5630, "Kora day 2 — over the Dolma La", "The hardest and holiest day: up to the 5,630 m pass draped in prayer flags, then down past Gauri Kund to Zuthulpuk.", "Guesthouse"),
  day("Darchen", 4575, "Kora day 3 — back to Darchen", "An easy morning walk out of the valley to complete the circuit, then a celebratory lunch.", "Hotel"),
];

const nepalIncludes = [
  "Airport transfers in a private vehicle",
  "Licensed English-speaking guide",
  "Porters (1 per 2 travellers) on treks",
  "All permits and national park fees",
  "Accommodation as per itinerary",
  "Breakfast daily, all meals on trek",
  "First-aid kit and pulse oximeter",
];

const tibetIncludes = [
  "Chinese group visa and Tibet Travel Permit",
  "Kailash, Alien's and military permits",
  "Tibetan English-speaking guide",
  "Private Land Cruiser or coach with driver",
  "Accommodation as per itinerary",
  "All meals during the Tibet section",
  "Yak and porter support on the kora",
  "Oxygen cylinders and first-aid kit",
];

const commonExcludes = ["International flights", "Travel insurance with high-altitude cover", "Tips for guides, drivers and porters", "Personal expenses and drinks", "Single supplement"];

export const tourCategories: TourCategory[] = [
  {
    slug: "kailash",
    name: "Kailash Tours",
    title: "Journeys to *Mount Kailash*",
    intro:
      "Circle the most sacred mountain in Asia and bathe in the waters of Lake Manasarovar. Overland, by helicopter or via Lhasa — every route handled end-to-end, permits and all.",
    image: images.sunsetPeaks,
    bestMonths: [5, 6, 7, 8, 9],
    highlights: [
      { title: "The 52 km kora", text: "Three days around the mountain, crossing the 5,630 m Dolma La with yak and porter support." },
      { title: "Lake Manasarovar", text: "Sunrise puja on the shores of the highest freshwater lake in the world." },
      { title: "Every permit handled", text: "Visa, Tibet Travel Permit and Kailash permits processed by our Lhasa office." },
    ],
    includes: tibetIncludes,
    excludes: [...commonExcludes, "Horse or palanquin hire on the kora"],
    faqs: [
      { q: "How fit do I need to be?", a: "The kora is a high-altitude walk of 15–22 km a day. If you can hike 5–6 hours comfortably, with some preparation, you can do it. Ponies are available for those who need them." },
      { q: "When are the Tibet permits issued?", a: "We apply 20 days before departure. You'll need a passport valid for six months and a scan of it when booking." },
      { q: "What about altitude sickness?", a: "Itineraries build in acclimatization days and our guides carry oxygen and a pulse oximeter. We check everyone's levels morning and evening." },
    ],
  },
  {
    slug: "nepal",
    name: "Nepal Tours",
    title: "Nepal, *end to end*",
    intro:
      "From Everest's front door to the lakes of Pokhara and the temples of Kathmandu Valley — treks and tours led by guides who grew up in these hills.",
    image: images.amaDablam,
    bestMonths: [3, 4, 5, 10, 11, 12],
    highlights: [
      { title: "Eight 8,000 m peaks", text: "Trek beneath Everest, Lhotse, Annapurna and more on classic and hidden trails." },
      { title: "Living heritage", text: "Seven UNESCO sites in Kathmandu Valley alone, from Boudhanath to Bhaktapur." },
      { title: "Teahouse hospitality", text: "Family-run lodges, dal bhat refuels and the warmest welcome in the Himalaya." },
    ],
    includes: nepalIncludes,
    excludes: [...commonExcludes, "Nepal visa fee (on arrival)", "Lunch and dinner in Kathmandu and Pokhara"],
    faqs: [
      { q: "Do I need a visa for Nepal?", a: "Most nationalities get a visa on arrival at Kathmandu airport. 15, 30 and 90-day options are available." },
      { q: "Can I go private?", a: "Yes — every itinerary can run privately on your dates at no extra planning fee." },
      { q: "Is there Wi-Fi on trek?", a: "Most teahouses have paid Wi-Fi, and we can arrange a local SIM card on arrival." },
    ],
  },
  {
    slug: "tibet",
    name: "Tibet Tours",
    title: "Across the *roof of the world*",
    intro: "Monasteries carved into mountainsides, the Potala Palace and Everest's north face — Tibet by road, at an unhurried pace.",
    image: images.prayerWheels,
    bestMonths: [4, 5, 6, 9, 10],
    highlights: [
      { title: "Lhasa's great monasteries", text: "Potala Palace, Jokhang Temple and the debating monks of Sera." },
      { title: "Everest north face", text: "Stand at Rongbuk, the highest monastery in the world, under the north face of Everest." },
      { title: "Friendship Highway", text: "One of the great road journeys, across passes over 5,000 m." },
    ],
    includes: tibetIncludes,
    excludes: commonExcludes,
    faqs: [
      { q: "Can I travel independently in Tibet?", a: "No — foreign travellers must be on a guided tour with permits. We handle everything." },
      { q: "Is Tibet open all year?", a: "Tibet usually closes to foreign visitors from late February to early April. We'll confirm before you book." },
    ],
  },
  {
    slug: "tibet-treks",
    name: "Tibet Treks",
    title: "Walk the *Tibetan plateau*",
    intro: "Wild, empty trails between monasteries and base camps, with yak support and nomad camps along the way.",
    image: images.hikers,
    bestMonths: [5, 6, 7, 8, 9],
    highlights: [
      { title: "Nomad country", text: "Camp beside black-tent herders on high grassland valleys." },
      { title: "Fully supported", text: "Camping crew, cook and yaks carry everything — you carry a daypack." },
      { title: "Remote and quiet", text: "Trails few trekkers ever see, between ancient monasteries." },
    ],
    includes: [...tibetIncludes, "Camping equipment and camp crew"],
    excludes: [...commonExcludes, "Sleeping bag (rentable in Kathmandu)"],
    faqs: [{ q: "Are these treks camping?", a: "Yes — most nights are in tents with a dining tent, cook and toilet tent. A few nights are in guesthouses." }],
  },
  {
    slug: "bhutan",
    name: "Bhutan Tours",
    title: "Bhutan, the *last kingdom*",
    intro: "Cliffside monasteries, prayer-flag passes and a country that measures success in happiness. Small groups, local guides.",
    image: images.prayerFlags,
    bestMonths: [3, 4, 5, 9, 10, 11],
    highlights: [
      { title: "Tiger's Nest", text: "Hike to Paro Taktsang, clinging to a cliff 900 m above the valley." },
      { title: "Festivals", text: "Time your trip with a tshechu — masked dances in dzong courtyards." },
      { title: "All-inclusive", text: "Sustainable Development Fee, visa, guide and meals are all included." },
    ],
    includes: ["Bhutan visa and Sustainable Development Fee", "Licensed Bhutanese guide and driver", "3-star hotels or farmstays", "All meals", "Entrance fees to dzongs and museums"],
    excludes: commonExcludes,
    faqs: [{ q: "Why is Bhutan more expensive?", a: "Bhutan charges a daily Sustainable Development Fee that funds free healthcare and education. It's included in our price." }],
  },
];

export const tours: Tour[] = [
  // ——— Kailash ———
  {
    slug: "kailash-mansarovar-overland-tour",
    category: "kailash",
    title: "Kailash Mansarovar Overland Tour",
    tagline: "The classic road journey from Kathmandu to the holy mountain via Kerung.",
    days: 14,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 2850,
    rating: 5,
    reviews: 142,
    location: "Western Tibet",
    image: images.sunsetPeaks,
    gallery: [images.sunsetPeaks, images.prayerFlags, images.hikers, images.alpineValley],
    badge: "Bestseller",
    groupSize: "2 – 16",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Private coach & Land Cruiser",
    accommodation: "Hotels & guesthouses",
    highlights: ["Full 3-day Kailash kora over the Dolma La", "Puja and holy dip at Lake Manasarovar", "Gradual acclimatization via Kerung", "Yak and porter support on the kora"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Airport pickup, permit briefing and a welcome dinner in Thamel.", "Hotel"),
      day("Syabrubesi", 1460, "Drive to Syabrubesi", "A scenic drive north through the Trishuli valley to the border region.", "Lodge"),
      day("Kerung", 2700, "Cross into Tibet at Rasuwagadhi", "Immigration at the border, then on to the forested town of Kerung.", "Hotel"),
      day("Kerung", 2700, "Acclimatization in Kerung", "A rest day with a short hike above town to help your body adjust.", "Hotel"),
      day("Saga", 4600, "Kerung to Saga", "Climb onto the plateau past Peiku Tso lake, with views of Shishapangma.", "Hotel"),
      ...kailashCore(),
      day("Saga", 4600, "Darchen to Saga", "Retrace the plateau road east to Saga.", "Hotel"),
      day("Kerung", 2700, "Saga to Kerung", "Descend into greener country and thicker air.", "Hotel"),
      day("Kathmandu", 1400, "Back to Kathmandu", "Cross the border and drive back to the valley for a farewell dinner.", "Hotel"),
    ],
  },
  {
    slug: "kailash-mansarovar-yatra-by-helicopter",
    category: "kailash",
    title: "Kailash Mansarovar Yatra by Helicopter",
    tagline: "Skip the long drives — fly to the Tibetan border and reach the lake in days.",
    days: 11,
    maxAltitude: 5630,
    difficulty: "Moderate",
    price: 4950,
    rating: 5,
    reviews: 88,
    location: "Simikot – Western Tibet",
    image: images.alpineValley,
    gallery: [images.alpineValley, images.sunsetPeaks, images.prayerFlags, images.everestStupa],
    badge: "Luxury",
    groupSize: "2 – 12",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Flights, helicopter & Land Cruiser",
    accommodation: "Best available hotels",
    highlights: ["Helicopter from Simikot to Hilsa", "Shortest route to Manasarovar", "Optional pony support on the kora", "Ideal for older pilgrims"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup, briefing and a visit to Pashupatinath.", "Hotel"),
      day("Nepalgunj", 150, "Fly to Nepalgunj", "A short flight to the plains on the Indian border.", "Hotel"),
      day("Simikot", 2910, "Fly to Simikot", "A dramatic mountain flight into Humla, then rest.", "Lodge"),
      day("Purang", 3700, "Helicopter to Hilsa, drive to Purang", "Fly up the Karnali gorge to Hilsa, cross the border and drive to Taklakot.", "Hotel"),
      ...kailashCore("Purang"),
      day("Kathmandu", 1400, "Return to Kathmandu", "Drive to Hilsa, helicopter to Simikot and connecting flights back to Kathmandu.", "Hotel"),
    ],
  },
  {
    slug: "kailash-yatra-via-lucknow",
    category: "kailash",
    title: "Kailash Yatra via Lucknow",
    tagline: "The most convenient route for pilgrims from India, starting in Lucknow.",
    days: 12,
    maxAltitude: 5630,
    difficulty: "Moderate",
    price: 3450,
    rating: 5,
    reviews: 64,
    location: "Lucknow – Western Tibet",
    image: images.prayerFlags,
    gallery: [images.prayerFlags, images.sunsetPeaks, images.alpineValley, images.swayambhu],
    groupSize: "4 – 20",
    start: "Lucknow",
    end: "Lucknow",
    transport: "Coach, flights & helicopter",
    accommodation: "Hotels & guesthouses",
    highlights: ["Pickup from Lucknow", "Vegetarian meals throughout", "Helicopter to the Tibet border", "Hindi-speaking tour leader"],
    itinerary: [
      day("Lucknow", 120, "Meet in Lucknow", "Group meeting, document check and orientation.", "Hotel"),
      day("Nepalgunj", 150, "Drive to Nepalgunj", "Cross into Nepal at Rupaidiha and continue to Nepalgunj.", "Hotel"),
      day("Simikot", 2910, "Fly to Simikot", "Mountain flight into the remote Humla district.", "Lodge"),
      day("Purang", 3700, "Helicopter to Hilsa, drive to Purang", "Cross the Tibetan border and rest in Taklakot.", "Hotel"),
      day("Purang", 3700, "Acclimatization in Purang", "A rest day with a short walk to Khorchak monastery.", "Hotel"),
      ...kailashCore("Purang"),
      day("Lucknow", 120, "Return to Lucknow", "Fly out via Simikot and Nepalgunj, and drive back to Lucknow.", undefined),
    ],
  },
  {
    slug: "kailash-mansarovar-tour-via-lhasa",
    category: "kailash",
    title: "Kailash Mansarovar Tour via Lhasa",
    tagline: "Pair the holy mountain with the monasteries of Lhasa and Shigatse.",
    days: 15,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 4290,
    rating: 5,
    reviews: 51,
    location: "Lhasa – Western Tibet",
    image: images.prayerWheels,
    gallery: [images.prayerWheels, images.sunsetPeaks, images.boudha, images.prayerFlags],
    groupSize: "2 – 14",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Flight & Land Cruiser",
    accommodation: "4-star in Lhasa, guesthouses en route",
    highlights: ["Potala Palace and Jokhang Temple", "Tashilhunpo Monastery in Shigatse", "Full Kailash kora", "Exit overland via Kerung"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and visa briefing.", "Hotel"),
      day("Lhasa", 3650, "Fly to Lhasa", "A spectacular Himalayan flight to Lhasa. Rest to acclimatize.", "Hotel"),
      day("Lhasa", 3650, "Potala Palace & Jokhang", "The winter palace of the Dalai Lamas and the spiritual heart of Tibet.", "Hotel"),
      day("Lhasa", 3650, "Sera & Drepung monasteries", "Watch the afternoon monk debates at Sera.", "Hotel"),
      day("Shigatse", 3840, "Drive to Shigatse", "Via Yamdrok Lake and the Karo La glacier.", "Hotel"),
      day("Saga", 4600, "Shigatse to Saga", "Cross high passes heading west.", "Hotel"),
      ...kailashCore(),
      day("Saga", 4600, "Darchen to Saga", "Drive back east to Saga.", "Hotel"),
      day("Kerung", 2700, "Saga to Kerung", "Descend toward the Nepal border.", "Hotel"),
      day("Kathmandu", 1400, "Back to Kathmandu", "Cross the border and drive to Kathmandu.", "Hotel"),
    ],
  },
  {
    slug: "kailash-lhasa-ebc-tour-from-beijing",
    category: "kailash",
    title: "Kailash Lhasa EBC Tour From Beijing",
    tagline: "The grand Tibet journey — Beijing to Lhasa, Everest Base Camp and Kailash.",
    days: 18,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 5600,
    rating: 5,
    reviews: 27,
    location: "Beijing – Tibet",
    image: images.everestStupa,
    gallery: [images.everestStupa, images.prayerWheels, images.sunsetPeaks, images.amaDablam],
    badge: "New",
    groupSize: "2 – 12",
    start: "Beijing",
    end: "Lhasa",
    transport: "Flights & Land Cruiser",
    accommodation: "4-star in cities, guesthouses en route",
    highlights: ["Everest Base Camp (north side)", "Lhasa, Gyantse and Shigatse", "Full Kailash kora", "One-way from Beijing"],
    itinerary: [
      day("Beijing", 50, "Arrive in Beijing", "Pickup and an evening briefing.", "Hotel"),
      day("Lhasa", 3650, "Fly to Lhasa", "Fly west onto the plateau. Rest and hydrate.", "Hotel"),
      day("Lhasa", 3650, "Potala Palace & Jokhang", "Lhasa's two great landmarks and the Barkhor kora.", "Hotel"),
      day("Lhasa", 3650, "Drepung & Sera", "Monastery visits and the monk debates.", "Hotel"),
      day("Gyantse", 3950, "Lhasa to Gyantse", "Over Kamba La to Yamdrok Lake and Karo La glacier.", "Hotel"),
      day("Shigatse", 3840, "Gyantse to Shigatse", "The Kumbum stupa and Tashilhunpo Monastery.", "Hotel"),
      day("Rongbuk", 5000, "Drive to Rongbuk", "Cross Gawu La for a panorama of four 8,000 m peaks.", "Guesthouse"),
      day("Everest BC", 5200, "Everest Base Camp", "Sunrise on the north face, then drive to Saga.", "Hotel"),
      ...kailashCore(),
      day("Saga", 4600, "Darchen to Saga", "Retrace the route east.", "Hotel"),
      day("Shigatse", 3840, "Saga to Shigatse", "Back along the Friendship Highway.", "Hotel"),
      day("Lhasa", 3650, "Shigatse to Lhasa", "A final evening in Lhasa.", "Hotel"),
      day("Lhasa", 3650, "Depart Lhasa", "Transfer to the airport or train station.", undefined),
    ],
  },
  {
    slug: "kailash-heli-tour-via-kerung",
    category: "kailash",
    title: "Kailash Heli Tour via Kerung",
    tagline: "Helicopter to the border, then the shortest overland route to the lake.",
    days: 10,
    maxAltitude: 5630,
    difficulty: "Moderate",
    price: 5250,
    rating: 5,
    reviews: 33,
    location: "Kerung – Western Tibet",
    image: images.amaDablam,
    gallery: [images.amaDablam, images.sunsetPeaks, images.alpineValley, images.prayerFlags],
    badge: "Luxury",
    groupSize: "2 – 6",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Helicopter & Land Cruiser",
    accommodation: "Best available hotels",
    highlights: ["Helicopter from Kathmandu to Timure", "Private Land Cruiser in Tibet", "Shortest overland route", "Small private group"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and briefing.", "Hotel"),
      day("Kerung", 2700, "Helicopter to Timure, drive to Kerung", "Fly over the Langtang range and cross the border.", "Hotel"),
      day("Saga", 4600, "Kerung to Saga", "Up onto the plateau via Peiku Tso.", "Hotel"),
      ...kailashCore(),
      day("Kathmandu", 1400, "Back to Kathmandu", "Drive to Kerung and helicopter back to Kathmandu.", "Hotel"),
    ],
  },
  {
    slug: "kailash-tour-via-lhasa-in-kerung-out",
    category: "kailash",
    title: "Kailash Tour via Lhasa In Kerung Out",
    tagline: "Fly into Lhasa, drive west across Tibet and exit overland to Nepal.",
    days: 14,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 3890,
    rating: 5,
    reviews: 46,
    location: "Lhasa – Kerung",
    image: images.boudha,
    gallery: [images.boudha, images.prayerWheels, images.sunsetPeaks, images.hikers],
    groupSize: "2 – 16",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Flight & Land Cruiser",
    accommodation: "Hotels & guesthouses",
    highlights: ["Two full days in Lhasa", "Drive the Friendship Highway", "Full Kailash kora", "No backtracking"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and briefing.", "Hotel"),
      day("Lhasa", 3650, "Fly to Lhasa", "Rest to acclimatize.", "Hotel"),
      day("Lhasa", 3650, "Potala Palace & Jokhang", "Lhasa's essential sights.", "Hotel"),
      day("Lhasa", 3650, "Sera Monastery", "Monk debates and the Barkhor.", "Hotel"),
      day("Shigatse", 3840, "Drive to Shigatse", "Via Yamdrok Lake.", "Hotel"),
      day("Saga", 4600, "Shigatse to Saga", "West along the Yarlung Tsangpo.", "Hotel"),
      ...kailashCore(),
      day("Kerung", 2700, "Darchen to Kerung", "A long drive south toward Nepal.", "Hotel"),
      day("Kathmandu", 1400, "Back to Kathmandu", "Cross the border and drive home.", "Hotel"),
    ],
  },
  {
    slug: "lhasa-ebc-kailash-tour",
    category: "kailash",
    title: "Lhasa EBC Kailash Tour",
    tagline: "Tibet's three great sights in one journey — Lhasa, Everest and Kailash.",
    days: 16,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 4650,
    rating: 5,
    reviews: 39,
    location: "Lhasa – Everest – Kailash",
    image: images.everestStupa,
    gallery: [images.everestStupa, images.prayerWheels, images.amaDablam, images.sunsetPeaks],
    badge: "Small group",
    groupSize: "2 – 10",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Flight & Land Cruiser",
    accommodation: "Hotels & guesthouses",
    highlights: ["Rongbuk and Everest north face", "Lhasa and Shigatse monasteries", "Full Kailash kora", "Exit overland via Kerung"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and briefing.", "Hotel"),
      day("Lhasa", 3650, "Fly to Lhasa", "Rest and acclimatize.", "Hotel"),
      day("Lhasa", 3650, "Potala Palace & Jokhang", "The heart of Tibetan Buddhism.", "Hotel"),
      day("Lhasa", 3650, "Drepung & Sera", "Monasteries and monk debates.", "Hotel"),
      day("Shigatse", 3840, "Drive to Shigatse", "Via Yamdrok Lake and Gyantse.", "Hotel"),
      day("Rongbuk", 5000, "Drive to Rongbuk", "Over Gawu La to the foot of Everest.", "Guesthouse"),
      day("Everest BC", 5200, "Everest Base Camp", "Sunrise on the north face, then on to Saga.", "Hotel"),
      ...kailashCore(),
      day("Saga", 4600, "Darchen to Saga", "Drive east.", "Hotel"),
      day("Kerung", 2700, "Saga to Kerung", "Down toward Nepal.", "Hotel"),
      day("Kathmandu", 1400, "Back to Kathmandu", "Cross the border and drive home.", "Hotel"),
    ],
  },
  {
    slug: "kailash-nandi-kora",
    category: "kailash",
    title: "Kailash Nandi Kora",
    tagline: "The inner kora to Nandi Parvat and Ashtapad, plus the full outer circuit.",
    days: 16,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 3650,
    rating: 5,
    reviews: 22,
    location: "Western Tibet",
    image: images.hikers,
    gallery: [images.hikers, images.sunsetPeaks, images.alpineValley, images.prayerFlags],
    badge: "Small group",
    groupSize: "2 – 10",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Coach & Land Cruiser",
    accommodation: "Hotels, guesthouses & camping",
    highlights: ["Inner kora to Nandi Parvat", "Ashtapad and the south face of Kailash", "Full outer kora", "Very small groups"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and briefing.", "Hotel"),
      day("Syabrubesi", 1460, "Drive to Syabrubesi", "North through the Trishuli valley.", "Lodge"),
      day("Kerung", 2700, "Cross into Tibet", "Border formalities at Rasuwagadhi.", "Hotel"),
      day("Kerung", 2700, "Acclimatization in Kerung", "Rest and a short hike.", "Hotel"),
      day("Saga", 4600, "Kerung to Saga", "Up onto the plateau.", "Hotel"),
      ...kailashCore(),
      day("Ashtapad", 5400, "Inner kora — Ashtapad", "Drive to Serlung and walk to Ashtapad, facing Kailash's south face.", "Camp"),
      day("Nandi Parvat", 5500, "Inner kora — Nandi Parvat", "Circle Nandi, the bull guarding Shiva's abode.", "Camp"),
      day("Saga", 4600, "Darchen to Saga", "Drive east.", "Hotel"),
      day("Kerung", 2700, "Saga to Kerung", "Descend toward Nepal.", "Hotel"),
      day("Kathmandu", 1400, "Back to Kathmandu", "Cross the border and drive home.", "Hotel"),
    ],
  },
  {
    slug: "kailash-overland-tour",
    category: "kailash",
    title: "Kailash Overland Tour",
    tagline: "Our best-value Kailash departure, on fixed group dates.",
    days: 13,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 2450,
    rating: 4,
    reviews: 118,
    location: "Western Tibet",
    image: images.alpineValley,
    gallery: [images.alpineValley, images.sunsetPeaks, images.hikers, images.prayerWheels],
    groupSize: "8 – 24",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Coach",
    accommodation: "Guesthouses",
    highlights: ["Best-value fixed departures", "Full Kailash kora", "Lake Manasarovar", "Shared group coach"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and briefing.", "Hotel"),
      day("Kerung", 2700, "Drive to Kerung", "A long day to the border and on to Kerung.", "Hotel"),
      day("Kerung", 2700, "Acclimatization in Kerung", "Rest and a short hike.", "Hotel"),
      day("Saga", 4600, "Kerung to Saga", "Up onto the plateau.", "Hotel"),
      ...kailashCore(),
      day("Saga", 4600, "Darchen to Saga", "Drive east.", "Hotel"),
      day("Kerung", 2700, "Saga to Kerung", "Descend toward Nepal.", "Hotel"),
      day("Kathmandu", 1400, "Back to Kathmandu", "Cross the border and drive home.", "Hotel"),
    ],
  },
  {
    slug: "gyirong-mt-kailash-tour",
    category: "kailash",
    title: "Gyirong – Mt. Kailash Kora",
    tagline: "The shortest overland Kailash route, from the Gyirong border.",
    days: 10,
    maxAltitude: 5630,
    difficulty: "Strenuous",
    price: 2650,
    rating: 5,
    reviews: 56,
    location: "Western Tibet",
    image: images.sunsetPeaks,
    gallery: [images.sunsetPeaks, images.alpineValley, images.prayerFlags, images.hikers],
    groupSize: "2 – 16",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Land Cruiser",
    accommodation: "Hotels & guesthouses",
    highlights: ["Shortest overland route", "Full Kailash kora", "Lake Manasarovar puja", "Private Land Cruiser"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and briefing.", "Hotel"),
      day("Kerung", 2700, "Drive to Gyirong", "Cross the border at Rasuwagadhi.", "Hotel"),
      day("Saga", 4600, "Gyirong to Saga", "Up onto the plateau.", "Hotel"),
      ...kailashCore(),
      day("Kathmandu", 1400, "Back to Kathmandu", "A long drive back via Gyirong.", "Hotel"),
    ],
  },

  // ——— Nepal ———
  {
    slug: "everest-base-camp-trek",
    category: "nepal",
    title: "Everest Base Camp Trek",
    tagline: "Walk in the footsteps of legends through Sherpa villages to the foot of the world's highest peak.",
    days: 14,
    maxAltitude: 5545,
    difficulty: "Strenuous",
    price: 1450,
    rating: 5,
    reviews: 128,
    location: "Khumbu, Nepal",
    image: images.amaDablam,
    gallery: [images.amaDablam, images.everestStupa, images.hikers, images.prayerFlags],
    badge: "Bestseller",
    groupSize: "2 – 12",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Flights to Lukla",
    accommodation: "Teahouses on trek",
    highlights: ["Sunrise from Kala Patthar (5,545 m)", "Tengboche Monastery", "Namche Bazaar", "Flight into Lukla"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and gear check.", "Hotel"),
      day("Phakding", 2610, "Fly to Lukla, trek to Phakding", "One of the world's great mountain flights.", "Teahouse"),
      day("Namche", 3440, "Trek to Namche Bazaar", "Cross suspension bridges to the Sherpa capital.", "Teahouse"),
      day("Namche", 3440, "Acclimatization in Namche", "Hike to the Everest View Hotel.", "Teahouse"),
      day("Tengboche", 3860, "Trek to Tengboche", "The Khumbu's great monastery, under Ama Dablam.", "Teahouse"),
      day("Dingboche", 4410, "Trek to Dingboche", "Into the high alpine valley.", "Teahouse"),
      day("Dingboche", 4410, "Acclimatization in Dingboche", "Hike up Nangkartshang for views of Makalu.", "Teahouse"),
      day("Lobuche", 4940, "Trek to Lobuche", "Past the climbers' memorials at Thukla.", "Teahouse"),
      day("Everest BC", 5364, "Gorak Shep & Base Camp", "Walk the moraine to Everest Base Camp.", "Teahouse"),
      day("Kala Patthar", 5545, "Kala Patthar, descend to Pheriche", "Sunrise on Everest, then down.", "Teahouse"),
      day("Namche", 3440, "Trek to Namche", "Back down the valley.", "Teahouse"),
      day("Lukla", 2860, "Trek to Lukla", "A final day on the trail.", "Teahouse"),
      day("Kathmandu", 1400, "Fly to Kathmandu", "Back to the valley.", "Hotel"),
      day("Kathmandu", 1400, "Depart", "Airport transfer.", undefined),
    ],
  },
  {
    slug: "mardi-himal-trek",
    category: "nepal",
    title: "Mardi Himal Ridge Trek",
    tagline: "A short, wild ridge walk with front-row views of Machhapuchhre and Annapurna South.",
    days: 7,
    maxAltitude: 4500,
    difficulty: "Moderate",
    price: 690,
    rating: 5,
    reviews: 91,
    location: "Annapurna, Nepal",
    image: images.prayerFlags,
    gallery: [images.prayerFlags, images.phewaLake, images.alpineValley, images.hikers],
    groupSize: "2 – 12",
    start: "Pokhara",
    end: "Pokhara",
    transport: "Private jeep",
    accommodation: "Teahouses",
    highlights: ["Mardi Himal High Camp", "Rhododendron forests", "Machhapuchhre up close", "Quiet trails"],
    itinerary: [
      day("Pokhara", 820, "Arrive in Pokhara", "Lakeside evening.", "Hotel"),
      day("Forest Camp", 2550, "Drive to Kande, trek to Forest Camp", "Through rhododendron forest.", "Teahouse"),
      day("Low Camp", 2970, "Trek to Low Camp", "First views of Machhapuchhre.", "Teahouse"),
      day("High Camp", 3580, "Trek to High Camp", "Out onto the ridge.", "Teahouse"),
      day("View Point", 4500, "Mardi Himal View Point", "Sunrise hike, then down to Siding.", "Teahouse"),
      day("Pokhara", 820, "Back to Pokhara", "Trek out and drive to the lake.", "Hotel"),
      day("Pokhara", 820, "Depart", "Transfer onward.", undefined),
    ],
  },
  {
    slug: "langtang-valley-trek",
    category: "nepal",
    title: "Langtang Valley Trek",
    tagline: "Glacier-carved valleys, Tamang hospitality and the cheese factory at Kyanjin Gompa.",
    days: 9,
    maxAltitude: 4984,
    difficulty: "Moderate",
    price: 780,
    rating: 5,
    reviews: 38,
    location: "Langtang, Nepal",
    image: images.alpineValley,
    gallery: [images.alpineValley, images.hikers, images.prayerFlags, images.amaDablam],
    groupSize: "2 – 12",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Private jeep",
    accommodation: "Teahouses",
    highlights: ["Kyanjin Ri (4,984 m)", "Tamang villages", "Close to Kathmandu", "Yak cheese at Kyanjin"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Pickup and briefing.", "Hotel"),
      day("Syabrubesi", 1460, "Drive to Syabrubesi", "Up the Trishuli valley.", "Lodge"),
      day("Lama Hotel", 2470, "Trek to Lama Hotel", "Along the Langtang Khola.", "Teahouse"),
      day("Langtang", 3430, "Trek to Langtang village", "Rebuilt after 2015.", "Teahouse"),
      day("Kyanjin", 3870, "Trek to Kyanjin Gompa", "The head of the valley.", "Teahouse"),
      day("Kyanjin Ri", 4984, "Climb Kyanjin Ri", "Panorama of Langtang Lirung.", "Teahouse"),
      day("Lama Hotel", 2470, "Trek down to Lama Hotel", "Back down the valley.", "Teahouse"),
      day("Syabrubesi", 1460, "Trek to Syabrubesi", "Out of the valley.", "Lodge"),
      day("Kathmandu", 1400, "Drive to Kathmandu", "Farewell dinner.", "Hotel"),
    ],
  },
  {
    slug: "kathmandu-heritage-tour",
    category: "nepal",
    title: "Kathmandu Valley Heritage",
    tagline: "Seven UNESCO sites, ancient courtyards and the living culture of the Newar people.",
    days: 4,
    maxAltitude: 1400,
    difficulty: "Easy",
    price: 420,
    rating: 4,
    reviews: 63,
    location: "Kathmandu, Nepal",
    image: images.swayambhu,
    gallery: [images.swayambhu, images.boudha, images.prayerWheels, images.everestStupa],
    groupSize: "1 – 16",
    start: "Kathmandu",
    end: "Kathmandu",
    transport: "Private car",
    accommodation: "Heritage hotel",
    highlights: ["Boudhanath and Swayambhunath", "Bhaktapur Durbar Square", "Patan's courtyards", "Newari cooking class"],
    itinerary: [
      day("Kathmandu", 1400, "Arrive in Kathmandu", "Evening walk in Thamel.", "Heritage hotel"),
      day("Kathmandu", 1400, "Swayambhu & Kathmandu Durbar Square", "The monkey temple and the old royal palace.", "Heritage hotel"),
      day("Bhaktapur", 1400, "Bhaktapur & Boudhanath", "Pottery square and the great stupa at dusk.", "Heritage hotel"),
      day("Patan", 1400, "Patan & depart", "Courtyards and the Golden Temple.", undefined),
    ],
  },
  {
    slug: "pokhara-lakeside-escape",
    category: "nepal",
    title: "Pokhara Lakeside Escape",
    tagline: "Sunrise at Sarangkot, paddling on Phewa Lake and paragliding above the valley.",
    days: 5,
    maxAltitude: 1600,
    difficulty: "Easy",
    price: 380,
    rating: 5,
    reviews: 47,
    location: "Pokhara, Nepal",
    image: images.phewaLake,
    gallery: [images.phewaLake, images.prayerFlags, images.alpineValley, images.swayambhu],
    groupSize: "1 – 16",
    start: "Pokhara",
    end: "Pokhara",
    transport: "Private car",
    accommodation: "Lakeside boutique hotel",
    highlights: ["Sunrise at Sarangkot", "Paragliding", "World Peace Pagoda", "Phewa Lake by boat"],
    itinerary: [
      day("Pokhara", 820, "Arrive in Pokhara", "Lakeside sunset.", "Hotel"),
      day("Sarangkot", 1600, "Sarangkot sunrise & paragliding", "Annapurna at dawn, then fly.", "Hotel"),
      day("Pokhara", 820, "Peace Pagoda & Phewa Lake", "Paddle across and hike up.", "Hotel"),
      day("Pokhara", 820, "Free day", "Caves, cafés or a short hike.", "Hotel"),
      day("Pokhara", 820, "Depart", "Transfer onward.", undefined),
    ],
  },

  // ——— Tibet ———
  {
    slug: "kathmandu-lhasa-overland-ebc",
    category: "tibet",
    title: "Kathmandu to Lhasa Overland via Everest Base Camp",
    tagline: "Cross the roof of the world by road — from Kerung over high passes to Everest's north face and the Potala Palace.",
    days: 8,
    maxAltitude: 5200,
    difficulty: "Strenuous",
    price: 1890,
    rating: 5,
    reviews: 74,
    location: "Tibet",
    image: images.everestStupa,
    gallery: [images.everestStupa, images.prayerWheels, images.amaDablam, images.boudha],
    badge: "Bestseller",
    groupSize: "2 – 16",
    start: "Kathmandu",
    end: "Lhasa",
    transport: "Land Cruiser",
    accommodation: "Hotels & guesthouses",
    highlights: ["Everest Base Camp (north side)", "Potala Palace", "Yamdrok Lake", "Tashilhunpo Monastery"],
    itinerary: [
      day("Kerung", 2700, "Kathmandu to Kerung", "Cross the border at Rasuwagadhi.", "Hotel"),
      day("Tingri", 4300, "Kerung to Tingri", "Up onto the plateau.", "Guesthouse"),
      day("Everest BC", 5200, "Everest Base Camp", "Rongbuk and the north face.", "Guesthouse"),
      day("Shigatse", 3840, "Drive to Shigatse", "Tashilhunpo Monastery.", "Hotel"),
      day("Gyantse", 3950, "Gyantse to Lhasa", "Via Yamdrok Lake.", "Hotel"),
      day("Lhasa", 3650, "Potala Palace & Jokhang", "Lhasa's essential sights.", "Hotel"),
      day("Lhasa", 3650, "Sera & Drepung", "Monk debates.", "Hotel"),
      day("Lhasa", 3650, "Depart Lhasa", "Airport transfer.", undefined),
    ],
  },
  {
    slug: "lhasa-city-tour",
    category: "tibet",
    title: "Lhasa City & Monasteries",
    tagline: "Five unhurried days in the holy city — palaces, pilgrims and butter-lamp temples.",
    days: 5,
    maxAltitude: 4300,
    difficulty: "Easy",
    price: 990,
    rating: 5,
    reviews: 29,
    location: "Lhasa, Tibet",
    image: images.prayerWheels,
    gallery: [images.prayerWheels, images.boudha, images.everestStupa, images.swayambhu],
    groupSize: "1 – 16",
    start: "Lhasa",
    end: "Lhasa",
    transport: "Private car",
    accommodation: "4-star hotel",
    highlights: ["Potala Palace", "Barkhor pilgrim circuit", "Sera monk debates", "Ganden Monastery"],
    itinerary: [
      day("Lhasa", 3650, "Arrive in Lhasa", "Rest to acclimatize.", "Hotel"),
      day("Lhasa", 3650, "Potala Palace & Jokhang", "The heart of Lhasa.", "Hotel"),
      day("Lhasa", 3650, "Sera & Drepung", "Monasteries and debates.", "Hotel"),
      day("Ganden", 4300, "Ganden Monastery", "A ridge-top monastery east of Lhasa.", "Hotel"),
      day("Lhasa", 3650, "Depart", "Airport transfer.", undefined),
    ],
  },

  // ——— Tibet treks ———
  {
    slug: "tingri-everest-base-camp-trek",
    category: "tibet-treks",
    title: "Tingri to Everest Base Camp Trek",
    tagline: "The old trade route from Tingri to Rongbuk on foot, with yak support.",
    days: 12,
    maxAltitude: 5200,
    difficulty: "Strenuous",
    price: 2390,
    rating: 5,
    reviews: 18,
    location: "Tingri, Tibet",
    image: images.hikers,
    gallery: [images.hikers, images.everestStupa, images.amaDablam, images.alpineValley],
    groupSize: "2 – 10",
    start: "Lhasa",
    end: "Kathmandu",
    transport: "Land Cruiser & yaks",
    accommodation: "Camping & guesthouses",
    highlights: ["Lamna La pass (5,150 m)", "Nomad camps", "Rongbuk Monastery", "Everest north face"],
    itinerary: [
      day("Lhasa", 3650, "Arrive in Lhasa", "Rest to acclimatize.", "Hotel"),
      day("Lhasa", 3650, "Lhasa sightseeing", "Potala Palace and Jokhang.", "Hotel"),
      day("Shigatse", 3840, "Drive to Shigatse", "Via Yamdrok Lake.", "Hotel"),
      day("Tingri", 4300, "Drive to Tingri", "Views of Cho Oyu.", "Guesthouse"),
      day("Lungjhang", 4600, "Trek to Lungjhang", "Across the Tingri plain.", "Camp"),
      day("Lamna La", 5150, "Over the Lamna La", "The trek's high pass.", "Camp"),
      day("Zommug", 4790, "Trek to Zommug", "Nomad pastures.", "Camp"),
      day("Rongbuk", 5000, "Trek to Rongbuk", "The highest monastery on earth.", "Guesthouse"),
      day("Everest BC", 5200, "Everest Base Camp", "Sunrise on the north face.", "Guesthouse"),
      day("Kerung", 2700, "Drive to Kerung", "Down toward Nepal.", "Hotel"),
      day("Kathmandu", 1400, "Back to Kathmandu", "Cross the border.", "Hotel"),
      day("Kathmandu", 1400, "Depart", "Airport transfer.", undefined),
    ],
  },
  {
    slug: "ganden-samye-trek",
    category: "tibet-treks",
    title: "Ganden to Samye Trek",
    tagline: "Tibet's classic monastery-to-monastery trek over two high passes.",
    days: 9,
    maxAltitude: 5250,
    difficulty: "Strenuous",
    price: 1790,
    rating: 5,
    reviews: 15,
    location: "Central Tibet",
    image: images.boudha,
    gallery: [images.boudha, images.hikers, images.prayerWheels, images.alpineValley],
    groupSize: "2 – 10",
    start: "Lhasa",
    end: "Lhasa",
    transport: "Land Cruiser & yaks",
    accommodation: "Camping & hotels",
    highlights: ["Ganden Monastery", "Shuga La & Chitu La passes", "Samye, Tibet's first monastery", "Herders' camps"],
    itinerary: [
      day("Lhasa", 3650, "Arrive in Lhasa", "Rest to acclimatize.", "Hotel"),
      day("Lhasa", 3650, "Lhasa sightseeing", "Potala and Jokhang.", "Hotel"),
      day("Ganden", 4300, "Drive to Ganden", "Meet the yak crew.", "Camp"),
      day("Yama Do", 4490, "Trek to Yama Do", "Through herders' valleys.", "Camp"),
      day("Shuga La", 5250, "Over the Shuga La", "The highest pass.", "Camp"),
      day("Chitu La", 5100, "Over the Chitu La", "Lakes and views.", "Camp"),
      day("Yamalung", 4000, "Trek to Yamalung", "A meditation hermitage.", "Camp"),
      day("Samye", 3600, "Trek to Samye", "Tibet's first monastery.", "Guesthouse"),
      day("Lhasa", 3650, "Drive to Lhasa", "Farewell dinner.", "Hotel"),
    ],
  },

  // ——— Bhutan ———
  {
    slug: "bhutan-cultural-tour",
    category: "bhutan",
    title: "Bhutan Cultural Journey",
    tagline: "Paro, Thimphu and Punakha — dzongs, passes and the Tiger's Nest.",
    days: 7,
    maxAltitude: 3120,
    difficulty: "Easy",
    price: 2190,
    rating: 5,
    reviews: 34,
    location: "Western Bhutan",
    image: images.prayerFlags,
    gallery: [images.prayerFlags, images.swayambhu, images.alpineValley, images.boudha],
    groupSize: "2 – 12",
    start: "Paro",
    end: "Paro",
    transport: "Private car",
    accommodation: "3-star hotels & farmstay",
    highlights: ["Tiger's Nest hike", "Punakha Dzong", "Dochula Pass", "Farmhouse dinner"],
    itinerary: [
      day("Paro", 2200, "Arrive in Paro", "Drive to Thimphu.", "Hotel"),
      day("Thimphu", 2330, "Thimphu sightseeing", "Buddha Dordenma and the weekend market.", "Hotel"),
      day("Dochula", 3100, "Over Dochula to Punakha", "108 chortens and Himalayan views.", "Hotel"),
      day("Punakha", 1250, "Punakha Dzong", "The most beautiful dzong in Bhutan.", "Farmstay"),
      day("Paro", 2200, "Drive to Paro", "Rinpung Dzong and the national museum.", "Hotel"),
      day("Tiger's Nest", 3120, "Hike to Tiger's Nest", "Paro Taktsang on its cliff.", "Hotel"),
      day("Paro", 2200, "Depart", "Airport transfer.", undefined),
    ],
  },
  {
    slug: "druk-path-trek",
    category: "bhutan",
    title: "Druk Path Trek",
    tagline: "A short high-route trek between Paro and Thimphu past alpine lakes.",
    days: 8,
    maxAltitude: 4200,
    difficulty: "Moderate",
    price: 2590,
    rating: 5,
    reviews: 12,
    location: "Paro – Thimphu",
    image: images.alpineValley,
    gallery: [images.alpineValley, images.prayerFlags, images.hikers, images.sunsetPeaks],
    groupSize: "2 – 10",
    start: "Paro",
    end: "Paro",
    transport: "Private car",
    accommodation: "Camping & hotels",
    highlights: ["Jimilang Tsho lake", "Views of Gangkar Puensum", "Phajoding monastery", "Tiger's Nest"],
    itinerary: [
      day("Paro", 2200, "Arrive in Paro", "Rest and explore.", "Hotel"),
      day("Tiger's Nest", 3120, "Hike to Tiger's Nest", "Acclimatization hike.", "Hotel"),
      day("Jele Dzong", 3480, "Trek to Jele Dzong", "Up through blue pine forest.", "Camp"),
      day("Jangchulakha", 3770, "Trek to Jangchulakha", "Along the ridge.", "Camp"),
      day("Jimilang Tsho", 3870, "Trek to Jimilang Tsho", "A trout-filled lake.", "Camp"),
      day("Labana", 4200, "Trek to Labana", "Past Simkota lake.", "Camp"),
      day("Thimphu", 2330, "Trek down to Thimphu", "Via Phajoding monastery.", "Hotel"),
      day("Paro", 2200, "Depart", "Airport transfer.", undefined),
    ],
  },
];

export const categoryHref = (slug: CategorySlug) => `/tours/${slug}`;
export const tourHref = (tour: Pick<Tour, "category" | "slug">) => `/tours/${tour.category}/${tour.slug}`;

export const getCategory = (slug: string) => tourCategories.find((c) => c.slug === slug);
export const getTour = (category: string, slug: string) => tours.find((t) => t.category === category && t.slug === slug);
export const toursIn = (category: CategorySlug) => tours.filter((t) => t.category === category);
export const findTour = (slug: string) => tours.find((t) => t.slug === slug);

/** Detail-page link for a home-page trip, or `fallback` when it has no tour page yet. */
export const tripHref = (slug: string, fallback = "#plan") => {
  const tour = findTour(slug);
  return tour ? tourHref(tour) : fallback;
};

// Landscape and culture shots (no portraits) used to top up short galleries.
const photoPool = Object.entries(images)
  .filter(([key]) => !key.startsWith("avatar"))
  .map(([, src]) => src);

/** The tour's own photos first, topped up from the shared pool so every gallery has `count` images. */
export const galleryFor = (tour: Tour, count = 8) => [...new Set([tour.image, ...tour.gallery, ...photoPool])].slice(0, count);

/** Collapses the itinerary into at most `max` distinct stops (always keeping start, peak and end) for the route chart. */
export function routeProfile(tour: Tour, max = 7): ElevationPoint[] {
  const stops: ElevationPoint[] = [];
  for (const d of tour.itinerary) {
    if (stops.at(-1)?.label !== d.place && !stops.some((s) => s.label === d.place)) stops.push({ label: d.place, altitude: d.altitude });
  }
  if (stops.length <= max) return stops;
  const peak = stops.reduce((best, s, i) => (s.altitude > stops[best].altitude ? i : best), 0);
  const keep = new Set([0, peak, stops.length - 1]);
  for (let i = 1; i < max - 1 && keep.size < max; i++) keep.add(Math.round((i * (stops.length - 1)) / (max - 1)));
  return [...keep].sort((a, b) => a - b).map((i) => stops[i]);
}

export type Departure = { date: string; status: "Guaranteed" | "Filling fast" | "Available"; seats: number; price: number };

const seasonStart: Record<CategorySlug, [number, number]> = {
  kailash: [2027, 5],
  nepal: [2026, 11],
  tibet: [2027, 4],
  "tibet-treks": [2027, 5],
  bhutan: [2026, 11],
};

/** Fixed upcoming group departures, spread across the category's season. */
export function departuresFor(tour: Tour): Departure[] {
  const [year, month] = seasonStart[tour.category];
  const seed = [...tour.slug].reduce((n, c) => n + c.charCodeAt(0), 0);
  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 1 + Math.floor(i / 2), i % 2 ? 18 : 4));
    const seats = ((seed + i * 7) % 9) + 2;
    const status = i === 0 ? "Guaranteed" : seats <= 4 ? "Filling fast" : "Available";
    return { date: date.toISOString().slice(0, 10), status, seats, price: tour.price + (i % 3 === 2 ? 150 : 0) };
  });
}
