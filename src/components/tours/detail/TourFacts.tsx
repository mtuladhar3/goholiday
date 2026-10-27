import type { ReactNode } from "react";
import type { Tour, TourCategory } from "@/data/tours";
import type { Difficulty } from "@/data/trips";
import { MONTHS, monthRange } from "@/lib/format";
import { Bed, Car, Users } from "@/components/ui/Icons";

const EVEREST = 8849;
const grades: { level: Difficulty; note: string }[] = [
  { level: "Easy", note: "Gentle days, no real altitude" },
  { level: "Moderate", note: "5–6 hours a day, some altitude" },
  { level: "Strenuous", note: "Long days above 4,000 m" },
];

function Stat({ label, children, foot }: { label: string; children: ReactNode; foot: ReactNode }) {
  return (
    <div className="flex flex-col p-5 sm:p-6">
      <p className="type-eyebrow text-stone">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">{children}</div>
      <div className="mt-auto pt-4">{foot}</div>
    </div>
  );
}

function Detail({ icon, label, className = "", children }: { icon?: ReactNode; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 bg-paper p-4 sm:p-5 ${className}`}>
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-stone [&>svg]:size-3.5">
        {icon}
        {label}
      </p>
      <div className="text-sm font-medium">{children}</div>
    </div>
  );
}

/** Trip at a glance: three headline stats over a band of practical details. */
export default function TourFacts({ tour, category }: { tour: Tour; category: TourCategory }) {
  const grade = grades.findIndex((g) => g.level === tour.difficulty);
  const ofEverest = Math.round((tour.maxAltitude / EVEREST) * 100);

  return (
    <div className="overflow-hidden rounded-card border border-mist bg-white">
      <div className="grid divide-y divide-mist sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Stat label="Duration" foot={<p className="text-sm text-stone">{tour.days - 1} nights · {tour.start === tour.end ? "round trip" : "one way"}</p>}>
          <span className="type-stat">{tour.days}</span>
          <span className="text-lg text-stone">days</span>
        </Stat>

        <Stat
          label="Max altitude"
          foot={
            <div>
              <div className="relative h-1.5 rounded-full bg-mist">
                <span className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-gold to-saffron" style={{ width: `${ofEverest}%` }} />
              </div>
              <p className="mt-2 text-xs text-stone">{ofEverest}% of Everest&apos;s summit height</p>
            </div>
          }
        >
          <span className="type-stat">{tour.maxAltitude.toLocaleString("en-US")}</span>
          <span className="text-lg text-stone">m</span>
        </Stat>

        <Stat
          label="Difficulty"
          foot={
            <div>
              <div className="grid grid-cols-3 gap-1" aria-hidden>
                {grades.map((g, i) => (
                  <span key={g.level} className={`h-1.5 rounded-full ${i <= grade ? "bg-saffron" : "bg-mist"}`} />
                ))}
              </div>
              <p className="mt-2 text-xs text-stone">{grades[grade].note}</p>
            </div>
          }
        >
          <span className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-none tracking-tight">{tour.difficulty}</span>
        </Stat>
      </div>

      <div className="grid gap-px border-t border-mist bg-mist sm:grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_1fr_1fr]">
        <Detail label="Route" className="sm:col-span-2 lg:col-span-1">
          <span className="flex items-center gap-2">
            {tour.start}
            <span className="flex min-w-6 flex-1 items-center" aria-hidden>
              <span className="size-1.5 rounded-full bg-navy" />
              <span className="h-px flex-1 border-t border-dashed border-navy/40" />
              <span className="size-1.5 rounded-full border border-navy" />
            </span>
            {tour.end}
          </span>
        </Detail>
        <Detail label={`Best · ${monthRange(category.bestMonths)}`}>
          <span className="flex items-end gap-0.5" aria-hidden>
            {MONTHS.map((m, i) => (
              <span key={m} title={m} className={`w-full rounded-sm ${category.bestMonths.includes(i + 1) ? "h-4 bg-navy" : "h-1.5 bg-mist"}`} />
            ))}
          </span>
        </Detail>
        <Detail icon={<Users />} label="Group">
          {tour.groupSize} people
        </Detail>
        <Detail icon={<Bed />} label="Stay">
          {tour.accommodation}
        </Detail>
        <Detail icon={<Car />} label="Transport">
          {tour.transport}
        </Detail>
      </div>
    </div>
  );
}
