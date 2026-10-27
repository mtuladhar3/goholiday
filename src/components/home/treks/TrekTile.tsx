import Image from "next/image";
import Link from "next/link";
import type { Trip } from "@/data/trips";
import { tripHref } from "@/data/tours";
import { ArrowUpRight } from "@/components/ui/Icons";

export default function TrekTile({ trek }: { trek: Trip }) {
  return (
    <Link
      href={tripHref(trek.slug)}
      className="group flex items-center gap-4 rounded-card border border-mist p-3 transition-colors duration-500 hover:border-navy hover:bg-paper-deep"
    >
      <span className="relative size-24 shrink-0 overflow-hidden rounded-thumb sm:size-28">
        <Image src={trek.image} alt={trek.title} fill sizes="112px" className="object-cover transition-[scale] duration-700 ease-expo group-hover:scale-110" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="type-eyebrow block text-stone">{trek.location}</span>
        <span className="mt-1 block text-xl font-medium leading-tight tracking-tight">{trek.title}</span>
        <span className="mt-2 flex flex-wrap gap-1.5 text-xs">
          <span className="rounded-full bg-paper-deep px-2.5 py-1 group-hover:bg-paper">{trek.days} days</span>
          <span className="rounded-full bg-paper-deep px-2.5 py-1 group-hover:bg-paper">{trek.maxAltitude.toLocaleString("en-US")} m</span>
          <span className="rounded-full bg-paper-deep px-2.5 py-1 group-hover:bg-paper">{trek.difficulty}</span>
        </span>
      </span>
      <span className="mr-2 hidden size-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-expo group-hover:rotate-45 sm:grid">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
