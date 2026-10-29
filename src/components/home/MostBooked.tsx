"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { trips } from "@/data/trips";
import { tripHref } from "@/data/tours";
import { ArrowRight } from "@/components/ui/Icons";

const picks = trips.slice(0, 4);
const INTERVAL = 4000;

/** Bottom-left floating tile that cycles through the most-booked trips once the hero is scrolled past. Pauses while hovered or focused. */
export default function MostBooked() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shown, setShown] = useState(false);

  // Stay out of the way until the hero (#top) has left the viewport.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  const next = () => setIndex((i) => (i + 1) % picks.length);

  return (
    <aside
      aria-label="Most booked trips"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-hidden={!shown}
      inert={!shown}
      className={`fixed bottom-4 left-4 z-30 hidden w-64 sm:block overflow-hidden rounded-2xl bg-ink/95 text-paper shadow-[0_20px_40px_-12px] shadow-ink/50 ring-1 ring-white/10 backdrop-blur-md transition-[opacity,translate,filter,visibility] duration-700 ease-expo sm:bottom-6 sm:left-6 ${
        shown ? "visible opacity-100" : "invisible translate-y-10 opacity-0 blur-md"
      }`}
    >
      <div className="flex items-center justify-between px-3.5 pt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-paper/50">
        <span className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-saffron motion-safe:animate-ping" />
            <span className="relative size-1.5 rounded-full bg-saffron" />
          </span>
          Most booked
        </span>
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(picks.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1">
        {picks.map((t, i) => {
          const active = i === index;
          return (
            <a
              key={t.slug}
              href={tripHref(t.slug, "#trips")}
              aria-hidden={!active}
              tabIndex={active ? undefined : -1}
              className={`group col-start-1 row-start-1 flex items-center gap-3 p-2.5 pt-2 transition-[opacity,translate,filter] duration-700 ease-expo ${
                active ? "opacity-100" : "pointer-events-none invisible opacity-0 blur-sm motion-safe:translate-x-6"
              }`}
            >
              <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-white/10">
                <Image src={t.image} alt="" fill sizes="44px" className="object-cover transition-[scale] duration-700 ease-expo group-hover:scale-110" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="line-clamp-2 text-[13px] font-medium">{t.title}</span>
                <span className="mt-0.5 text-[11px] text-paper/50">
                  {t.days} days · {t.difficulty}
                </span>
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 transition-colors duration-500 group-hover:bg-saffron">
                <ArrowRight className="size-3.5 transition-transform duration-500 ease-expo group-hover:-rotate-45" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="h-0.5 bg-white/10">
        <div
          key={index}
          onAnimationEnd={next}
          className="h-full origin-left animate-progress bg-saffron"
          style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused || !shown ? "paused" : "running" }}
        />
      </div>
    </aside>
  );
}
