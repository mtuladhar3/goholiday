import { categoryHref, findTour, tourHref } from "./tours";
import nepalGovernment from "../../public/partners/nepal.png";
import ntb from "../../public/partners/ntb.png";
import taan from "../../public/partners/taan.png";
import nma from "../../public/partners/nma.png";
import tripadvisor from "../../public/partners/tripadvisor.png";
import googleReviews from "../../public/partners/google.png";

export const site = {
  name: "goholiday",
  email: "hello@goholiday.com",
  phones: ["+977 1-4000000", "+977 9800000000"],
  whatsapp: "+977 9800000000",
  address: ["Kamaladi Marg, Kamaladi", "Kathmandu 44600, Nepal"],
  founded: 2010,
  copyrightYear: 2026,
};

/** Every home-page target the site links to. `plan` and `contact` exist on every page, so they stay page-local. */
export const anchors = {
  destinations: "/#destinations",
  trips: "/#trips",
  experiences: "/#experiences",
  treks: "/#treks",
  why: "/#why",
  journal: "/#journal",
  plan: "#plan",
  reviews: "/#reviews",
  contact: "#contact",
};

export type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

// Company pages don't exist yet — they point at the closest home-page section until they do.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Kailash Tours",
    href: categoryHref("kailash"),
    children: [
      "kailash-mansarovar-overland-tour",
      "kailash-mansarovar-yatra-by-helicopter",
      "kailash-yatra-via-lucknow",
      "kailash-mansarovar-tour-via-lhasa",
      "kailash-lhasa-ebc-tour-from-beijing",
      "kailash-heli-tour-via-kerung",
      "kailash-tour-via-lhasa-in-kerung-out",
      "lhasa-ebc-kailash-tour",
      "kailash-nandi-kora",
      "kailash-overland-tour",
    ].map((slug) => {
      const tour = findTour(slug)!;
      return { label: tour.title, href: tourHref(tour) };
    }),
  },
  { label: "Nepal Tours", href: categoryHref("nepal") },
  { label: "Tibet Tours", href: categoryHref("tibet") },
  { label: "Tibet Treks", href: categoryHref("tibet-treks") },
  { label: "Bhutan Tours", href: categoryHref("bhutan") },
  {
    label: "Company",
    href: anchors.why,
    children: [
      { label: "About Us", href: anchors.why },
      { label: "Our Team", href: anchors.plan },
      { label: "Legal Documents", href: "#" },
      { label: "Why Travel with Go Holiday?", href: anchors.why },
      { label: "Payment Options", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
  { label: "Contact", href: anchors.contact },
];

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Kailash", href: categoryHref("kailash") },
      { label: "Tibet", href: categoryHref("tibet") },
      { label: "Tibet treks", href: categoryHref("tibet-treks") },
      { label: "Nepal", href: categoryHref("nepal") },
      { label: "Bhutan", href: categoryHref("bhutan") },
      { label: "Trip of the month", href: anchors.treks },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why travel with us", href: anchors.why },
      { label: "Talk to an expert", href: anchors.plan },
      { label: "Reviews", href: anchors.reviews },
      { label: "Journal", href: anchors.journal },
    ],
  },
];

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export const partners = ["Nepal Tourism Board", "TAAN", "Tripadvisor Travellers\u2019 Choice", "KEEP", "Nepal Mountaineering Association", "Google 4.9\u2605"];

export const destinations = ["Everest", "Kailash", "Lhasa", "Bhutan", "Annapurna", "Langtang", "Pokhara", "Mustang"];

export const associations = [
  { name: "Government of Nepal", logo: nepalGovernment },
  { name: "Nepal Tourism Board", logo: ntb },
  { name: "Trekking Agencies' Association of Nepal", logo: taan },
  { name: "Nepal Mountaineering Association", logo: nma },
];

export const recommendedOn = [
  { name: "Tripadvisor", logo: tripadvisor, href: "#", note: "Travellers\u2019 Choice" },
  { name: "Google customer reviews", logo: googleReviews, href: "#", note: "4.9 average rating" },
];
