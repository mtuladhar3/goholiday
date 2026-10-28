import Image from "next/image";
import Link from "next/link";
import { tourHref, type Tour } from "@/data/tours";
import { ArrowUpRight, MapPin } from "@/components/ui/Icons";

/** Grid version of the home-page trip card: full-bleed photo with a glass info panel. */
export default function TourListCard({ tour }: { tour: Tour }) {
  return (
    <Link href={tourHref(tour)} data-cursor="View" className="group relative block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-paper-deep">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="scale-105 object-cover transition-[scale] duration-1000 ease-expo group-hover:scale-115"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2 text-white">
          <div className="flex flex-wrap gap-1.5 text-xs font-medium">
            <span className="glass rounded-full px-3 py-1.5">{tour.days} days</span>
            <span className="glass rounded-full px-3 py-1.5">{tour.difficulty}</span>
          </div>
          {tour.badge && <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-medium text-navy">{tour.badge}</span>}
        </div>

        <div className="glass absolute inset-x-3 bottom-3 rounded-thumb p-4 text-white">
          <p className="flex items-center gap-1.5 text-xs text-white/75">
            <MapPin className="size-3.5" />
            {tour.location} · {tour.maxAltitude.toLocaleString("en-US")} m
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <h3 className="text-xl font-medium leading-tight tracking-tight">{tour.title}</h3>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-navy group-hover:text-white">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
