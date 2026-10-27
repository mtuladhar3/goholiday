"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/components/ui/Icons";

const filters = [
  { label: "Fitness", options: ["Easy", "Moderate", "Strenuous"] },
  { label: "Days", options: ["Under 7", "7 – 14", "15+"] },
  { label: "Season", options: ["Spring", "Autumn", "Winter"] },
];

/** Quick trek matcher on a light bordered tile — pick a few preferences and jump to results. */
export default function TrekFinder() {
  const [picked, setPicked] = useState<Record<string, string>>({ Fitness: "Moderate", Days: "7 – 14", Season: "Autumn" });

  return (
    <div className="relative flex flex-1 flex-col justify-between gap-8 overflow-hidden rounded-card border border-mist bg-white p-6 text-ink sm:p-8">
      <svg viewBox="0 0 200 100" className="pointer-events-none absolute -right-8 -top-6 w-64 text-navy/5" aria-hidden>
        <path d="M0 100 60 25l25 30 30-45 85 90z" fill="currentColor" />
      </svg>

      <div className="relative">
        <p className="type-eyebrow text-stone">Not sure where to start?</p>
        <p className="type-title mt-3">
          Find your <em className="text-saffron">perfect</em> trek
        </p>
      </div>

      <div className="relative flex flex-col gap-4">
        {filters.map((f) => (
          <div key={f.label} className="flex flex-wrap items-center gap-2">
            <span className="type-eyebrow w-20 text-stone">{f.label}</span>
            {f.options.map((o) => {
              const on = picked[f.label] === o;
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPicked((p) => ({ ...p, [f.label]: o }))}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-300 ${on ? "border-navy bg-navy text-white" : "border-mist text-ink/80 hover:border-navy hover:text-navy"}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <a href="#plan" className="group relative flex items-center justify-between rounded-full bg-navy py-1.5 pl-6 pr-1.5 text-white transition-colors duration-300 hover:bg-ink">
        <span className="text-sm font-medium">Show my matches</span>
        <span className="grid size-10 place-items-center rounded-full bg-saffron text-white transition-transform duration-500 ease-expo group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </a>
    </div>
  );
}
