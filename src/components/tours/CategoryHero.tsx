import Image from "next/image";
import type { Tour, TourCategory } from "@/data/tours";
import { monthRange, metres } from "@/lib/format";
import SplitReveal from "@/components/animations/SplitReveal";
import Container from "@/components/ui/Container";
import Breadcrumbs from "./Breadcrumbs";

export default function CategoryHero({ category, tours }: { category: TourCategory; tours: Tour[] }) {
  const days = tours.map((t) => t.days);
  const stats = [
    { label: "Journeys", value: String(tours.length) },
    { label: "Avg. rating", value: `${(tours.reduce((sum, t) => sum + t.rating, 0) / tours.length).toFixed(1)} / 5` },
    { label: "Duration", value: `${Math.min(...days)} – ${Math.max(...days)} days` },
    { label: "Highest point", value: metres(Math.max(...tours.map((t) => t.maxAltitude))) },
  ];

  return (
    <section className="">
      <div className="relative isolate flex min-h-[640px] flex-col overflow-hidden  bg-ink text-white lg:h-[88svh]">
        <Image src={category.image} alt="" fill preload sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-transparent to-black/40" />

        <Container className="flex flex-1 flex-col justify-end pb-6 pt-36 sm:pb-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} className="text-white" />
          <SplitReveal as="h1" text={category.title} className="type-hero mt-6 max-w-5xl" />
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{category.intro}</p>
            <p className="flex items-center gap-2 text-sm text-white/80">
              <span className="size-2 rounded-full bg-gold" />
              Best season · <span className="font-medium text-white">{monthRange(category.bestMonths)}</span>
            </p>
          </div>

          <dl className="glass mt-8 grid grid-cols-2 rounded-card sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`p-4 sm:p-5 ${i % 2 ? "border-l border-white/15" : ""} ${i > 1 ? "border-t border-white/15 sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-white/60">{s.label}</dt>
                <dd className="mt-1 text-xl font-medium tracking-tight sm:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
