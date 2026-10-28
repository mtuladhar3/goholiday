"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { featuredTrips } from "@/data/trips";
import TripCard from "@/components/ui/TripCard";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * Desktop: the section pins and the card rail scrolls sideways with the page.
 * Mobile/tablet: the rail is a native swipeable, snapping carousel.
 */
export default function FeaturedTrips() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const track = rail.current;
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(".trips-progress", { scaleX: self.progress }),
          },
        });

        gsap.utils.toArray<HTMLElement>(".trip-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: img.closest(".trip-card"), containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });
    },
    { scope: section },
  );

  return (
    <section id="trips" ref={section} className="relative scroll-mt-20 overflow-hidden py-16 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <Container className="lg:pt-16">
        <SectionHeader
          as="h1"
          label="Kailash & Tibet journeys"
          title="Journeys to the *sacred* mountain"
          aside={
            <div className="flex items-center gap-4">
              <div className="hidden h-px w-32 bg-mist lg:block">
                <div className="trips-progress h-full origin-left scale-x-0 bg-ink" />
              </div>
            </div>
          }
          action={{ href: "#plan", label: "Plan a custom trip" }}
        />
      </Container>

      <div className="no-scrollbar mt-14 snap-x snap-mandatory overflow-x-auto scroll-pl-4 sm:scroll-pl-8 lg:mt-10 lg:overflow-visible">
        <div ref={rail} className="flex w-max gap-4 px-4 sm:gap-6 sm:px-8">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
          <Link
            href="#plan"
            data-cursor="Plan"
            className="group flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-card border border-mist p-8 transition-colors duration-500 hover:bg-navy hover:text-white sm:w-[380px] lg:w-[420px]"
          >
            <span className="text-sm text-stone group-hover:text-paper/60">120+ itineraries, or one made just for you</span>
            <span>
              <span className="type-headline block">
                Design your <em>own</em> journey
              </span>
              <span className="mt-8 grid size-16 place-items-center rounded-full bg-navy text-white transition-[rotate,background-color] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-saffron">
                <ArrowUpRight className="size-6" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
