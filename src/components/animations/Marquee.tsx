"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop at rest. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Gap utility applied between items and between the two copies, e.g. "gap-8 pr-8". */
  gapClass?: string;
  className?: string;
};

/** Infinite horizontal loop that speeds up with scroll velocity. */
export default function Marquee({ children, duration = 30, reverse = false, pauseOnHover = false, gapClass = "gap-8 pr-8", className = "" }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween>(null);
  const hovering = useRef(false);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const loop = gsap.fromTo(
          ".marquee-track",
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
        );
        tween.current = loop;

        const boost = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (hovering.current) return;
            const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
            gsap
              .timeline()
              .to(loop, { timeScale: speed, duration: 0.2, overwrite: true })
              .to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out" });
          },
        });
        return () => boost.kill();
      });
    },
    { scope: ref },
  );

  const setHover = (on: boolean) => {
    if (!pauseOnHover || !tween.current) return;
    hovering.current = on;
    gsap.to(tween.current, { timeScale: on ? 0 : 1, duration: 0.6, overwrite: true });
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <div className="marquee-track flex w-max">
        <div className={`flex shrink-0 items-center ${gapClass}`}>{children}</div>
        <div className={`flex shrink-0 items-center ${gapClass}`} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
