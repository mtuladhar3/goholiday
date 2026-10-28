"use client";

import { useEffect, useRef, useState } from "react";
import { lenisRef } from "@/lib/lenis";
import { ArrowRight } from "@/components/ui/Icons";

const RING = 2 * Math.PI * 20;

/** Bottom-right button that appears once the page is scrolled; its saffron ring tracks how far down you are. */
export default function ScrollTop() {
  const arc = useRef<SVGCircleElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      arc.current?.style.setProperty("stroke-dashoffset", String(RING * (1 - progress)));
      setShown(window.scrollY > 600);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-30 hidden size-14 place-items-center rounded-full bg-ink text-paper shadow-[0_12px_30px_-10px] shadow-ink/50 ring-1 ring-white/10 transition-[background-color,opacity,translate,scale] duration-500 ease-expo hover:bg-saffron lg:grid ${
        shown ? "opacity-100" : "pointer-events-none translate-y-4 scale-75 opacity-0"
      }`}
    >
      <span className="relative grid size-11 place-items-center">
        <svg viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90" aria-hidden>
          <circle cx="22" cy="22" r="20" fill="none" strokeWidth="2" className="stroke-white/15" />
          <circle
            ref={arc}
            cx="22"
            cy="22"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING}
            className="stroke-saffron transition-colors duration-500 group-hover:stroke-white"
          />
        </svg>
        {/* Arrow flies out the top while its twin rises from below */}
        <span className="relative size-4 overflow-hidden">
          <ArrowRight className="absolute inset-0 size-4 -rotate-90 transition-transform duration-500 ease-expo group-hover:-translate-y-[150%]" />
          <ArrowRight className="absolute inset-0 size-4 translate-y-[150%] -rotate-90 transition-transform duration-500 ease-expo group-hover:translate-y-0" />
        </span>
      </span>
    </button>
  );
}
