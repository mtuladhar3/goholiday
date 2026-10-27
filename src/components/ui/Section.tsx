import type { ReactNode } from "react";
import Container from "./Container";

export type SectionTone = "paper" | "deep" | "ink";

const tones: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  deep: "bg-paper-deep text-ink",
  ink: "bg-ink text-paper",
};

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
};

/** Every homepage section shares this spacing and width. */
export default function Section({ id, tone = "paper", className = "", children }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 lg:py-20 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
