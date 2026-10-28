import Image from "next/image";
import Link from "next/link";
import type { Trip } from "@/data/trips";
import { tripHref } from "@/data/tours";
import { ArrowUpRight, MapPin } from "./Icons";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={tripHref(trip.slug)}
      data-cursor="View"
      className="trip-card group relative block w-[78vw] shrink-0 snap-start sm:w-[380px] lg:w-[420px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-paper-deep lg:aspect-auto lg:h-[min(56vh,560px)]">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          sizes="(min-width: 1024px) 420px, 80vw"
          className="trip-img scale-115 object-cover transition-[scale] duration-1000 ease-expo group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between text-white">
          <div className="flex flex-wrap gap-1.5 text-xs font-medium">
            <span className="glass rounded-full px-3 py-1.5">{trip.days} days</span>
            <span className="glass rounded-full px-3 py-1.5">{trip.difficulty}</span>
          </div>
        </div>

        <div className="glass absolute inset-x-3 bottom-3 rounded-thumb p-4 text-white">
          <p className="flex items-center gap-1.5 text-xs text-white/75">
            <MapPin className="size-3.5" />
            {trip.location} · {trip.maxAltitude.toLocaleString("en-US")} m
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <h3 className="text-xl font-medium leading-tight tracking-tight">{trip.title}</h3>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-navy group-hover:text-white">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
