"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { ElevationPoint } from "@/data/trips";

const W = 600;
const H = 200;
const PAD_TOP = 36;
const PAD_BOTTOM = 34;

/** Route altitude profile that draws itself left-to-right when scrolled into view. */
export default function ElevationChart({ points }: { points: ElevationPoint[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const alts = points.map((p) => p.altitude);
  const min = Math.min(...alts) - 400;
  const max = Math.max(...alts);
  const peak = alts.indexOf(max);

  const coords = points.map((p, i) => ({
    ...p,
    x: (i / (points.length - 1)) * W,
    y: PAD_TOP + (1 - (p.altitude - min) / (max - min)) * (H - PAD_TOP - PAD_BOTTOM),
  }));
  const line = coords.map((c, i) => `${i ? "L" : "M"}${c.x},${c.y}`).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } })
          .fromTo(".elev-draw", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power2.inOut" })
          .from(".elev-dot", { scale: 0, autoAlpha: 0, duration: 0.5, stagger: 0.25, ease: "back.out(3)" }, 0.1);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative" role="img" aria-label={`Elevation profile: ${points.map((p) => `${p.label} ${p.altitude} m`).join(", ")}`}>
      <div className="elev-draw">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-40 w-full sm:h-48">
          <defs>
            <linearGradient id="elev-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-saffron)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-saffron)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#elev-fill)" />
          <path d={line} fill="none" stroke="var(--color-saffron)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          {coords.map((c) => (
            <line key={c.label} x1={c.x} x2={c.x} y1={c.y} y2={H} stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      </div>

      {coords.map((c, i) => {
        const edge = i === 0 ? "translate-x-0" : i === coords.length - 1 ? "-translate-x-full" : "-translate-x-1/2";
        const hideOnMobile = i !== 0 && i !== peak && i !== coords.length - 1;
        return (
          <div key={c.label}>
            <span className="elev-dot absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-saffron" style={{ left: `${(c.x / W) * 100}%`, top: `${(c.y / H) * 100}%` }} />
            <span
              className={`absolute -translate-y-[170%] whitespace-nowrap text-xs font-medium tabular-nums ${edge} ${hideOnMobile ? "hidden sm:block" : ""} ${i === peak ? "text-saffron" : ""}`}
              style={{ left: `${(c.x / W) * 100}%`, top: `${(c.y / H) * 100}%` }}
            >
              {c.altitude.toLocaleString("en-US")} m
            </span>
            <span
              className={`absolute bottom-0 whitespace-nowrap text-[11px] uppercase tracking-wider opacity-60 ${edge} ${hideOnMobile ? "hidden sm:block" : ""}`}
              style={{ left: `${(c.x / W) * 100}%` }}
            >
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
