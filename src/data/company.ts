import { images } from "./images";

/** Every page under the "Company" menu, in menu order. Drives the navbar, footer, page heroes and cross-links. */
export const companyPages = [
  { label: "About Us", href: "/about", blurb: "How two guides and a borrowed jeep became GoHoliday.", image: images.swayambhu },
  { label: "Our Team", href: "/team", blurb: "The planners, guides and permit specialists behind every trip.", image: images.hikers },
  { label: "Legal Documents", href: "/legal-documents", blurb: "Our licences, registrations and memberships — open to check.", image: images.prayerWheels },
  { label: "Why Travel with Go Holiday?", href: "/why-travel-with-us", blurb: "What a locally owned operator does differently.", image: images.amaDablam },
  { label: "Payment Options", href: "/payment-options", blurb: "Deposits, balances and the ways you can pay.", image: images.phewaLake },
  { label: "Terms & Conditions", href: "/terms-and-conditions", blurb: "The fine print, written to be read.", image: images.boudha },
] as const;

export type CompanyHref = (typeof companyPages)[number]["href"];
