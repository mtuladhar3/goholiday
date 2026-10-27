import Image from "next/image";
import Link from "next/link";
import { categoryHref, tourCategories, toursIn, type CategorySlug } from "@/data/tours";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Links to every category except the current one. */
export default function OtherCategories({ current }: { current: CategorySlug }) {
  const others = tourCategories.filter((c) => c.slug !== current);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {others.map((c) => (
        <Link key={c.slug} href={categoryHref(c.slug)} data-cursor="Explore" className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card p-5 text-white">
          <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" className="-z-10 object-cover transition-[scale] duration-1000 ease-expo group-hover:scale-110" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium">{toursIn(c.slug).length} journeys</span>
          <div className="flex items-end justify-between gap-3">
            <span className="type-title">{c.name}</span>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-navy group-hover:text-white">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
