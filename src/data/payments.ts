// PLACEHOLDER — replace the percentages, fees and bank details with the real ones before going live.
export const paymentSchedule = [
  { when: "When you book", share: 25, title: "Deposit", text: "Secures your place and lets us apply for permits and hold hotels." },
  { when: "45 days before departure", share: 75, title: "Balance", text: "The rest of the trip price. Tibet and Kailash permit fees are paid from this." },
  { when: "On the trip", share: 0, title: "Personal extras", text: "Tips, drinks, laundry and anything not listed in your inclusions." },
];

export const paymentMethods = [
  { name: "Bank transfer (SWIFT)", fee: "No fee from us", clears: "2–4 working days", best: "Large group bookings and balances", icon: "bank" },
  { name: "Card online", fee: "3.5% card fee", clears: "Instant", best: "Deposits from anywhere — Visa, Mastercard, Amex", icon: "card" },
  { name: "Wise", fee: "Wise's low fee", clears: "Same day", best: "Paying in your own currency", icon: "globe" },
  { name: "India — NEFT / UPI", fee: "No fee from us", clears: "Same day", best: "Kailash yatris paying in rupees", icon: "rupee" },
  { name: "In person, Kathmandu", fee: "Card fee only", clears: "Instant", best: "Cash (USD / NPR) or card at our office", icon: "office" },
] as const;

export const bankDetails = [
  { label: "Account name", value: "GoHoliday Pvt. Ltd." },
  { label: "Bank", value: "Bank name" },
  { label: "Account number", value: "0000 0000 0000 0000" },
  { label: "SWIFT / BIC", value: "XXXXNPKA" },
  { label: "Branch", value: "Kamaladi, Kathmandu" },
];

export const refundTiers = [
  { window: "60+ days before", refund: 90 },
  { window: "59 – 30 days", refund: 50 },
  { window: "29 – 15 days", refund: 25 },
  { window: "Under 15 days", refund: 0 },
];

export const paymentFaqs = [
  { q: "Which currency are prices in?", a: "All prices are in US dollars. Indian travellers can pay the rupee equivalent at the day's rate; we'll confirm the exact amount on your invoice." },
  { q: "Is my deposit refundable?", a: "Most of it is, depending on how far ahead you cancel — see the refund table above. Permit fees already paid to the Tibetan authorities can't be recovered." },
  { q: "Do I get a receipt?", a: "Yes. Every payment gets a numbered VAT receipt by email within one working day." },
  { q: "Can I pay in instalments?", a: "For trips booked more than four months out, yes — split the balance into as many payments as you like, as long as it's settled 45 days before departure." },
];
