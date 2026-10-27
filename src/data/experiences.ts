import { images } from "./images";

export type Experience = {
  title: string;
  tags: string[];
  blurb: string;
  image: string;
  href: string;
};

export const experiences: Experience[] = [
  { title: "Overland Tours", blurb: "Cross borders by road over high passes, past nomad camps and turquoise lakes.", tags: ["Tibet", "Bhutan", "Road trips"], image: images.sunsetPeaks, href: "#plan" },
  { title: "Heritage Walks", blurb: "Wander centuries-old stupas and palace squares with a local storyteller.", tags: ["UNESCO sites", "Old bazaars"], image: images.boudha, href: "#plan" },
  { title: "Mountain Flights", blurb: "Fly at eye level with Everest at sunrise — no trekking boots required.", tags: ["Everest", "Sunrise"], image: images.amaDablam, href: "#plan" },
  { title: "Monastery Stays", blurb: "Wake to chanting monks, learn to meditate and share butter tea at dawn.", tags: ["Meditation", "Butter tea"], image: images.prayerWheels, href: "#plan" },
  { title: "Lakeside Adventures", blurb: "Paddle Phewa Lake, paraglide over Pokhara and watch the Annapurnas glow.", tags: ["Paragliding", "Kayaking"], image: images.phewaLake, href: "#plan" },
  { title: "Wild Trails", blurb: "Quiet forest paths, red pandas and villages that rarely see visitors.", tags: ["Forests", "Wildlife"], image: images.alpineValley, href: "#plan" },
];
