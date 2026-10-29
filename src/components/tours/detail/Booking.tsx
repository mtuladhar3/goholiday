"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Departure } from "@/data/tours";
import { longDate } from "@/lib/format";
import { site } from "@/data/site";
import StarRating from "@/components/ui/StarRating";
import { ArrowUpRight, Check, Minus, Phone, Plus } from "@/components/ui/Icons";
import DeparturePicker from "./DeparturePicker";

type BookingState = {
  departures: Departure[];
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

/** Shares the chosen departure and party size between the booking card and the mobile bar. */
export function BookingProvider({ departures, children }: { departures: Departure[]; children: ReactNode }) {
  const [selected, setSelected] = useState(0);
  const [travellers, setTravellersState] = useState(2);
  const setTravellers = (n: number) => setTravellersState(Math.min(16, Math.max(1, n)));
  return (
    <BookingContext.Provider value={{ departures, selected, select: setSelected, travellers, setTravellers }}>{children}</BookingContext.Provider>
  );
}

export function BookingCard({ slug, rating, reviews }: { slug: string; rating: number; reviews: number }) {
  const b = useBooking();
  const date = b.selected >= 0 ? b.departures[b.selected].date : "private";

  return (
    <div id="book" className="scroll-mt-32 rounded-card border border-mist bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl font-medium tracking-tight">Book this trip</p>
          <p className="text-sm text-stone">Pick a date and party size</p>
        </div>
        <div className="text-right text-xs text-stone">
          <StarRating value={rating} className="justify-end" />
          <p className="mt-1">{reviews} reviews</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <DeparturePicker departures={b.departures} selected={b.selected} onSelect={b.select} />

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

      <Link
        href={`/book?tour=${slug}&date=${date}&travellers=${b.travellers}`}
        className="group mt-5 flex items-center justify-between rounded-full bg-navy py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-saffron"
      >
        {b.selected >= 0 ? "Reserve this departure" : "Request a private trip"}
        <span className="grid size-10 place-items-center rounded-full bg-white text-navy transition-[rotate,background-color] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-gold">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
      <a
        href={`tel:${site.whatsapp}`}
        className="group mt-2 flex items-center justify-between rounded-full border border-mist py-1.5 pl-6 pr-1.5 text-sm font-medium transition-colors hover:border-navy hover:text-navy"
      >
        Talk to a trip expert
        <span className="grid size-10 place-items-center rounded-full bg-navy/5 text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-white">
          <Phone className="size-4" />
        </span>
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

/** Fixed booking bar for small screens, where the booking card sits below the content. */
export function MobileBookingBar() {
  const b = useBooking();
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
        <span className="block text-xs text-stone">
          {b.travellers} {b.travellers === 1 ? "traveller" : "travellers"}
        </span>
        <span className="font-medium">{b.selected >= 0 ? longDate(b.departures[b.selected].date) : "Private trip"}</span>
      </span>
      <a href="#book" tabIndex={hidden ? -1 : 0} className="rounded-full bg-navy px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-saffron">
        Book now
      </a>
    </div>
  );
}
