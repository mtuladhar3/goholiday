"use client";

import Image from "next/image";
import { useState } from "react";
import type { ItineraryDay } from "@/data/tours";
import { metres } from "@/lib/format";
import { ArrowRight, Bed, ChevronDown, Gauge, MapPin } from "@/components/ui/Icons";

/** Day-by-day timeline; each day opens into a card with its photo, altitude change and overnight stay. */
export default function Itinerary({ days, photos }: { days: ItineraryDay[]; photos: string[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const allOpen = open.size === days.length;
  const peak = Math.max(...days.map((d) => d.altitude));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const advance = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(i);
      next.add(i + 1);
      return next;
    });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-stone">
          <span className="font-medium text-ink">{days.length} days</span> · {new Set(days.map((d) => d.place)).size} stops · peak {metres(peak)}
        </p>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(days.map((_, i) => i)))}
          className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-navy hover:text-navy"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <ol className="relative grid gap-3">
        <span className="absolute bottom-8 left-[1.6rem] top-8 hidden w-px bg-mist sm:block" aria-hidden />
        {days.map((d, i) => {
          const expanded = open.has(i);
          const change = i ? d.altitude - days[i - 1].altitude : 0;
          const isPeak = d.altitude === peak;
          return (
            <li key={i} className="relative flex gap-4">
              <span
                className={`relative z-[1] hidden size-[3.25rem] shrink-0 flex-col items-center justify-center rounded-full border text-[10px] font-medium uppercase leading-none tracking-wider transition-colors duration-500 sm:flex ${
                  expanded ? "border-navy bg-navy text-white" : "border-mist bg-paper"
                }`}
                aria-hidden
              >
                Day
                <span className="mt-0.5 text-base tracking-tight">{i + 1}</span>
              </span>

              <div className={`min-w-0 flex-1 overflow-hidden rounded-card border bg-white transition-colors duration-500 ${expanded ? "border-navy" : "border-mist hover:border-navy"}`}>
                <button type="button" onClick={() => toggle(i)} aria-expanded={expanded} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                  <span className="min-w-0 flex-1">
                    <span className="type-eyebrow flex items-center gap-2 text-stone">
                      <span className="sm:hidden">Day {i + 1} ·</span>
                      {d.place}
                      {isPeak && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] tracking-wider text-navy">Highest point</span>}
                    </span>
                    <span className="mt-1 block text-base font-medium leading-snug tracking-tight sm:text-lg">{d.title}</span>
                  </span>
                  <span className="hidden text-sm tabular-nums text-stone sm:block">{metres(d.altitude)}</span>
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-expo ${expanded ? "rotate-180 border-navy bg-navy text-white" : "border-mist"}`}>
                    <ChevronDown className="size-4" />
                  </span>
                </button>

                <div className={`grid transition-[grid-template-rows] duration-700 ease-expo ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className={`border-t border-mist transition-opacity duration-500 ${expanded ? "opacity-100 delay-150" : "opacity-0"}`}>
                      <div className="grid gap-5 p-5 md:grid-cols-[1fr_220px]">
                        <div className="flex flex-col">
                          <p className="text-base leading-relaxed">{d.text}</p>

                          <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                            <div className="rounded-thumb bg-paper p-3">
                              <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-stone">
                                <Gauge className="size-3.5" />
                                Altitude
                              </dt>
                              <dd className="mt-1 font-medium tabular-nums">{metres(d.altitude)}</dd>
                            </div>
                            <div className="rounded-thumb bg-paper p-3">
                              <dt className="text-[11px] uppercase tracking-[0.12em] text-stone">{change < 0 ? "Descent" : "Ascent"}</dt>
                              <dd className={`mt-1 flex items-center gap-1 font-medium tabular-nums ${change > 0 ? "text-saffron" : change < 0 ? "text-navy" : ""}`}>
                                {change === 0 ? "—" : `${change > 0 ? "▲" : "▼"} ${metres(Math.abs(change))}`}
                              </dd>
                            </div>
                            {d.stay && (
                              <div className="col-span-2 rounded-thumb bg-paper p-3 sm:col-span-1">
                                <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-stone">
                                  <Bed className="size-3.5" />
                                  Overnight
                                </dt>
                                <dd className="mt-1 font-medium">{d.stay}</dd>
                              </div>
                            )}
                          </dl>

                          <div className="mt-auto flex items-center gap-4 pt-5">
                            <span className="h-1 flex-1 overflow-hidden rounded-full bg-mist" aria-hidden>
                              <span className="block h-full rounded-full bg-navy" style={{ width: `${((i + 1) / days.length) * 100}%` }} />
                            </span>
                            <span className="text-xs tabular-nums text-stone">
                              Day {i + 1} of {days.length}
                            </span>
                            {i < days.length - 1 && (
                              <button
                                type="button"
                                onClick={() => advance(i)}
                                className="group flex items-center gap-2 rounded-full bg-navy py-1.5 pl-4 pr-1.5 text-xs font-medium text-white transition-colors hover:bg-saffron"
                              >
                                Next
                                <span className="grid size-6 place-items-center rounded-full bg-white text-navy transition-transform duration-500 ease-expo group-hover:translate-x-0.5">
                                  <ArrowRight className="size-3" />
                                </span>
                              </button>
                            )}
                          </div>
                        </div>

                        <figure className="relative aspect-[4/3] overflow-hidden rounded-thumb bg-paper-deep md:aspect-auto md:min-h-48">
                          <Image src={photos[i % photos.length]} alt="" fill sizes="(min-width: 768px) 220px, 90vw" className="object-cover" />
                          <figcaption className="glass absolute inset-x-2 bottom-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white">
                            <MapPin className="size-3.5" />
                            {d.place}
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
