import type { ReactNode } from "react";
import SectionLabel from "./SectionLabel";
import Button from "./Button";
import SplitReveal from "@/components/animations/SplitReveal";
import Reveal from "@/components/animations/Reveal";

type SectionHeaderProps = {
  label: string;
  /** Supports *emphasis* and "\n" line breaks. */
  title: string;
  description?: string;
  action?: { href: string; label: string };
  /** Extra content shown on the right, above the action. */
  aside?: ReactNode;
  tone?: "light" | "dark";
  /** Heading level for the title; pass "h1" for the one section that carries the page's main heading. */
  as?: "h1" | "h2";
};

/** The one header layout used by every section: label + title left, copy + action right. */
export default function SectionHeader({ label, title, description, action, aside, tone = "light", as = "h2" }: SectionHeaderProps) {
  const muted = tone === "dark" ? "text-paper/60" : "text-stone";
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-4xl">
        <SectionLabel className={tone === "dark" ? "text-paper/70" : ""}>
          {label}
        </SectionLabel>
        <SplitReveal as={as} text={title} className="type-display mt-5" />
      </div>
      {(description || action || aside) && (
        <Reveal className="flex max-w-sm flex-col items-start gap-6 md:pb-2" stagger={0.08}>
          {aside}
          {description && <p className={`leading-relaxed ${muted}`}>{description}</p>}
          {action && (
            <Button href={action.href} variant={tone === "dark" ? "paper" : "ghost"}>
              {action.label}
            </Button>
          )}
        </Reveal>
      )}
    </div>
  );
}
