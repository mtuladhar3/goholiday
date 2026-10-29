"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { milestones } from "@/data/about";
import { metres } from "@/lib/format";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/animations/SplitReveal";

const CEILING = 6000;

/** Our story as a climb: milestones scroll past while a sticky photo and altitude gauge follow along. */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = milestones[active];

  // Tracks the milestone crossing the middle of the screen — not motion, so it runs for everyone.
  useGSAP(
    () => {
      const triggers = gsap.utils.toArray<HTMLElement>(".milestone", ref.current).map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="lg:sticky lg:top-24 lg:h-[calc(100svh-8rem)]">
        <SectionLabel>Our journey</SectionLabel>
        <SplitReveal text={"Fifteen years,\none *climb*"} className="type-display mt-5" />

        <div className="relative mt-10 hidden overflow-hidden rounded-panel bg-ink lg:block lg:h-[calc(100%-13rem)]">
          {milestones.map((m, i) => (
            <Image
              key={m.year}
              src={m.image}
              alt=""
              fill
              sizes="45vw"
              className={`object-cover transition-[opacity,scale] duration-1000 ease-expo ${i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />

          {/* Altitude gauge — the dot climbs (or dips) with each chapter */}
          <div className="absolute inset-y-8 right-8 w-px bg-white/30" aria-hidden>
            <span
              className="absolute left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_6px_rgb(240_156_37/0.25)] transition-[bottom] duration-1000 ease-expo"
              style={{ bottom: `${(current.altitude / CEILING) * 100}%` }}
            />
          </div>

          <div className="glass absolute inset-x-6 bottom-6 mr-8 flex items-end justify-between gap-6 rounded-card p-5 text-white" aria-live="polite">
            <p className="type-stat tabular-nums">{current.year}</p>
            <p className="text-right text-sm text-white/75">
              <span className="block type-eyebrow text-white/60">Altitude</span>
              {metres(current.altitude)}
            </p>
          </div>
        </div>
      </div>

      <ol className="border-t border-ink/15">
        {milestones.map((m, i) => (
          <li
            key={m.year}
            className={`milestone border-b border-ink/15 py-10 transition-opacity duration-700 lg:flex lg:min-h-[60svh] lg:flex-col lg:justify-center lg:py-16 ${i === active ? "" : "lg:opacity-35"}`}
          >
            <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-card lg:hidden">
              <Image src={m.image} alt="" fill sizes="100vw" className="object-cover" />
            </div>
            <p className="flex items-center gap-3 text-sm text-stone">
              <span className="font-medium text-saffron">{m.year}</span>
              <span className="h-px w-8 bg-ink/20" />
              {metres(m.altitude)}
            </p>
            <h3 className="type-headline mt-4">{m.title}</h3>
            <p className="mt-4 max-w-md leading-relaxed text-stone">{m.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
