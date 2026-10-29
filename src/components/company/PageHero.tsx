import Image from "next/image";
import type { ReactNode } from "react";
import { companyPages, type CompanyHref } from "@/data/company";
import Container from "@/components/ui/Container";
import SplitReveal from "@/components/animations/SplitReveal";
import Reveal from "@/components/animations/Reveal";
import Breadcrumbs from "@/components/tours/Breadcrumbs";

type PageHeroProps = {
  /** A Company page gets its breadcrumb and "Company 02 / 06" counter from here… */
  page?: CompanyHref;
  /** …any other page passes its breadcrumb label instead. */
  crumb?: string;
  /** Supports *emphasis* and "\n" line breaks. */
  title: string;
  intro: string;
  /** Extra content beside the intro: chips, a date, a stat. */
  aside?: ReactNode;
  /** Optional wide photo that wipes open under the heading. */
  image?: string;
};

/** Shared hero for inner pages: breadcrumb, "Company 02 / 06" counter (Company pages only), statement heading and intro. */
export default function PageHero({ page, crumb, title, intro, aside, image }: PageHeroProps) {
  const index = companyPages.findIndex((p) => p.href === page);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="pb-16 pt-32 lg:pb-20 lg:pt-40">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: index >= 0 ? companyPages[index].label : (crumb ?? "") }]} className="text-stone" />
          {index >= 0 && (
            <p className="type-eyebrow hidden text-stone sm:block">
              Company <span className="text-ink">{pad(index + 1)}</span> / {pad(companyPages.length)}
            </p>
          )}
        </div>

        <SplitReveal as="h1" text={title} className="type-hero mt-8 max-w-6xl" />

        <Reveal className="mt-10 flex flex-col gap-8 border-t border-ink/15 pt-8 lg:flex-row lg:items-start lg:justify-between" stagger={0.08}>
          <p className="max-w-xl text-lg leading-relaxed text-stone">{intro}</p>
          {aside}
        </Reveal>

        {/* {image && (
          <Reveal className="mt-12 lg:mt-16" from={{ clipPath: "inset(100% 0% 0% 0%)" }} start="top 95%">
            <div className="relative aspect-[16/10] overflow-hidden rounded-panel bg-paper-deep sm:aspect-[21/9]">
              <Image src={image} alt="" fill preload sizes="100vw" className="object-cover" />
            </div>
          </Reveal>
        )} */}
      </Container>
    </section>
  );
}
