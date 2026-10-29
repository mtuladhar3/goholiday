import Image from "next/image";
import { whyReasons } from "@/data/whyTravel";
import Reveal from "@/components/animations/Reveal";

/** Six reasons: the first fills a large photo tile, the rest are cards that flip to ink on hover. */
export default function ReasonsBento() {
  const [lead, ...rest] = whyReasons;
  return (
    <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
      <article className="relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-panel p-4 text-white sm:col-span-2 lg:row-span-2 lg:min-h-[640px]">
        <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium">01 · The big one</span>
        <div className="glass max-w-xl rounded-card p-6">
          <h3 className="type-headline">{lead.title}</h3>
          <p className="mt-4 leading-relaxed text-white/80">{lead.text}</p>
        </div>
      </article>

      {rest.map((r, i) => (
        <article key={r.title} className="group flex flex-col justify-between gap-10 rounded-panel border border-ink/10 bg-paper p-6 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper">
          <div className="flex items-center justify-between">
            <span className="type-eyebrow text-stone group-hover:text-paper/60">{String(i + 2).padStart(2, "0")}</span>
            <span className="relative h-10 w-20 overflow-hidden rounded-full">
              <Image src={r.image} alt="" fill sizes="80px" className="object-cover transition-[scale] duration-700 ease-expo group-hover:scale-125" />
            </span>
          </div>
          <div>
            <h3 className="type-title">{r.title}</h3>
            <p className="mt-3 leading-relaxed text-stone transition-colors duration-500 group-hover:text-paper/65">{r.text}</p>
          </div>
        </article>
      ))}
    </Reveal>
  );
}
