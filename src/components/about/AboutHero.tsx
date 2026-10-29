"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { whyStats } from "@/data/why";
import Container from "@/components/ui/Container";
import SplitReveal from "@/components/animations/SplitReveal";
import CountUp from "@/components/animations/CountUp";
import RotatingBadge from "@/components/home/expert/RotatingBadge";
import Breadcrumbs from "@/components/tours/Breadcrumbs";

const frames = [
  { src: images.prayerWheels, className: "rounded-card aspect-[3/4] sm:col-span-3" },
  { src: images.everestStupa, className: "rounded-panel col-span-2 order-first aspect-[4/3] sm:order-none sm:col-span-6" },
  { src: images.hikers, className: "rounded-t-full rounded-b-card aspect-[3/4] sm:col-span-3" },
];

/** Editorial hero: statement headline, a three-frame photo strip that wipes open, and the numbers that matter. */
export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline({ delay: 0.3 })
          .fromTo(".hero-frame", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, stagger: 0.12, ease: "expo.inOut" })
          .from(".hero-frame img", { scale: 1.35, duration: 1.8, stagger: 0.12, ease: "expo.out" }, 0.2)
          .from(".hero-fade", { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.6);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="overflow-hidden pb-16 pt-32 lg:pb-20 lg:pt-40">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} className="hero-fade text-stone" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <SplitReveal as="h1" text={"Born in Kathmandu.\nRaised by the *Himalaya.*"} className="type-hero" />
          <p className="hero-fade max-w-sm leading-relaxed text-stone lg:pb-3">
            Since {site.founded} we&apos;ve been a small, locally owned team planning Kailash yatras, Tibet tours and Himalayan treks — the way we&apos;d want our own families to travel.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-2 items-end gap-3 sm:grid-cols-12 sm:gap-4 lg:mt-16">
          {frames.map((f) => (
            <div key={f.src} className={`hero-frame relative overflow-hidden bg-paper-deep ${f.className}`}>
              <Image src={f.src} alt="" fill preload sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
          <RotatingBadge
            text="Est. 2010 • Locally owned • Kathmandu • "
            href="#story"
            className="hero-fade absolute -top-14 right-4 hidden sm:grid lg:right-[22%] lg:top-auto lg:-bottom-10"
          />
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t border-ink/15 lg:mt-20 lg:grid-cols-4">
          {whyStats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse py-8 pr-4 ${i >= 2 ? "border-t border-ink/15 lg:border-t-0" : ""} ${i % 2 ? "border-l border-ink/15 pl-4 sm:pl-8" : ""} ${i ? "lg:border-l lg:border-ink/15 lg:pl-8" : ""}`}
            >
              <dt className="mt-3 max-w-[14rem] text-sm text-stone">{s.label}</dt>
              <dd className="type-stat">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
