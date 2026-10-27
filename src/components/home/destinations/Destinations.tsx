"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { destinations } from "@/data/destinations";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/animations/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Country panels: on desktop the hovered panel widens and reveals its details; on mobile all are open. */
export default function Destinations() {
  const [active, setActive] = useState(0);

  return (
    <Section id="destinations">
      <SectionHeader
        label="Destinations"
        title={"Three kingdoms,\n*one* Himalaya"}
        description="From Everest's south face to the monasteries of Paro — pick a country and we'll handle the permits and borders."
        action={{ href: "#trips", label: "Browse journeys" }}
      />

      <Reveal className="mt-14 flex flex-col gap-3 lg:h-[78vh] lg:max-h-[760px] lg:flex-row" stagger={0.12} from={{ y: 80, autoAlpha: 0 }}>
          {destinations.map((d, i) => {
            const open = i === active;
            return (
              <Link
                key={d.name}
                href={d.href}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="Explore"
                className={`group relative h-[62svh] min-h-[440px] overflow-hidden rounded-panel text-white transition-[flex-grow] duration-1000 ease-expo lg:h-auto lg:min-h-0 ${
                  open ? "lg:grow-[3.2]" : "lg:grow"
                } lg:basis-0`}
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={`object-cover transition-[scale] duration-[1.4s] ease-expo ${open ? "scale-100" : "scale-110"}`}
                />
                <div className={`absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/10 transition-opacity duration-700 ${open ? "opacity-100" : "lg:opacity-80"}`} />

                <div className="absolute inset-x-5 top-5 flex items-start justify-between">
                  <span className="glass rounded-full px-3 py-1.5 text-xs font-medium">{d.trips} journeys</span>
                </div>

                {/* Collapsed (desktop only): rotated country name */}
                <span
                  className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap text-5xl [writing-mode:vertical-rl] font-medium tracking-[-0.04em] transition-opacity duration-500 lg:block ${
                    open ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                  aria-hidden
                >
                  {d.name}
                </span>

                {/* Expanded details */}
                <div
                  className={`absolute inset-x-5 bottom-5 flex flex-col gap-5 transition-[opacity,translate] duration-700 ease-expo sm:inset-x-8 sm:bottom-8 lg:min-w-[30rem] ${
                    open ? "opacity-100 delay-200" : "lg:pointer-events-none lg:translate-y-6 lg:opacity-0"
                  }`}
                >
                  <h3 className="type-hero">{d.name}</h3>
                  <p className="max-w-md text-white/80">{d.tagline}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-1.5">
                      {d.highlights.map((h) => (
                        <li key={h} className="glass rounded-full px-3 py-1.5 text-xs">
                          {h}
                        </li>
                      ))}
                    </ul>
                    <span className="grid size-14 place-items-center rounded-full bg-white text-ink transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-navy group-hover:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </Reveal>
    </Section>
  );
}
