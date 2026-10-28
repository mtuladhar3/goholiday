"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { experiences } from "@/data/experiences";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * "Things to do": an index of experiences beside a sticky photo. The row nearest the
 * middle of the screen (or the hovered row) becomes active and wipes its photo in.
 */
export default function Experiences() {
  const ref = useRef<HTMLElement>(null);
  const layer = useRef(1);
  const [active, setActive] = useState(0);
  const current = experiences[active];

  // Mark the row crossing the viewport centre as active.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".exp-row", { y: 50, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: ".exp-list", start: "top 80%", once: true } });
        gsap.from(".exp-frame", { clipPath: "inset(15% 15% 15% 15% round 32px)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: ".exp-frame", start: "top 80%", once: true } });
      });
    },
    { scope: ref },
  );

  // Wipe in the newly active photo on top of the previous one.
  useGSAP(
    () => {
      const img = ref.current?.querySelectorAll<HTMLElement>(".exp-img")[active];
      if (!img) return;
      gsap.set(img, { zIndex: ++layer.current, autoAlpha: 1 });
      if (!window.matchMedia(MOTION_OK).matches) return;
      gsap.fromTo(img, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" });
      gsap.fromTo(img.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 1.6, ease: "expo.out" });
      gsap.fromTo(".exp-caption > *", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.05, ease: "power3.out", delay: 0.2 });
    },
    { scope: ref, dependencies: [active] },
  );

  return (
    <section id="experiences" ref={ref} className="scroll-mt-20 py-16 lg:py-20">
      <Container>
        <SectionHeader
          label="Ways to travel"
          title={"More than\njust a *kora*"}
          description="Pilgrimage, monasteries, high passes and Everest's north face — Kailash and Tibet at whatever pace suits you."
          action={{ href: "#plan", label: "Build an itinerary" }}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="hidden lg:block">
            <div className="exp-frame sticky top-28 aspect-[4/5] max-h-[calc(100svh-9rem)] w-full overflow-hidden rounded-panel bg-paper-deep">
              <div className="absolute inset-0 isolate">
                {experiences.map((exp, i) => (
                  <div key={exp.title} className={`exp-img absolute inset-0 ${i === 0 ? "" : "invisible"}`}>
                    <Image src={exp.image} alt={exp.title} fill sizes="45vw" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 z-[1] bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 z-[1] flex items-end justify-between gap-6 text-white">
                <div className="exp-caption overflow-hidden">
                  <p className="type-eyebrow text-white/70">{current.tags.join(" · ")}</p>
                  <p className="type-title mt-2">{current.title}</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="exp-list">
            {experiences.map((exp, i) => {
              const on = i === active;
              return (
                <li key={exp.title} className="exp-row border-t border-mist last:border-b">
                  <a href={exp.href} onPointerEnter={() => setActive(i)} className="group grid grid-cols-[auto_1fr_auto] items-start lg:grid-cols-[1fr_auto] gap-4 py-7 sm:gap-6 lg:py-9">
                    <span className="relative size-20 overflow-hidden rounded-thumb lg:hidden">
                      <Image src={exp.image} alt="" fill sizes="80px" className="object-cover" />
                    </span>
                    <span>
                      <span className={`type-headline block transition-[color,translate] duration-700 ease-expo ${on ? "lg:translate-x-3" : ""} ${on ? "text-ink" : "lg:text-ink/25"}`}>
                        {exp.title}
                      </span>
                      <span className={`grid transition-[grid-template-rows,opacity] duration-700 ease-expo ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] lg:grid-rows-[0fr] lg:opacity-0"}`}>
                        <span className="overflow-hidden">
                          <span className="block max-w-md pt-3 text-stone">{exp.blurb}</span>
                          <span className="mt-3 flex flex-wrap gap-1.5">
                            {exp.tags.map((t) => (
                              <span key={t} className="rounded-full border border-mist px-3 py-1 text-xs">
                                {t}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className={`grid size-11 place-items-center rounded-full border transition-all duration-500 ease-expo ${on ? "rotate-45 border-ink bg-ink text-paper" : "border-mist"}`}>
                      <ArrowUpRight className="size-4" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
