import type { ComponentType, SVGProps } from "react";
import type { Tour } from "@/data/tours";
import { usd } from "@/lib/format";
import { Bed, Calendar, Car, Check, Close, Compass, Document, Plane, Shield, Users, Utensils, Wallet } from "@/components/ui/Icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// First matching keyword picks the icon; anything unmatched gets a tick.
const iconRules: [RegExp, Icon][] = [
  [/tip|personal|supplement|expense/i, Wallet],
  [/permit|visa|fee/i, Document],
  [/flight|helicopter/i, Plane],
  [/vehicle|cruiser|coach|transfer|driver|car\b/i, Car],
  [/guide|porter|crew|leader/i, Users],
  [/accommodation|hotel|farmstay|camping|sleeping/i, Bed],
  [/meal|breakfast|lunch|dinner|drink/i, Utensils],
  [/oxygen|first-aid|oximeter|insurance/i, Shield],
  [/yak|horse|palanquin/i, Compass],
];
const iconFor = (item: string) => iconRules.find(([re]) => re.test(item))?.[1] ?? Check;
const weArrange = /flight|insurance/i;

/** Round bite out of the ticket edge — the card clips the half that falls outside. */
const Notch = ({ className }: { className: string }) => <span className={`absolute z-[1] size-7 rounded-full border border-mist bg-paper ${className}`} aria-hidden />;

/** Decorative barcode, stable per tour. */
function Barcode({ seed }: { seed: string }) {
  const bars = [...seed.replace(/-/g, "")].slice(0, 28).map((c) => 1 + (c.charCodeAt(0) % 3));
  return (
    <span className="flex h-12 items-stretch gap-[3px]" aria-hidden>
      {bars.map((w, i) => (
        <span key={i} className="bg-ink" style={{ width: w }} />
      ))}
    </span>
  );
}

/** Price inclusions styled as a trip pass: included | perforation | not included, with a payment stub. */
export default function Inclusions({ tour, includes, excludes }: { tour: Tour; includes: string[]; excludes: string[] }) {
  const deposit = usd(Math.round(tour.price * 0.2));
  const steps = [
    { icon: Wallet, title: `${deposit} deposit`, text: "Secures your place" },
    { icon: Calendar, title: "Balance in 45 days", text: "Before departure" },
    { icon: Shield, title: "Free date change", text: "Up to 30 days before" },
  ];

  return (
    <article className="relative overflow-hidden rounded-card border border-mist bg-white">
      <header className="flex flex-wrap items-end justify-between gap-4 bg-navy px-6 py-6 text-white sm:px-8">
        <div className="min-w-0">
          <p className="type-eyebrow text-gold">Trip pass</p>
          <p className="mt-2 text-xl font-medium leading-tight tracking-tight sm:text-2xl">{tour.title}</p>
          <p className="mt-1 text-sm text-white/60">
            {tour.days} days · {tour.start} → {tour.end}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/60">From, per person</p>
          <p className="text-3xl font-medium tracking-tight sm:text-4xl">{usd(tour.price)}</p>
        </div>
      </header>

      <div className="relative grid lg:grid-cols-[1.45fr_1fr]">
        {/* Perforation between the two halves */}
        <span className="absolute bottom-0 left-[59.2%] top-0 hidden border-l-2 border-dashed border-mist lg:block" aria-hidden />
        <Notch className="left-[59.2%] top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />

        <section className="flex flex-col p-6 sm:p-8" aria-label="Included">
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg font-medium tracking-tight">What&apos;s included</p>
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-medium text-navy">{includes.length} items</span>
          </div>
          <ul className="mb-6 mt-5 grid gap-x-6 sm:grid-cols-2">
            {includes.map((item) => {
              const Icon = iconFor(item);
              return (
                <li key={item} className="flex items-center gap-3 border-b border-mist py-3 text-sm leading-snug">
                  <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-navy/5 text-navy">
                    <Icon className="size-4" />
                    <span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-navy text-white ring-2 ring-white">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex items-center gap-3 rounded-thumb bg-navy/5 p-4 text-sm leading-snug text-navy lg:mt-auto">
            <Shield className="size-5 shrink-0" />
            Everything on the ground is pre-booked and handled by our own team — you just turn up and walk.
          </p>
        </section>

        <section className="border-t-2 border-dashed border-mist bg-paper/40 p-6 sm:p-8 lg:border-t-0" aria-label="Not included">
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg font-medium tracking-tight">Not included</p>
            <span className="rounded-full border border-mist bg-white px-3 py-1 text-xs font-medium text-stone">{excludes.length} items</span>
          </div>
          <ul className="mt-5 grid">
            {excludes.map((item) => {
              const Icon = iconFor(item);
              return (
                <li key={item} className="flex items-center gap-3 border-b border-mist py-3 text-sm leading-snug text-stone last:border-0">
                  <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-mist bg-white">
                    <Icon className="size-4" />
                    <span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-stone text-white ring-2 ring-white">
                      <Close className="size-2.5" strokeWidth={3} />
                    </span>
                  </span>
                  <span className="flex-1">{item}</span>
                  {weArrange.test(item) && <span className="shrink-0 rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-medium text-navy">We can arrange</span>}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Tear-off stub */}
      <footer className="relative border-t-2 border-dashed border-mist">
        <Notch className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <Notch className="right-0 top-0 -translate-y-1/2 translate-x-1/2" />
        <Notch className="left-[59.2%] top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
          <div className="hidden md:block">
            <Barcode seed={tour.slug} />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-stone">GH-{tour.slug.slice(0, 10)}</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-navy text-navy">
                  <Icon className="size-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="text-xs text-stone">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </footer>
    </article>
  );
}
