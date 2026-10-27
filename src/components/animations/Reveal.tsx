"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animate elements matching this selector instead of the direct children. */
  selector?: string;
  /** Starting state to animate from. */
  from?: gsap.TweenVars;
  stagger?: number;
  delay?: number;
  start?: string;
};

/** Animates its children into view as the wrapper scrolls into the viewport. */
export default function Reveal({
  children,
  className,
  selector,
  from = { y: 48, autoAlpha: 0 },
  stagger = 0.1,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = selector ? el.querySelectorAll(selector) : el.children;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(targets, {
          ...from,
          duration: 1.1,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
