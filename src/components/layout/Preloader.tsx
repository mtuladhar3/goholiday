"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { completeIntro } from "@/lib/intro";

const SUMMIT = 8849;

/** Altitude counter that climbs to Everest's summit, then lifts like a curtain. Plays once per session. */
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem("gh-intro") === "1";
        sessionStorage.setItem("gh-intro", "1");
      } catch {}

      if (seen || !window.matchMedia(MOTION_OK).matches) {
        completeIntro();
        setDone(true);
        return;
      }

      const num = ref.current?.querySelector(".pl-num");
      const counter = { v: 0 };
      let lastUpdate = -Infinity;

      gsap
        .timeline({
          onComplete: () => setDone(true),
        })
        .from(".pl-line", { yPercent: 110, duration: 0.8, stagger: 0.08, ease: "power4.out" })
        .to(counter, {
          v: SUMMIT,
          duration: 2,
          ease: "power3.inOut",
          onUpdate: () => {
            const now = performance.now();
            if (num && now - lastUpdate >= 100) {
              num.textContent = Math.round(counter.v).toLocaleString("en-US");
              lastUpdate = now;
            }
          },
          onComplete: () => {
            if (num) num.textContent = SUMMIT.toLocaleString("en-US");
          },
        }, 0.2)
        .to(".pl-bar", { scaleX: 1, duration: 2, ease: "power3.inOut" }, 0.2)
        .to(".pl-line", { yPercent: -110, duration: 0.6, stagger: 0.04, ease: "power3.in" })
        .call(completeIntro)
        .to(ref.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.2");
    },
    { scope: ref },
  );

  if (done) return null;

  return (
    <div ref={ref} className="pl-root fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-4 text-paper sm:p-8" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      <noscript>
        <style>{`.pl-root{display:none}`}</style>
      </noscript>
      <div className="flex justify-between overflow-hidden text-xs uppercase tracking-[0.2em] text-paper/60">
        <span className="pl-line block">goholiday°</span>
        <span className="pl-line block">Kathmandu — Lhasa — Thimphu</span>
      </div>

      <div className="overflow-hidden">
        <div className="pl-line flex items-end gap-3">
          <span className="pl-num inline-block min-w-[4.5ch] text-[22vw] font-medium leading-[0.8] tracking-[-0.06em] tabular-nums sm:text-[16vw]">0</span>
          <span className="mb-[1.5vw] font-serif text-3xl italic sm:text-5xl">m</span>
        </div>
      </div>

      <div>
        <div className="mb-4 flex justify-between overflow-hidden text-xs uppercase tracking-[0.2em] text-paper/60">
          <span className="pl-line block">Ascending to the summit</span>
          <span className="pl-line block">Everest · 8,849 m</span>
        </div>
        <div className="h-px w-full bg-paper/15">
          <div className="pl-bar h-full origin-left scale-x-0 bg-saffron" />
        </div>
      </div>
    </div>
  );
}
