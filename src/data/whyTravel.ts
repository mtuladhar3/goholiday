import { images } from "./images";

/** Longer reasons for the "Why travel with us" page; the first one is shown large. */
export const whyReasons = [
  { title: "We run every trip ourselves", text: "No reselling, no handovers at the border. The team that plans your yatra is the team that leads it — in Nepal, Tibet and Bhutan.", image: images.everestStupa },
  { title: "Altitude done properly", text: "Oximeter checks twice a day, built-in rest days and guides empowered to turn back.", image: images.prayerFlags },
  { title: "Groups of 12 or fewer", text: "Room on the bus, time at every monastery, and a guide who knows your name.", image: images.hikers },
  { title: "Permits handled for you", text: "Our own Tibet permits desk files everything, tracks it and tells you the moment it's issued.", image: images.prayerWheels },
  { title: "Fair to porters", text: "Insured wages, proper kit and loads weighed at every trailhead — never over 20 kg.", image: images.alpineValley },
  { title: "Help at any hour", text: "A 24/7 WhatsApp line answered by someone in Kathmandu, not a call centre.", image: images.phewaLake },
];

/** GoHoliday vs. a typical overseas reseller. */
export const comparison = [
  { topic: "Who leads your trip", us: "Our own licensed guides", them: "Subcontracted to a local agency" },
  { topic: "Group size", us: "12 maximum, or private", them: "Often 20+" },
  { topic: "Permits", us: "In-house Tibet permits desk", them: "Passed between two or three agents" },
  { topic: "Acclimatization", us: "Rest days built into the price", them: "Sold as optional extras" },
  { topic: "Where your money goes", us: "Stays in the Himalaya", them: "Largely overseas mark-up" },
  { topic: "Support on the road", us: "24/7 from our Kathmandu office", them: "Office hours, different time zone" },
];
