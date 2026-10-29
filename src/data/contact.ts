import { site } from "./site";

export const TIMEZONE = "Asia/Kathmandu";

/** Office hours in Kathmandu time. Days use JS numbering (0 = Sunday); Nepal's weekend is Saturday. */
export const officeHours = [
  { label: "Sunday – Friday", days: [0, 1, 2, 3, 4, 5], open: 9, close: 18 },
  { label: "Saturday", days: [6], open: 10, close: 14 },
];

const digits = (n: string) => n.replace(/\D/g, "");

export const contactChannels = [
  { key: "whatsapp", label: "WhatsApp", value: site.whatsapp, note: "Fastest — usually under an hour", href: `https://wa.me/${digits(site.whatsapp)}` },
  { key: "phone", label: "Call us", value: site.phones[0], note: "Office hours, Kathmandu time", href: `tel:${digits(site.phones[0])}` },
  { key: "email", label: "Email", value: site.email, note: "A full reply within 24 hours", href: `mailto:${site.email}` },
  { key: "visit", label: "Visit the office", value: site.address[0], note: "Tea's on us — just drop by", href: "https://maps.google.com/?q=Kamaladi+Marg+Kathmandu" },
] as const;

export const contactTopics = ["Plan a new trip", "An existing booking", "Group or corporate travel", "Agent & partner", "Something else"];

export const contactFaqs = [
  { q: "How quickly will I hear back?", a: "Within 24 hours, every day of the year. WhatsApp messages during office hours are usually answered within the hour." },
  { q: "I'm already on a trip and need help.", a: "Call or WhatsApp the 24/7 emergency number on your trip documents — it rings straight through to our operations team." },
  { q: "Can I meet you before I book?", a: "Of course. Visit the Kamaladi office, or ask for a video call and we'll walk you through your route on a map." },
];
