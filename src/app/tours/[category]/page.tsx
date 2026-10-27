import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategory, tourCategories, toursIn } from "@/data/tours";
import { monthRange } from "@/lib/format";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import SplitReveal from "@/components/animations/SplitReveal";
import ExpertCTA from "@/components/home/expert/ExpertCTA";
import CategoryHero from "@/components/tours/CategoryHero";
import TourGrid from "@/components/tours/TourGrid";
import BestMonths from "@/components/tours/BestMonths";
import Faqs from "@/components/tours/Faqs";
import OtherCategories from "@/components/tours/OtherCategories";

export function generateStaticParams() {
  return tourCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tours/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return { title: `${category.name} — GoHoliday`, description: category.intro };
}

export default function CategoryPage({ params }: PageProps<"/tours/[category]">) {
  return (
    <SiteShell>
      <Suspense fallback={<div className="min-h-svh" />}>
        <CategoryContent params={params} />
      </Suspense>
    </SiteShell>
  );
}

// Reading params suspends, so the page body sits behind a boundary while the shared chrome renders instantly.
async function CategoryContent({ params }: { params: PageProps<"/tours/[category]">["params"] }) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const tours = toursIn(category.slug);

  return (
    <>
      <CategoryHero category={category} tours={tours} />

      <Section id="tours">
        <SectionHeader
          label={`${tours.length} ${category.name.toLowerCase()}`}
          title="Pick your *route*"
          description="Every departure runs with our own local guides and can be taken privately on your own dates."
        />
        <div className="mt-12">
          <TourGrid tours={tours} />
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionLabel>Why go with us</SectionLabel>
            <SplitReveal text={`Planned by people who *live* here`} className="type-headline mt-5 max-w-lg" />
            <Reveal className="mt-10 grid gap-3" stagger={0.08}>
              {category.highlights.map((h) => (
                <div key={h.title} className="rounded-card border border-ink/10 bg-paper p-5">
                  <p className="flex items-center gap-3 text-lg font-medium tracking-tight">
                    <span className="size-2 rounded-full bg-saffron" />
                    {h.title}
                  </p>
                  <p className="mt-2 pl-5 text-stone">{h.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="lg:pt-2">
            <SectionLabel>When to go</SectionLabel>
            <p className="type-headline mt-5">
              {monthRange(category.bestMonths)}
            </p>
            <p className="mt-4 max-w-md text-stone">
              The clearest skies and most reliable roads and passes. Outside these months we still run private trips — ask us what to expect.
            </p>
            <div className="mt-10 rounded-card border border-ink/10 bg-paper p-5 sm:p-6">
              <BestMonths months={category.bestMonths} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel>Good to know</SectionLabel>
            <SplitReveal text="Questions, *answered*" className="type-headline mt-5" />
          </div>
          <Faqs items={category.faqs} />
        </div>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <SectionHeader label="Keep exploring" title="More *journeys*" />
        <div className="mt-12">
          <OtherCategories current={category.slug} />
        </div>
      </Section>

      <ExpertCTA />
    </>
  );
}
