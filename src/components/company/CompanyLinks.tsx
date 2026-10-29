import Image from "next/image";
import Link from "next/link";
import { companyPages, type CompanyHref } from "@/data/company";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/animations/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Links to every other Company page, closing each of them. */
export default function CompanyLinks({ current }: { current: CompanyHref }) {
  const others = companyPages.filter((p) => p.href !== current);
  return (
    <Section>
      <SectionHeader label="Keep reading" title="More about *us*" />
      <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
        {others.map((p) => (
          <Link key={p.href} href={p.href} data-cursor="Open" className="group flex rounded-card border border-ink/10 bg-paper p-2 transition-colors duration-500 hover:border-navy sm:flex-col">
            <span className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-thumb sm:aspect-[4/3] sm:w-auto">
              <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 19vw, (min-width: 640px) 48vw, 96px" className="object-cover transition-[scale] duration-1000 ease-expo group-hover:scale-110" />
            </span>
            <span className="flex flex-1 items-center justify-between gap-4 p-3 sm:flex-col sm:items-stretch sm:gap-6 sm:pt-4">
              <span>
                <span className="block text-lg font-medium leading-snug tracking-tight">{p.label}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-stone">{p.blurb}</span>
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper-deep transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-navy group-hover:text-white sm:self-end">
                <ArrowUpRight className="size-4" />
              </span>
            </span>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}
