"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type CountUpProps = { value: number; suffix?: string; decimals?: number; className?: string };

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts from 0 to `value` once the number scrolls into view. */
export default function CountUp({ value, suffix = "", decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.matchMedia().add(MOTION_OK, () => {
      const counter = { n: 0 };
      el.textContent = `${format(0, decimals)}${suffix}`;
      gsap.to(counter, {
        n: value,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${format(counter.n, decimals)}${suffix}`;
        },
      });
    });
  });

  return (
    <span ref={ref} className={className}>
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
