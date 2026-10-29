// PLACEHOLDER prices — replace with the real supplements and add-on prices.
export const DEPOSIT_SHARE = 0.25;
export const BALANCE_DAYS_BEFORE = 45;
export const SINGLE_SUPPLEMENT = 450;
export const MAX_TRAVELLERS = 16;
/** Earliest start date offered, in days from today — Tibet permits take about three weeks. */
export const LEAD_TIME_DAYS = 21;

export const bookingSteps = ["Your trip", "Travellers", "Extras", "Review"] as const;

export const extras = [
  { id: "arrival", title: "Airport pickup & drop", text: "Met at Tribhuvan arrivals with a name board.", price: 0, per: "Included" },
  { id: "night", title: "Extra night in Kathmandu", text: "Boutique hotel in Thamel with breakfast — rest before the plateau.", price: 85, per: "per person" },
  { id: "valley", title: "Kathmandu valley day tour", text: "Pashupatinath, Boudhanath and Swayambhu with a private guide.", price: 60, per: "per person" },
  { id: "flight", title: "Everest mountain flight", text: "One-hour sunrise flight along the Himalaya from Kathmandu.", price: 240, per: "per person" },
  { id: "gear", title: "Kora gear hire", text: "Down jacket, sleeping bag and trekking poles, collected in Kathmandu.", price: 45, per: "per person" },
] as const;

export type ExtraId = (typeof extras)[number]["id"];

export const paymentChoices = [
  { id: "card", title: "Card online", text: "Visa, Mastercard or Amex · secure payment link by email" },
  { id: "bank", title: "Bank transfer", text: "SWIFT details on your invoice · no fee from us" },
  { id: "wise", title: "Wise", text: "Pay in your own currency" },
] as const;

export type PaymentChoice = (typeof paymentChoices)[number]["id"];
