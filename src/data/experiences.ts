import { images } from "./images";
import { categoryHref } from "./tours";

export type Experience = {
  title: string;
  tags: string[];
  blurb: string;
  image: string;
  href: string;
};

export const experiences: Experience[] = [
  { title: "The Kailash Kora", blurb: "Three days and 52 km around the holy mountain, crossing the 5,630 m Dolma La with yaks and porters.", tags: ["Pilgrimage", "Dolma La"], image: images.sunsetPeaks, href: categoryHref("kailash") },
  { title: "Helicopter Yatra", blurb: "Fly to Simikot and the Tibet border to reach Manasarovar in days — ideal for older pilgrims.", tags: ["Fastest route", "Senior-friendly"], image: images.amaDablam, href: categoryHref("kailash") },
  { title: "Lhasa & Monasteries", blurb: "The Potala Palace, the Jokhang and debating monks at Sera, with a Tibetan guide.", tags: ["Potala Palace", "Monasteries"], image: images.prayerWheels, href: categoryHref("tibet") },
  { title: "Overland Across Tibet", blurb: "Cross the Kerung border by Land Cruiser, over high passes and past nomad camps and turquoise lakes.", tags: ["Land Cruiser", "High passes"], image: images.everestStupa, href: categoryHref("tibet") },
  { title: "Everest North Face", blurb: "Stand at Rongbuk, the world's highest monastery, beneath Everest's quiet northern wall.", tags: ["Rongbuk", "Base camp"], image: images.alpineValley, href: categoryHref("tibet") },
  { title: "Tibetan Treks", blurb: "Walk between monasteries and base camps with yak support, sleeping in nomad camps along the way.", tags: ["Trekking", "Yak support"], image: images.hikers, href: categoryHref("tibet-treks") },
];
