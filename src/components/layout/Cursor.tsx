"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** A small dot that trails the pointer and grows into a labelled bubble over [data-cursor] elements. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const els = [dot.current, bubble.current];
    gsap.set(els, { xPercent: -50, yPercent: -50, autoAlpha: 1 });
    gsap.set(bubble.current, { scale: 0 });
    const xTo = gsap.quickTo(els, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(els, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (target) setLabel(target.dataset.cursor ?? "");
      gsap.to(bubble.current, { scale: target ? 1 : 0, duration: 0.5, ease: "expo.out" });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  });

  return (
    <>
      <div ref={dot} className="pointer-events-none invisible fixed left-0 top-0 z-[90] size-2.5 rounded-full bg-white mix-blend-difference" />
      <div
        ref={bubble}
        className="pointer-events-none invisible fixed left-0 top-0 z-[90] grid size-20 place-items-center rounded-full bg-saffron text-xs font-medium uppercase tracking-wider text-ink"
      >
        {label}
      </div>
    </>
  );
}
