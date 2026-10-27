"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { tokenize } from "@/lib/emphasis";

type SplitRevealProps = {
  /** Words wrapped in *asterisks* render as italic serif; "\n" forces a line break. */
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
};

/** Heading whose words rise out of a mask when it scrolls into view. */
export default function SplitReveal({ text, as: Tag = "h2", className = "", delay = 0 }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".split-word", {
          yPercent: 110,
          rotate: 4,
          duration: 1.1,
          stagger: 0.05,
          delay,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text.split("\n").map((line, l) => (
        <span key={l} className="block">
          {tokenize(line).map((token, w) => (
            <span key={w}>
              <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
                <span className="split-word inline-block origin-bottom-left">
                  {token.em ? <em>{token.text}</em> : token.text}
                  {token.trail}
                </span>
              </span>{" "}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
