import { destinations } from "@/data/destinations";
import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import { ArrowRight, Clock, Compass, MapPin } from "@/components/ui/Icons";
import SearchSelect from "./SearchSelect";

const fields = [
  { name: "destination", label: "Where", placeholder: "Kailash, Tibet or beyond", icon: <MapPin className="size-[18px]" />, options: destinations.map((d) => ({ value: d.name, hint: `${d.trips} trips`, image: d.image })) },
  { name: "travelStyle", label: "Style", placeholder: "Any kind of journey", icon: <Compass className="size-[18px]" />, options: ["Overland by road", "Helicopter yatra", "Pilgrimage & kora", "Trekking"].map((value) => ({ value })) },
  { name: "duration", label: "How long", placeholder: "Any length", icon: <Clock className="size-[18px]" />, options: ["Up to 5 days", "6 – 10 days", "11 – 15 days", "16+ days"].map((value) => ({ value })) },
];

/** Quick trip search directly under the hero. */
export default function TripSearch() {
  return (
    <section aria-label="Find a trip" className="relative z-10 py-10 lg:py-12">
      <Container>
        <Reveal stagger={0.08}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 lg:mb-8">
            <h2 className="type-headline max-w-xl">
              Your road to <em className="text-saffron">Kailash</em> starts here
            </h2>
            <p className="flex items-center gap-2 text-sm text-stone">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-saffron/60" />
                <span className="relative size-2 rounded-full bg-saffron" />
              </span>
              Kailash &amp; Tibet departures open for 2027
            </p>
          </div>

          <form
            action="#trips"
            className="grid rounded-card border border-mist bg-white p-2 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center"
          >
            {fields.map((field, i) => (
              <SearchSelect
                key={field.name}
                {...field}
                className={i > 0 ? "border-t border-mist md:border-t-0 md:before:absolute md:before:inset-y-3 md:before:left-0 md:before:w-px md:before:bg-mist" : ""}
              />
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
        </Reveal>
      </Container>
    </section>
  );
}
