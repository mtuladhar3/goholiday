"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    // Touch devices and reduced-motion users keep native scrolling.
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let disposed = false;
    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      if (lenisRef.current === lenis) lenisRef.current = null;
      lenis = undefined;
    };
    const start = async () => {
      if (!media.matches || lenis) return;
      const { default: Lenis } = await import("lenis");
      if (disposed || !media.matches || lenis) return;
      lenis = new Lenis({ lerp: 0.09, anchors: { offset: -24 }, autoRaf: false, respectReducedMotion: true });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
    };
    void start();
    const change = () => {
      stop();
      void start();
    };
    media.addEventListener("change", change);

    return () => {
      disposed = true;
      media.removeEventListener("change", change);
      stop();
    };
  }, []);

  return null;
}
