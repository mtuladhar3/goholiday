import { images } from "./images";

export type Milestone = { year: number; title: string; text: string; image: string; altitude: number };

/** Our story, told as a climb — each milestone sits a little higher than the last. */
export const milestones: Milestone[] = [
  {
    year: 2010,
    title: "Two guides, one rented room",
    text: "Tej Bir and his brother open a two-desk office in Thamel with a borrowed jeep and a promise: plan every trip as if family were going.",
    image: images.swayambhu,
    altitude: 1400,
  },
  {
    year: 2013,
    title: "Our first Kailash kora",
    text: "Fourteen pilgrims from Mumbai circle the holy mountain with us. Every one of them crosses the Dolma La — and the yatra becomes our calling.",
    image: images.prayerFlags,
    altitude: 4630,
  },
  {
    year: 2016,
    title: "Rebuilding after the earthquake",
    text: "We pause tours for a season to help rebuild homes in Langtang, and start giving 5% of profits to mountain schools and clinics.",
    image: images.alpineValley,
    altitude: 3430,
  },
  {
    year: 2019,
    title: "Licensed for Tibet & Bhutan",
    text: "Our own Tibet permits desk and Bhutanese partners mean we run the whole journey end to end — no handovers at the border.",
    image: images.prayerWheels,
    altitude: 3656,
  },
  {
    year: 2026,
    title: "12,000 travellers later",
    text: "Forty-five guides, a Kamaladi office and the same promise we started with. The room is bigger; the welcome is not.",
    image: images.sunsetPeaks,
    altitude: 5636,
  },
];

export const values = [
  {
    title: "Locals, end to end",
    text: "No middlemen. The person who plans your trip works in the same office as the guide who leads it.",
    image: images.boudha,
  },
  {
    title: "Altitude is never rushed",
    text: "Acclimatization days are built in, not sold as extras. Guides carry oximeters and decide on safety, not schedules.",
    image: images.amaDablam,
  },
  {
    title: "Fair to the mountains",
    text: "Porters are paid fair, insured wages with proper kit. Loads are weighed. Nobody carries more than 20 kg.",
    image: images.hikers,
  },
  {
    title: "Honest from the first email",
    text: "Clear prices, real permit timelines and a straight answer when a route isn't right for you.",
    image: images.phewaLake,
  },
];
