"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Departure } from "@/data/tours";
import { longDate, usd } from "@/lib/format";
import { site } from "@/data/site";
import StarRating from "@/components/ui/StarRating";
import { ArrowUpRight, Check, ChevronDown, Minus, Phone, Plus } from "@/components/ui/Icons";

type BookingState = {
  departures: Departure[];
  basePrice: number;
  /** Index into `departures`, or -1 for a private trip on the traveller's own dates. */
  selected: number;
  select: (i: number) => void;
  travellers: number;
  setTravellers: (n: number) => void;
};

const BookingContext = createContext<BookingState | null>(null);

const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("Booking components must sit inside <BookingProvider>");
  return ctx;
};

/** Shares the chosen departure and party size between the departures list, the booking card and the mobile bar. */
export function BookingProvider({ departures, basePrice, children }: { departures: Departure[]; basePrice: number; children: ReactNode }) {
  const [selected, setSelected] = useState(0);
  const [travellers, setTravellersState] = useState(2);
  const setTravellers = (n: number) => setTravellersState(Math.min(16, Math.max(1, n)));
  return (
    <BookingContext.Provider value={{ departures, basePrice, selected, select: setSelected, travellers, setTravellers }}>{children}</BookingContext.Provider>
  );
}

const priceOf = (b: BookingState) => (b.selected >= 0 ? b.departures[b.selected].price : b.basePrice);

const statusStyle: Record<Departure["status"], string> = {
  Guaranteed: "bg-navy text-white",
  "Filling fast": "bg-saffron/10 text-saffron",
  Available: "bg-paper-deep text-ink",
};

export function BookingCard({ rating, reviews }: { rating: number; reviews: number }) {
  const b = useBooking();
  const price = priceOf(b);
  const total = price * b.travellers;

  return (
    <div id="book" className="scroll-mt-32 rounded-card border border-mist bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-stone">from</p>
          <p className="text-4xl font-medium tracking-tight">{usd(b.basePrice)}</p>
          <p className="text-sm text-stone">per person</p>
        </div>
        <div className="text-right text-xs text-stone">
          <StarRating value={rating} className="justify-end" />
          <p className="mt-1">{reviews} reviews</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <label className="relative block rounded-thumb border border-mist px-4 py-3 transition-colors focus-within:border-navy hover:border-navy">
          <span className="type-eyebrow text-stone">Departure</span>
          <select
            value={b.selected}
            onChange={(e) => b.select(Number(e.target.value))}
            className="mt-1 block w-full cursor-pointer appearance-none bg-transparent pr-6 font-medium outline-none"
          >
            {b.departures.map((d, i) => (
              <option key={d.date} value={i}>
                {longDate(d.date)} · {d.status}
              </option>
            ))}
            <option value={-1}>Private trip — my own dates</option>
          </select>
          <ChevronDown className="pointer-events-none absolute bottom-4 right-4 size-4 text-stone" />
        </label>

        <div className="flex items-center justify-between rounded-thumb border border-mist px-4 py-3">
          <span>
            <span className="type-eyebrow block text-stone">Travellers</span>
            <span className="mt-1 block font-medium">
              {b.travellers} {b.travellers === 1 ? "adult" : "adults"}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => b.setTravellers(b.travellers - 1)}
              disabled={b.travellers <= 1}
              aria-label="Remove a traveller"
              className="grid size-9 place-items-center rounded-full border border-mist transition-colors hover:border-navy hover:text-navy disabled:opacity-30"
            >
              <Minus className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => b.setTravellers(b.travellers + 1)}
              aria-label="Add a traveller"
              className="grid size-9 place-items-center rounded-full border border-mist transition-colors hover:border-navy hover:text-navy"
            >
              <Plus className="size-4" />
            </button>
          </span>
        </div>
      </div>

      <dl className="mt-5 grid gap-2 border-t border-dashed border-mist pt-5 text-sm">
        <div className="flex justify-between text-stone">
          <dt>
            {usd(price)} × {b.travellers}
          </dt>
          <dd>{usd(total)}</dd>
        </div>
        <div className="flex justify-between text-stone">
          <dt>Deposit today (20%)</dt>
          <dd>{usd(Math.round(total * 0.2))}</dd>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <dt className="font-medium">Total</dt>
          <dd className="text-2xl font-medium tracking-tight">{usd(total)}</dd>
        </div>
      </dl>

      <a
        href="#plan"
        className="group mt-5 flex items-center justify-between rounded-full bg-navy py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-saffron"
      >
        {b.selected >= 0 ? "Reserve this departure" : "Request a private trip"}
        <span className="grid size-10 place-items-center rounded-full bg-white text-navy transition-[rotate,background-color] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-gold">
          <ArrowUpRight className="size-4" />
        </span>
      </a>
      <a href={`tel:${site.whatsapp}`} className="mt-2 flex items-center justify-center gap-2 rounded-full border border-mist py-3 text-sm font-medium transition-colors hover:border-navy hover:text-navy">
        <Phone className="size-4" />
        Talk to a trip expert
      </a>

      <ul className="mt-5 grid gap-2 text-xs text-stone">
        {["No booking fees", "Free date change up to 30 days before", "Local team on call 24/7"].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <Check className="size-3.5 text-navy" strokeWidth={2.5} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DepartureList() {
  const b = useBooking();
  return (
    <ul className="grid gap-2">
      {b.departures.map((d, i) => {
        const on = b.selected === i;
        return (
          <li key={d.date}>
            <button
              type="button"
              onClick={() => b.select(i)}
              aria-pressed={on}
              className={`grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 rounded-card border p-4 text-left transition-colors sm:grid-cols-[1.4fr_1fr_auto_auto] sm:px-5 ${
                on ? "border-navy bg-white" : "border-mist bg-white hover:border-navy"
              }`}
            >
              <span>
                <span className="block font-medium">{longDate(d.date)}</span>
                <span className="text-xs text-stone">{d.seats} seats left</span>
              </span>
              <span className={`justify-self-end rounded-full px-3 py-1 text-xs font-medium sm:justify-self-start ${statusStyle[d.status]}`}>{d.status}</span>
              <span className="text-lg font-medium tracking-tight">{usd(d.price)}</span>
              <span
                className={`justify-self-end rounded-full px-4 py-2 text-xs font-medium transition-colors ${on ? "bg-navy text-white" : "border border-mist"}`}
              >
                {on ? "Selected" : "Select"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Fixed price bar for small screens, where the booking card sits below the content. */
export function MobileBookingBar() {
  const b = useBooking();
  const price = priceOf(b);
  const [hidden, setHidden] = useState(false);

  // Step aside while the full booking card is on screen, and once the enquiry form and footer arrive.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const card = document.getElementById("book")?.getBoundingClientRect();
      const plan = document.getElementById("plan")?.getBoundingClientRect();
      setHidden(Boolean((card && card.top < vh && card.bottom > 0) || (plan && plan.top < vh)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-4 rounded-full border border-mist bg-white/90 py-2 pl-5 pr-2 backdrop-blur-md transition-[translate,opacity] duration-500 ease-expo lg:hidden ${
        hidden ? "pointer-events-none translate-y-[150%] opacity-0" : ""
      }`}
    >
      <span className="leading-tight">
        <span className="block text-xs text-stone">{b.selected >= 0 ? longDate(b.departures[b.selected].date) : "Private trip"}</span>
        <span className="font-medium">
          {usd(price)} <span className="text-xs font-normal text-stone">/ person</span>
        </span>
      </span>
      <a href="#book" tabIndex={hidden ? -1 : 0} className="rounded-full bg-navy px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-saffron">
        Book now
      </a>
    </div>
  );
}
