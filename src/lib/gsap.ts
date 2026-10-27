"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Media query used to gate every animation so reduced-motion users get static content. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
