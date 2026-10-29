import type { Metadata } from "next";
import Image from "next/image";
import { expert } from "@/data/expert";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { departments, team, teamStats } from "@/data/team";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { Quote } from "@/components/ui/Icons";
import CountUp from "@/components/animations/CountUp";
import Reveal from "@/components/animations/Reveal";
import SplitReveal from "@/components/animations/SplitReveal";
import PageHero from "@/components/company/PageHero";
import CompanyLinks from "@/components/company/CompanyLinks";
import TeamDirectory from "@/components/company/team/TeamDirectory";

export const metadata: Metadata = {
  title: "Our team — GoHoliday",
  description: "Meet the Kathmandu-based planners, permit specialists and guides who run every GoHoliday journey.",
};

export default function TeamPage() {
  return (
    <SiteShell>
      <PageHero
        page="/team"
        title={"The people behind\nevery *journey*"}
        intro="Every trip we run is planned, permitted and led by our own people — no subcontractors. Here's who you'll be emailing, and who you'll be walking beside."
        image={images.hikers}
        aside={
          <ul className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {departments.map((d) => (
              <li key={d} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium">
                {d} <span className="text-stone">· {team.filter((m) => m.department === d).length}</span>
              </li>
            ))}
          </ul>
        }
      />

      <Section tone="deep">
        <div className="grid items-center gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal from={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-t-full rounded-b-card lg:mx-0">
              <Image src={expert.image} alt={expert.name} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionLabel>From the founder</SectionLabel>
            <Quote className="mt-8 size-10 text-saffron" />
            <SplitReveal
              as="blockquote"
              text="I started GoHoliday so travellers could see the Himalaya the way *we* do — slowly, safely, and with people who'll still be your friends long after the trip."
              className="type-statement mt-6"
            />
            <Reveal className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between" stagger={0.08}>
              <p>
                <span className="block text-lg font-medium tracking-tight">{expert.name}</span>
                <span className="text-stone">{expert.role}</span>
              </p>
              <Button href={`mailto:${site.email}`} variant="ghost">
                Write to Tej Bir
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <TeamDirectory />
      </Section>

      <Section tone="ink">
        <SectionLabel className="text-paper/70">On the trail</SectionLabel>
        <SplitReveal text={"Trained, certified,\nand *local*"} className="type-display mt-5" />
        <Reveal className="mt-16 grid grid-cols-2 border-t border-paper/15 lg:grid-cols-4" stagger={0.08}>
          {teamStats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 pr-4 ${i >= 2 ? "border-t border-paper/15 lg:border-t-0" : ""} ${i % 2 ? "border-l border-paper/15 pl-4 sm:pl-8" : ""} ${i ? "lg:border-l lg:border-paper/15 lg:pl-8" : ""}`}
            >
              <p className="type-stat">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[14rem] text-sm text-paper/60">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section id="careers">
        <div className="relative isolate overflow-hidden rounded-panel bg-navy p-6 text-white sm:p-10 lg:p-14">
          <Image src={images.sunsetPeaks} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25 mix-blend-luminosity" />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <SectionLabel className="text-white/70">Careers</SectionLabel>
              <SplitReveal text={"Grew up in the mountains?\n*Join us.*"} className="type-display mt-5" />
            </div>
            <Reveal className="flex flex-col items-start gap-6" stagger={0.08}>
              <p className="leading-relaxed text-white/75">
                We&apos;re always glad to hear from licensed guides, porters and planners who share our way of travelling. Send us a note and a little about the routes you know.
              </p>
              <Button href={`mailto:${site.email}?subject=Joining%20the%20team`} variant="paper">
                Send your details
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <CompanyLinks current="/team" />
    </SiteShell>
  );
}
