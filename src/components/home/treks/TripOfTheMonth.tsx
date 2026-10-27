import Image from "next/image";
import { tripOfTheMonth } from "@/data/trips";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import ElevationChart from "./ElevationChart";

export default function TripOfTheMonth() {
  const { trip, month, elevation } = tripOfTheMonth;
  const stats = [
    { label: "Duration", value: `${trip.days} days` },
    { label: "Max altitude", value: `${trip.maxAltitude.toLocaleString("en-US")} m` },
    { label: "Difficulty", value: trip.difficulty },
    { label: "From", value: `$${trip.price.toLocaleString("en-US")}` },
  ];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-panel bg-ink text-paper">
      <div className="relative h-56 overflow-hidden sm:h-72" data-cursor="View">
        <Image src={trip.image} alt={trip.title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-[scale] duration-1000 ease-expo hover:scale-105" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent" />
        <span className="glass type-eyebrow absolute left-4 top-4 rounded-full px-4 py-2 text-white sm:left-6 sm:top-6">
          ★ Trip of the month · {month}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="type-title max-w-lg">{trip.title}</h3>
          <div className="flex items-center gap-2 text-sm text-paper/60">
            <StarRating value={trip.rating} />
            {trip.reviews} reviews
          </div>
        </div>

        <dl className="grid grid-cols-2 border-y border-paper/10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-4 ${i % 2 ? "pl-4" : ""} sm:pl-4 sm:first:pl-0 ${i ? "sm:border-l sm:border-paper/10" : ""}`}>
              <dt className="type-eyebrow text-paper/50">{s.label}</dt>
              <dd className="mt-1 text-lg font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="type-eyebrow mb-6 text-paper/50">Route profile</p>
          <ElevationChart points={elevation} />
        </div>

        <p className="text-paper/70">{trip.excerpt}</p>
        <Button href="#plan" variant="saffron" className="mt-auto self-start">
          Enquire about this trip
        </Button>
      </div>
    </article>
  );
}
