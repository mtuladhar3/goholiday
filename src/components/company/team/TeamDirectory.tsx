"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { departments, team, type Department } from "@/data/team";
import SectionHeader from "@/components/ui/SectionHeader";

type Filter = Department | "Everyone";
const filters: Filter[] = ["Everyone", ...departments];

/** Filterable grid of arch-topped portraits; the middle column sits lower on desktop. */
export default function TeamDirectory() {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("Everyone");
  const people = filter === "Everyone" ? team : team.filter((m) => m.department === filter);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".team-card", { y: 48, autoAlpha: 0, duration: 1, stagger: 0.06, ease: "power4.out", scrollTrigger: { trigger: ".team-grid", start: "top 85%", once: true } });
      });
    },
    { scope: ref, dependencies: [filter], revertOnUpdate: true },
  );

  return (
    <div ref={ref}>
      <SectionHeader
        label="The team"
        title={"Faces you'll meet\non the *trail*"}
        description="Planners, permit specialists and guides who grew up in these mountains. Most of us have walked the kora more times than we can count."
      />

      <div role="group" aria-label="Filter by department" className="no-scrollbar mt-12 flex gap-2 overflow-x-auto">
        {filters.map((f) => {
          const count = f === "Everyone" ? team.length : team.filter((m) => m.department === f).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-500 ${
                filter === f ? "border-navy bg-navy text-white" : "border-ink/15 hover:border-navy hover:text-navy"
              }`}
            >
              {f}
              <span className={`text-xs ${filter === f ? "text-white/60" : "text-stone"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="team-grid mt-10 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:pb-20 lg:[&>*:nth-child(3n+2)]:translate-y-20">
        {people.map((m) => (
          <figure key={m.name} className="team-card group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-card bg-paper-deep">
              <Image
                src={m.image}
                alt={m.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-[scale,filter] duration-1000 ease-expo group-hover:scale-105 lg:grayscale lg:group-hover:grayscale-0"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                {m.years} yrs in the Himalaya
              </span>
            </div>
            <figcaption className="mt-5 flex items-start justify-between gap-4">
              <span>
                <span className="block text-xl font-medium tracking-tight">{m.name}</span>
                <span className="block text-stone">{m.role}</span>
              </span>
              <span className="mt-1 max-w-[9rem] text-right text-xs leading-relaxed text-stone">{m.languages}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
