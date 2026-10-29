// PLACEHOLDER — a starting draft only. Have the final wording reviewed by a lawyer before publishing.
export const termsUpdated = "2026-10-01";

export type TermsSection = { id: string; title: string; html: string };

export const termsSections: TermsSection[] = [
  {
    id: "booking",
    title: "Booking & your contract",
    html: `<p>Your contract is with GoHoliday Pvt. Ltd., Kamaladi, Kathmandu. It begins when we receive your deposit and send written confirmation.</p>
<ul><li>The person who makes the booking accepts these terms for everyone on it.</li><li>Please check your confirmation carefully and tell us of any mistakes within 7 days.</li></ul>`,
  },
  {
    id: "payments",
    title: "Prices & payments",
    html: `<p>Prices are in US dollars per person, based on the group size shown.</p>
<ul><li>A 25% deposit is due at booking; the balance is due 45 days before departure.</li><li>Bookings made within 45 days of departure must be paid in full.</li><li>Card payments carry a 3.5% processing fee.</li></ul>
<p>See <a href="/payment-options">Payment options</a> for every way to pay.</p>`,
  },
  {
    id: "cancel-you",
    title: "If you cancel",
    html: `<p>Cancellations must reach us in writing. Charges depend on how long before departure we hear from you:</p>
<ol><li>60 days or more — 10% of the trip price is retained.</li><li>59 to 30 days — 50% is retained.</li><li>29 to 15 days — 75% is retained.</li><li>Under 15 days or no-show — no refund.</li></ol>
<p>Permit and visa fees already paid to the authorities can't be refunded.</p>`,
  },
  {
    id: "cancel-us",
    title: "If we cancel or change your trip",
    html: `<p>We rarely cancel, but may have to if permits are withdrawn, borders close or safety is at risk.</p>
<ul><li>If we cancel before departure, you choose a full refund or a transfer to another date.</li><li>If a route must change on the trip, your guide will choose the safest alternative of similar value.</li></ul>`,
  },
  {
    id: "permits",
    title: "Permits, visas & passports",
    html: `<p>We apply for Tibet travel permits and the Kailash special permit on your behalf. You're responsible for a passport valid for six months after travel and for your Nepal visa.</p>
<p>Permits are issued by the Chinese authorities and may be delayed or refused at short notice. We'll do everything we can, but can't be held responsible for their decisions.</p>`,
  },
  {
    id: "insurance",
    title: "Travel insurance",
    html: `<p>Insurance is compulsory on every trip. Your policy must cover:</p>
<ul><li>Trekking or travel up to the maximum altitude of your itinerary (5,700 m for Kailash).</li><li>Emergency helicopter rescue and medical evacuation.</li><li>Cancellation and curtailment.</li></ul>`,
  },
  {
    id: "health",
    title: "Health & altitude",
    html: `<p>High-altitude travel is demanding. Please tell us about any medical condition when you book, and speak to your doctor before travelling.</p>
<p>Your guide may ask you to descend, rest or end your trip if your health is at risk. That decision is final and made for your safety.</p>`,
  },
  {
    id: "responsibility",
    title: "Our responsibility",
    html: `<p>We take care choosing every hotel, vehicle and partner. We aren't liable for events outside our control — weather, natural disasters, strikes, border closures or government action — or for loss of personal belongings.</p>`,
  },
  {
    id: "conduct",
    title: "Your conduct",
    html: `<p>Please respect local customs, sacred sites and the instructions of your guide. We may end the trip of anyone whose behaviour puts the group at risk, without refund.</p>`,
  },
  {
    id: "complaints",
    title: "Complaints",
    html: `<p>If something isn't right, tell your guide straight away so we can fix it on the spot. If it's still unresolved, write to us within 30 days of your return and we'll reply within 14 days.</p>`,
  },
  {
    id: "law",
    title: "Governing law",
    html: `<p>These terms are governed by the laws of Nepal, and any dispute falls under the courts of Kathmandu.</p>`,
  },
];
