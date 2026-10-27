"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Circular text stamp that spins slowly and faster while the page scrolls. */
export default function RotatingBadge({ text, href, className = "relative" }: { text: string; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to(".badge-ring", { rotate: 360, duration: 14, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      });
    },
    { scope: ref },
  );

  return (
    <a ref={ref} href={href} aria-label={text} className={`group grid size-32 place-items-center sm:size-36 ${className}`}>
      <svg viewBox="0 0 100 100" className="badge-ring absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0" />
        </defs>
        <circle cx="50" cy="50" r="50" fill="var(--color-paper)" />
        <text fontSize="8.6" fill="var(--color-ink)" fontWeight="500">
          <textPath href="#badge-circle" textLength={236} lengthAdjust="spacing">{text.toUpperCase()}</textPath>
        </text>
      </svg>
      <span className="relative grid size-12 place-items-center rounded-full bg-navy text-white transition-[rotate,scale,background-color] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-saffron group-hover:scale-110">
        <ArrowUpRight className="size-5" />
      </span>
    </a>
  );
}
