import Image from "next/image";
import { associations, recommendedOn } from "@/data/site";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import StarRating from "@/components/ui/StarRating";
import SplitReveal from "@/components/animations/SplitReveal";
import Reveal from "@/components/animations/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

/** Licences and memberships, then where travellers review us. */
export default function Recognition() {
  return (
    <Section tone="deep">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionLabel>Licensed &amp; trusted</SectionLabel>
          <SplitReveal text={"Fully licensed,\n*properly* insured"} className="type-headline mt-5" />
          <p className="mt-6 max-w-md leading-relaxed text-stone">
            We&apos;re a government-registered tour and trekking operator, and members of the associations that set safety and fair-wage standards in the Himalaya.
          </p>
        </div>

        <div>
          <Reveal className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
            {associations.map((a) => (
              <div key={a.name} className="flex items-center gap-4 rounded-card border border-ink/10 bg-paper p-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-thumb bg-white p-1.5">
                  <Image src={a.logo} alt="" sizes="64px" className="size-full object-contain" />
                </span>
                <span>
                  <span className="block font-medium leading-snug tracking-tight">{a.name}</span>
                  <span className="mt-1 block text-sm text-stone">Registered member</span>
                </span>
              </div>
            ))}
          </Reveal>

          <p className="type-eyebrow mt-10 text-stone">Recommended on</p>
          <Reveal className="mt-4 grid gap-3 sm:grid-cols-2" stagger={0.06}>
            {recommendedOn.map((r) => (
              <a
                key={r.name}
                href={r.href}
                className="group flex items-center gap-4 rounded-card bg-ink p-4 text-paper transition-colors duration-500 hover:bg-navy"
              >
                <span className="grid size-16 shrink-0 place-items-center rounded-thumb bg-white p-1.5">
                  <Image src={r.logo} alt="" sizes="64px" className="size-full object-contain" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium tracking-tight">{r.name}</span>
                  <StarRating value={5} className="mt-1.5" />
                  <span className="mt-1 block text-sm text-paper/60">{r.note}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-500 ease-expo group-hover:rotate-45" />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
