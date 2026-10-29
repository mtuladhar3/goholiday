"use client";

import { useState } from "react";
import { WEEKDAYS, addDays, monthGrid, monthKey, monthLabel, shiftMonth } from "@/lib/calendar";
import { longDate } from "@/lib/format";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

type DateCalendarProps = {
  value: string | null;
  onChange: (iso: string) => void;
  /** Earliest selectable day. */
  min: string;
  /** Trip length, used to shade the days the trip covers. */
  days: number;
  invalid?: boolean;
};

/** Inline month calendar for choosing a start date; the chosen trip's span is shaded. */
export default function DateCalendar({ value, onChange, min, days, invalid }: DateCalendarProps) {
  const [month, setMonth] = useState(() => monthKey(value ?? min));
  const end = value ? addDays(value, days - 1) : null;

  return (
    <div className={`rounded-card border bg-white p-4 transition-colors ${invalid ? "border-saffron" : "border-ink/15"}`}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonth(shiftMonth(month, -1))}
          disabled={month <= monthKey(min)}
          aria-label="Previous month"
          className="grid size-8 place-items-center rounded-full border border-ink/15 transition-colors hover:border-navy hover:text-navy disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft className="size-3.5" />
        </button>
        <p className="font-medium tracking-tight" aria-live="polite">
          {monthLabel(month)}
        </p>
        <button
          type="button"
          onClick={() => setMonth(shiftMonth(month, 1))}
          aria-label="Next month"
          className="grid size-8 place-items-center rounded-full border border-ink/15 transition-colors hover:border-navy hover:text-navy"
        >
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-y-0.5 text-center" role="group" aria-label={`Start dates in ${monthLabel(month)}`}>
        {WEEKDAYS.map((d) => (
          <span key={d} className="pb-1 text-[11px] font-medium uppercase tracking-wider text-stone">
            {d}
          </span>
        ))}
        {monthGrid(month).map((iso, n) => {
          if (!iso) return <span key={`pad-${n}`} />;
          const day = Number(iso.slice(8));
          const disabled = iso < min;
          const start = iso === value;
          const inTrip = Boolean(value && end && iso > value && iso <= end);
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-pressed={start}
              aria-label={longDate(iso)}
              className={`mx-auto grid h-9 w-full max-w-10 place-items-center text-sm transition-colors disabled:pointer-events-none disabled:text-stone/35 ${
                start ? "rounded-full bg-navy font-medium text-white" : inTrip ? "bg-navy/10 text-navy" : "rounded-full hover:bg-navy/10 hover:text-navy"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-2 border-t border-ink/10 pt-2.5 text-sm" aria-live="polite">
        {value && end ? (
          <>
            <span className="font-medium">{longDate(value)}</span>
            <span className="text-stone"> → back {longDate(end)}</span>
          </>
        ) : (
          <span className={invalid ? "text-saffron" : "text-stone"}>Pick the day you&apos;d like to start.</span>
        )}
      </p>
    </div>
  );
}
