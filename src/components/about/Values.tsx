import Image from "next/image";
import { values } from "@/data/about";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/animations/Reveal";

/** Numbered promise rows; on hover a photo pill slides open beside each title. */
export default function Values() {
  return (
    <Section tone="ink">
      <SectionHeader
        tone="dark"
        label="What we stand for"
        title={"Four promises,\n*kept* daily"}
        description="Not slogans on a wall — the rules our guides, planners and porters actually work by, on every departure."
      />

      <Reveal className="mt-16 border-t border-paper/15" stagger={0.08}>
        {values.map((v, i) => (
          <div
            key={v.title}
            className="group grid gap-4 border-b border-paper/15 py-8 transition-colors duration-500 hover:bg-paper/[0.03] lg:grid-cols-[6rem_1fr_minmax(0,26rem)] lg:items-center lg:gap-10 lg:py-10"
          >
            <span className="type-eyebrow text-paper/50">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="type-headline flex items-center">
              <span className="relative mr-[0.3em] inline-block h-[0.8em] w-[1.8em] shrink-0 overflow-hidden rounded-full transition-[width,margin] duration-700 ease-expo lg:mr-0 lg:w-0 lg:group-hover:mr-[0.3em] lg:group-hover:w-[1.8em]">
                <Image src={v.image} alt="" fill sizes="120px" className="object-cover" />
              </span>
              <span className="transition-colors duration-500 group-hover:text-gold">{v.title}</span>
            </h3>
            <p className="leading-relaxed text-paper/60">{v.text}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
