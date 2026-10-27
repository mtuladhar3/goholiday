"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { tokenize } from "@/lib/emphasis";

type ScrollTextProps = {
  /** Supports *emphasis* and [key] placeholders that become inline photo pills from `images`. */
  text: string;
  images?: Record<string, string>;
  className?: string;
};

const PILL = /^\[(\w+)\]$/;

/** Paragraph whose words light up one by one (and whose photo pills open) as it scrolls past. */
export default function ScrollText({ text, images = {}, className = "" }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const scrollTrigger = { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true };
        gsap.fromTo(".st-word", { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger });
        gsap.from(".st-pill", { width: 0, ease: "none", stagger: 0.3, scrollTrigger: { ...scrollTrigger, end: "center 50%" } });
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {tokenize(text).map((t, i) => {
        const pill = t.text.match(PILL);
        if (pill && images[pill[1]]) {
          return (
            <span key={i}>
              <span className="st-pill relative -my-[0.1em] inline-block h-[0.82em] w-[1.9em] overflow-hidden rounded-full align-[-0.08em]">
                <Image src={images[pill[1]]} alt="" fill sizes="160px" className="object-cover" />
              </span>{" "}
            </span>
          );
        }
        return (
          <span key={i}>
            <span className="st-word">
              {t.em ? <em className="text-saffron">{t.text}</em> : t.text}
              {t.trail}
            </span>{" "}
          </span>
        );
      })}
    </p>
  );
}
