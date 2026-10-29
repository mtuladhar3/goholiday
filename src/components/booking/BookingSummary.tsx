import Image from "next/image";
import { BALANCE_DAYS_BEFORE, DEPOSIT_SHARE } from "@/data/booking";
import { longDate, usd } from "@/lib/format";
import { site } from "@/data/site";
import { Calendar, Check, Phone, Users } from "@/components/ui/Icons";
import type { BookableTour } from "./types";

export type Quote = {
  perPerson: number;
  single: number;
  extras: { title: string; amount: number }[];
  total: number;
  deposit: number;
  /** ISO date, "now" when departure is too close for a later balance, or null before a date is picked. */
  balanceDue: string | "now" | null;
};

type BookingSummaryProps = {
  tour: BookableTour;
  date: string | null;
  travellers: number;
  quote: Quote;
};

/** Sticky trip card with a live price breakdown and what's due today. */
export default function BookingSummary({ tour, date, travellers, quote }: BookingSummaryProps) {
  const rows = [
    { label: `${usd(quote.perPerson)} × ${travellers} ${travellers === 1 ? "traveller" : "travellers"}`, amount: quote.perPerson * travellers },
    ...(quote.single ? [{ label: "Single rooms", amount: quote.single }] : []),
    ...quote.extras.map((e) => ({ label: e.title, amount: e.amount })),
  ];

  return (
    <div className="overflow-hidden rounded-panel border border-ink/10 bg-white">
      <div className="relative aspect-[2/1]">
        <Image src={tour.image} alt="" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-5 bottom-4 text-white">
          <p className="type-eyebrow text-white/70">{tour.category} · {tour.days} days</p>
          <p className="mt-1 text-xl font-medium leading-tight tracking-tight">{tour.title}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <ul className="grid gap-2 text-sm">
          <li className="flex items-center gap-3">
            <Calendar className="size-4 text-stone" />
            {date ? longDate(date) : "Start date — pick on the calendar"}
          </li>
          <li className="flex items-center gap-3">
            <Users className="size-4 text-stone" />
            {travellers} {travellers === 1 ? "traveller" : "travellers"}
          </li>
        </ul>

        <dl className="mt-5 grid gap-2 border-t border-ink/10 pt-5 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4">
              <dt className="text-stone">{r.label}</dt>
              <dd className="tabular-nums">{r.amount ? usd(r.amount) : "Included"}</dd>
            </div>
          ))}
          <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-4">
            <dt className="font-medium">Trip total</dt>
            <dd className="type-title tabular-nums">{usd(quote.total)}</dd>
          </div>
        </dl>

        <div className="mt-5 rounded-card bg-paper p-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-medium">Deposit to reserve · {DEPOSIT_SHARE * 100}%</p>
            <p className="text-xl font-medium tabular-nums text-navy">{usd(quote.deposit)}</p>
          </div>
          <p className="mt-1 text-sm text-stone">
            Balance {usd(quote.total - quote.deposit)}{" "}
            {quote.balanceDue === "now" ? "due on confirmation — you're travelling soon" : quote.balanceDue ? `due ${longDate(quote.balanceDue)}` : `due ${BALANCE_DAYS_BEFORE} days before departure`}
          </p>
        </div>

        <ul className="mt-5 grid gap-2 text-xs text-stone">
          {["No booking fees", "Free date change up to 30 days before", "Nothing is charged until we confirm availability"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="size-3.5 text-navy" strokeWidth={2.5} />
              {t}
            </li>
          ))}
        </ul>

        <a href={`tel:${site.whatsapp}`} className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-4 text-sm font-medium transition-colors hover:text-navy">
          <Phone className="size-4" /> Prefer to book by phone? {site.whatsapp}
        </a>
      </div>
    </div>
  );
}
