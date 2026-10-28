"use client";

import { useMemo, useState } from "react";
import type { Tour } from "@/data/tours";
import type { Difficulty } from "@/data/trips";
import { ChevronDown } from "@/components/ui/Icons";
import TourListCard from "./TourListCard";

const durations = [
  { label: "Any length", test: () => true },
  { label: "Up to 7 days", test: (d: number) => d <= 7 },
  { label: "8 – 12 days", test: (d: number) => d >= 8 && d <= 12 },
  { label: "13+ days", test: (d: number) => d >= 13 },
];

const sorts = {
  recommended: { label: "Recommended", fn: () => 0 },
  shortest: { label: "Shortest first", fn: (a: Tour, b: Tour) => a.days - b.days },
};
type SortKey = keyof typeof sorts;

const chip = (on: boolean) =>
  `shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-navy bg-navy text-white" : "border-mist bg-white hover:border-navy hover:text-navy"}`;

/** Category listing with client-side duration / difficulty filters and sorting. */
export default function TourGrid({ tours }: { tours: Tour[] }) {
  const [duration, setDuration] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [sort, setSort] = useState<SortKey>("recommended");

  const grades = useMemo(() => (["Easy", "Moderate", "Strenuous"] as Difficulty[]).filter((g) => tours.some((t) => t.difficulty === g)), [tours]);
  const shown = useMemo(
    () => tours.filter((t) => durations[duration].test(t.days) && (!difficulty || t.difficulty === difficulty)).sort(sorts[sort].fn),
    [tours, duration, difficulty, sort],
  );
  const reset = () => {
    setDuration(0);
    setDifficulty(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-mist pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {durations.map((d, i) => (
            <button key={d.label} type="button" onClick={() => setDuration(i)} aria-pressed={duration === i} className={chip(duration === i)}>
              {d.label}
            </button>
          ))}
          {grades.length > 1 && <span className="mx-2 h-6 w-px shrink-0 bg-mist" aria-hidden />}
          {grades.length > 1 &&
            grades.map((g) => (
              <button key={g} type="button" onClick={() => setDifficulty(difficulty === g ? null : g)} aria-pressed={difficulty === g} className={chip(difficulty === g)}>
                {g}
              </button>
            ))}
        </div>

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <p className="text-sm text-stone" aria-live="polite">
            <span className="font-medium text-ink">{shown.length}</span> {shown.length === 1 ? "journey" : "journeys"}
          </p>
          <label className="relative flex items-center gap-2 rounded-full border border-mist bg-white py-2 pl-4 pr-9 text-sm">
            <span className="text-stone">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="cursor-pointer appearance-none bg-transparent font-medium outline-none">
              {Object.entries(sorts).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 size-4 text-stone" />
          </label>
        </div>
      </div>

      {shown.length ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((t) => (
            <TourListCard key={t.slug} tour={t} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-card border border-dashed border-mist px-6 py-16 text-center">
          <p className="type-title">
            Nothing matches <em>just yet</em>
          </p>
          <p className="max-w-sm text-stone">Every trip can be tailored — loosen a filter, or ask us to build one around your dates.</p>
          <button type="button" onClick={reset} className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-saffron">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
