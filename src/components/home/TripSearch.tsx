import Image from "next/image";
import { destinations } from "@/data/destinations";
import { trips } from "@/data/trips";
import { tripHref } from "@/data/tours";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { ArrowRight, ChevronDown, Clock, Compass, MapPin } from "@/components/ui/Icons";

const fields = [
  { name: "destination", label: "Where", placeholder: "Anywhere in the Himalaya", icon: MapPin, options: destinations.map((d) => d.name) },
  { name: "travelStyle", label: "Style", placeholder: "Any kind of journey", icon: Compass, options: ["Trekking", "Overland tour", "Culture & heritage", "Lakes & leisure"] },
  { name: "duration", label: "How long", placeholder: "Any length", icon: Clock, options: ["Up to 5 days", "6 – 10 days", "11 – 15 days", "16+ days"] },
];

/** Quick trip search directly under the hero, with shortcuts to the most-booked trips. */
export default function TripSearch() {
  return (
    <section aria-label="Find a trip" className="relative z-10 py-10 lg:py-12">
      <Container>
        <Reveal stagger={0.08}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 lg:mb-8">
            <h2 className="type-headline max-w-xl">
              Where will the <em className="text-saffron">mountains</em> take you?
            </h2>
            <p className="flex items-center gap-2 text-sm text-stone">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-saffron/60" />
                <span className="relative size-2 rounded-full bg-saffron" />
              </span>
              Departures open for spring &amp; autumn seasons
            </p>
          </div>

          <form
            action="#trips"
            className="grid rounded-card border border-mist bg-white p-2 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center"
          >
            {fields.map(({ name, label, placeholder, icon: Icon, options }, i) => (
              <label
                key={name}
                className={`group relative flex cursor-pointer items-center gap-4 rounded-thumb px-4 py-3.5 transition-colors hover:bg-paper ${
                  i > 0 ? "border-t border-mist md:border-t-0" : ""
                }`}
              >
                {i > 0 && <span className="absolute inset-y-3 left-0 hidden w-px bg-mist md:block" aria-hidden />}
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-saffron/10 text-saffron transition-colors group-hover:bg-saffron group-hover:text-white">
                  <Icon className="size-[18px]" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="type-eyebrow text-stone">{label}</span>
                  <span className="relative mt-1">
                    <select
                      name={name}
                      defaultValue=""
                      className="w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-base font-medium outline-none"
                    >
                      <option value="">{placeholder}</option>
                      {options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-stone transition-transform group-hover:translate-y-[-30%]" />
                  </span>
                </span>
              </label>
            ))}
            <button
              type="submit"
              className="group mt-2 flex items-center justify-center gap-3 rounded-thumb bg-navy py-4 pl-7 pr-4 text-sm font-medium text-white transition-colors hover:bg-saffron md:mt-0 md:h-full"
            >
              Search trips
              <span className="grid size-9 place-items-center rounded-full bg-white text-navy transition-[rotate,background-color] duration-500 ease-expo group-hover:-rotate-45 group-hover:bg-gold">
                <ArrowRight className="size-4" />
              </span>
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <span className="type-eyebrow hidden shrink-0 text-stone sm:block">Most booked</span>
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {trips.slice(0, 4).map((t) => (
                <a
                  key={t.slug}
                  href={tripHref(t.slug, "#trips")}
                  className="group flex shrink-0 items-center gap-3 rounded-full border border-mist bg-white py-1.5 pl-1.5 pr-5 transition-colors hover:border-navy"
                >
                  <span className="relative size-11 overflow-hidden rounded-full bg-paper-deep">
                    <Image src={t.image} alt="" fill sizes="44px" className="object-cover transition-[scale] duration-700 ease-expo group-hover:scale-125" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="max-w-72 truncate text-sm font-medium">{t.title}</span>
                    <span className="text-xs text-stone">
                      {t.days} days · from <span className="font-medium text-ink">${t.price.toLocaleString("en-US")}</span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
