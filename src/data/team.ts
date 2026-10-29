import { images } from "./images";

// Placeholder people and portraits from Unsplash — swap for the real team and photos in /public when ready.
const portrait = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const departments = ["Leadership", "Trip planning", "Guides", "Operations"] as const;
export type Department = (typeof departments)[number];

export type TeamMember = { name: string; role: string; department: Department; image: string; years: number; languages: string };

export const team: TeamMember[] = [
  { name: "Tej Bir Shrestha", role: "Founder & Managing Director", department: "Leadership", image: images.avatar2, years: 20, languages: "English, Hindi, Nepali" },
  { name: "Pema Sherpa", role: "Head of Kailash Operations", department: "Leadership", image: portrait("1534528741775-53994a69daeb"), years: 14, languages: "Tibetan, English, Hindi" },
  { name: "Anjali Thapa", role: "Travel Designer", department: "Trip planning", image: images.avatar1, years: 8, languages: "English, Hindi, Nepali" },
  { name: "Maya Lama", role: "Senior Travel Designer", department: "Trip planning", image: portrait("1573496359142-b8d87734a5a2"), years: 10, languages: "English, Nepali, German" },
  { name: "Ramesh Gurung", role: "Senior Trek Leader", department: "Guides", image: portrait("1506794778202-cad84cf45f1d"), years: 16, languages: "English, Nepali" },
  { name: "Karma Dorje", role: "Kailash Yatra Leader", department: "Guides", image: portrait("1472099645785-5658abf4ff4e"), years: 12, languages: "Tibetan, Hindi, English" },
  { name: "Bikash Tamang", role: "Trek Leader, Everest & Langtang", department: "Guides", image: portrait("1539571696357-5a69c17a67c6"), years: 9, languages: "English, Nepali, Japanese" },
  { name: "Tenzin Norbu", role: "Tibet Permits & Logistics", department: "Operations", image: portrait("1500648767791-00dcc994a43e"), years: 11, languages: "Tibetan, Mandarin, English" },
  { name: "Sita Rai", role: "Guest Care Lead", department: "Operations", image: images.avatar3, years: 6, languages: "English, Nepali, French" },
];

export const teamStats = [
  { value: 45, label: "Licensed guides and trek leaders" },
  { value: 9, label: "Languages spoken across the team" },
  { value: 30, suffix: "+", label: "Kailash koras led by Karma alone" },
  { value: 100, suffix: "%", label: "Guides certified in wilderness first aid" },
];
