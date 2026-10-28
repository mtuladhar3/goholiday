"use client";

import { useEffect, useRef, useState } from "react";
import type { Departure } from "@/data/tours";
import { longDate } from "@/lib/format";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown } from "@/components/ui/Icons";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const statusDot: Record<Departure["status"], string> = {
  Guaranteed: "bg-navy",
  "Filling fast": "bg-saffron",
  Available: "bg-stone/50",
};

// Dates are ISO strings pinned to UTC so server and client render the same month.
const monthKey = (iso: string) => iso.slice(0, 7);
const shiftMonth = (key: string, by: number) => {
  const d = new Date(`${key}-01T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + by);
  return d.toISOString().slice(0, 7);
};
const monthLabel = (key: string) => new Date(`${key}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

/** Days of the month as ISO strings, padded with nulls so the 1st lands on its weekday (Monday first). */
function monthGrid(key: string) {
  const first = new Date(`${key}-01T00:00:00Z`);
  const lead = (first.getUTCDay() + 6) % 7;
  const total = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  return [...Array<null>(lead).fill(null), ...Array.from({ length: total }, (_, i) => `${key}-${String(i + 1).padStart(2, "0")}`)];
}

type DeparturePickerProps = {
  departures: Departure[];
  /** Index into `departures`, or -1 for a private trip. */
  selected: number;
  onSelect: (i: number) => void;
};

/** Booking-card field that opens a month calendar with the scheduled departures marked. */
export default function DeparturePicker({ departures, selected, onSelect }: DeparturePickerProps) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const first = monthKey(departures[0].date);
  const last = monthKey(departures.at(-1)!.date);
  const [month, setMonth] = useState(() => monthKey(departures[Math.max(0, selected)].date));

  const byDate = new Map(departures.map((d, i) => [d.date, i]));
  const current = selected >= 0 ? departures[selected] : null;

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const show = () => {
    if (current) setMonth(monthKey(current.date));
    setOpen(true);
  };
  const choose = (i: number) => {
    onSelect(i);
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <div ref={root} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : show())}
        className={`flex w-full items-center gap-3 rounded-thumb border px-4 py-3 text-left transition-colors hover:border-navy ${open ? "border-navy" : "border-mist"}`}
      >
        <span className="min-w-0 flex-1">
          <span className="type-eyebrow block text-stone">Departure</span>
          <span className="mt-1 block truncate font-medium">{current ? `${longDate(current.date)} · ${current.status}` : "Private trip — my own dates"}</span>
        </span>
        <ChevronDown className={`size-4 shrink-0 text-stone transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        role="dialog"
        aria-label="Choose a departure date"
        className={`absolute inset-x-0 top-full z-20 mt-2 rounded-card bg-white p-4 shadow-[0_20px_50px_-12px] shadow-ink/25 ring-1 ring-ink/5 transition-[opacity,translate] duration-300 ease-expo ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0 motion-safe:-translate-y-2"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMonth(shiftMonth(month, -1))}
            disabled={month <= first}
            aria-label="Previous month"
            className="grid size-8 place-items-center rounded-full border border-mist transition-colors hover:border-navy hover:text-navy disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-3.5" />
          </button>
          <p className="font-medium tracking-tight" aria-live="polite">
            {monthLabel(month)}
          </p>
          <button
            type="button"
            onClick={() => setMonth(shiftMonth(month, 1))}
            disabled={month >= last}
            aria-label="Next month"
            className="grid size-8 place-items-center rounded-full border border-mist transition-colors hover:border-navy hover:text-navy disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d) => (
            <span key={d} className="pb-1 text-[11px] font-medium uppercase tracking-wider text-stone">
              {d}
            </span>
          ))}
          {monthGrid(month).map((iso, n) => {
            if (!iso) return <span key={`pad-${n}`} />;
            const i = byDate.get(iso);
            const day = Number(iso.slice(8));
            if (i === undefined)
              return (
                <span key={iso} className="grid aspect-square place-items-center text-sm text-stone/40">
                  {day}
                </span>
              );
            const d = departures[i];
            const on = i === selected;
            return (
              <button
                key={iso}
                type="button"
                onClick={() => choose(i)}
                aria-pressed={on}
                aria-label={`${longDate(iso)}, ${d.status}, ${d.seats} seats left`}
                className={`relative grid aspect-square place-items-center rounded-full text-sm font-medium transition-colors ${
                  on ? "bg-navy text-white" : "bg-paper hover:bg-navy/10 hover:text-navy"
                }`}
              >
                {day}
                <span className={`absolute bottom-1 size-1 rounded-full ${on ? "bg-white" : statusDot[d.status]}`} />
              </button>
            );
          })}
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-stone">
          {(Object.keys(statusDot) as Departure["status"][]).map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${statusDot[s]}`} />
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-mist pt-4">
          {current && (
            <p className="mb-3 text-sm">
              <span className="font-medium">{longDate(current.date)}</span>
              <span className="text-stone"> · {current.seats} seats left</span>
            </p>
          )}
          <button
            type="button"
            onClick={() => choose(-1)}
            aria-pressed={selected === -1}
            className={`flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors ${
              selected === -1 ? "border-navy bg-navy text-white" : "border-mist hover:border-navy hover:text-navy"
            }`}
          >
            <Calendar className="size-4" />
            Private trip — my own dates
          </button>
        </div>
      </div>
    </div>
  );
}
