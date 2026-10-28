"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { tokenize } from "@/lib/emphasis";
import { heroSlides } from "@/data/heroSlides";
import Button from "@/components/ui/Button";
import { ArrowUpRight, MapPin } from "@/components/ui/Icons";
import SlideMedia from "./SlideMedia";
import SliderNav from "./SliderNav";

const AUTOPLAY = 7;
const total = heroSlides.length;

export default function HeroSlider() {
  const ref = useRef<HTMLElement>(null);
  const layer = useRef(1);
  const timer = useRef<gsap.core.Tween>(null);
  const leaving = useRef(false);
  const dragX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);

  const slide = heroSlides[index];
  const next = heroSlides[(index + 1) % total];

  // Play the outgoing text away, then switch slides.
  const go = (to: number) => {
    const target = (to + total) % total;
    if (target === index || leaving.current) return;
    leaving.current = true;
    timer.current?.kill();
    const done = () => {
      leaving.current = false;
      setIndex(target);
    };
    if (!window.matchMedia(MOTION_OK).matches) return done();
    gsap
      .timeline({ onComplete: done })
      .to(ref.current?.querySelectorAll(".hs-word") ?? [], { yPercent: -150, duration: 0.5, stagger: 0.025, ease: "power3.in" })
      .to(ref.current?.querySelectorAll(".hs-swap") ?? [], { autoAlpha: 0, y: -12, duration: 0.35 }, 0);
  };

  // Mouse parallax and scroll-out, set up once.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".hs-fade", { y: 30, autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.5 });

        const scrollTrigger = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hs-media", { yPercent: 20, ease: "none", scrollTrigger });
        gsap.to(".hs-content", { yPercent: -15, autoAlpha: 0, ease: "none", scrollTrigger: { ...scrollTrigger, end: "70% top" } });

        if (!window.matchMedia("(pointer: fine)").matches) return;
        const xTo = gsap.quickTo(".hs-parallax", "x", { duration: 1.2, ease: "power3.out" });
        const yTo = gsap.quickTo(".hs-parallax", "y", { duration: 1.2, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * -30);
          yTo((e.clientY / window.innerHeight - 0.5) * -20);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });
    },
    { scope: ref },
  );

  // Reveal the active slide: strips wipe in, title rises, progress bar runs.
  useGSAP(
    () => {
      const reduce = !window.matchMedia(MOTION_OK).matches;
      const slides = gsap.utils.toArray<HTMLElement>(".hs-slide");
      const el = slides[index];
      const strips = el.querySelectorAll(".hs-strip");

      gsap.set(el, { zIndex: ++layer.current, autoAlpha: 1 });
      gsap.set(".hs-progress", { scaleX: 0 });

      if (reduce) {
        gsap.set(".hs-swap", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap
        .timeline()
        .fromTo(
          strips,
          { clipPath: (i: number) => (i % 2 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)") },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, stagger: 0.07, ease: "expo.inOut" },
        )
        .fromTo(el.querySelectorAll(".hs-strip-inner"), { scale: 1.25 }, { scale: 1, duration: 2.4, ease: "expo.out" }, 0.2)
        .fromTo(".hs-word", { yPercent: 150, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.05, ease: "power4.out" }, 0.55)
        .fromTo(".hs-swap", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" }, 0.75)
        .add(() => {
          timer.current = gsap.fromTo(
            `.hs-progress-${index}`,
            { scaleX: 0 },
            { scaleX: 1, duration: AUTOPLAY, ease: "none", onComplete: () => go(index + 1) },
          );
        }, 0.8);
    },
    { scope: ref, dependencies: [index] },
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate h-svh min-h-[680px] overflow-hidden bg-ink text-white"
      onPointerDown={(e) => (dragX.current = e.clientX)}
      onPointerUp={(e) => {
        if (dragX.current === null) return;
        const delta = e.clientX - dragX.current;
        dragX.current = null;
        if (Math.abs(delta) > 60) go(index + (delta < 0 ? 1 : -1));
      }}
    >
      <div className="hs-media absolute inset-0 -z-10">
        <div className="hs-parallax absolute -inset-8 z-0">
          {heroSlides.map((s, i) => (
            <SlideMedia key={s.name} image={s.image} priority={i === 0} />
          ))}
        </div>
        <div className="absolute inset-0 z-[1] bg-linear-to-r from-black/65 via-black/25 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-linear-to-t from-black/70 via-transparent to-black/30" />
      </div>

      <div className="hs-content mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-6 pt-28 sm:px-8 sm:pb-8">
        <div className="grid flex-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl pb-2">
            <p className="hs-swap mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              <MapPin className="size-3.5" />
              {slide.location}
            </p>

            <h2 key={index} className="type-hero">
              {tokenize(slide.title).map((t, i) => (
                <span key={i}>
                  <span className="-m-[0.2em] inline-block overflow-hidden p-[0.2em] align-top">
                    <span className="hs-word inline-block origin-bottom-left">
                      {t.em ? <em className="text-saffron">{t.text}</em> : t.text}
                      {t.trail}
                    </span>
                  </span>{" "}
                </span>
              ))}
            </h2>

            <p className="hs-swap mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">{slide.description}</p>
            {/* Kept out of the slide fade: the buttons are the same on every slide and must stay fully opaque for contrast. */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={slide.href} variant="saffron">
                Plan this trip
              </Button>
              <Button href="#trips" variant="ghost">
                All journeys
              </Button>
            </div>
          </div>

          <aside className="hs-fade hidden w-80 flex-col gap-3 lg:flex">
            <dl className="glass grid grid-cols-2 rounded-card p-5">
              {[
                ["Days", slide.days],
                ["Max alt.", `${slide.altitude.toLocaleString("en-US")}m`],
              ].map(([label, value]) => (
                <div key={label} className="hs-swap">
                  <dt className="text-[11px] uppercase tracking-[0.15em] text-white/60">{label}</dt>
                  <dd className="mt-1 text-xl font-medium tracking-tight">{value}</dd>
                </div>
              ))}
            </dl>
            <button type="button" onClick={() => go(index + 1)} data-cursor="Next" className="glass group flex items-center gap-4 rounded-card p-3 text-left">
              <span className="relative size-20 shrink-0 overflow-hidden rounded-thumb">
                <Image src={next.image} alt="" fill sizes="80px" className="object-cover transition-[scale] duration-700 ease-expo group-hover:scale-110" />
              </span>
              <span className="flex-1">
                <span className="block text-[11px] uppercase tracking-[0.15em] text-white/60">Up next</span>
                <span className="mt-1 block text-lg font-medium leading-tight">{next.name}</span>
                <span className="text-sm text-white/60">{next.location}</span>
              </span>
              <ArrowUpRight className="mr-2 size-4 transition-transform duration-500 ease-expo group-hover:rotate-45" />
            </button>
          </aside>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <SliderNav slides={heroSlides} index={index} onSelect={go} onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
        </div>
      </div>

    </section>
  );
}
