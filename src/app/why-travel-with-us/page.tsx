import type { Metadata } from "next";
import { images } from "@/data/images";
import { whyStats } from "@/data/why";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import StarRating from "@/components/ui/StarRating";
import CountUp from "@/components/animations/CountUp";
import Reveal from "@/components/animations/Reveal";
import SplitReveal from "@/components/animations/SplitReveal";
import ExpertCTA from "@/components/home/expert/ExpertCTA";
import Testimonials from "@/components/home/testimonials/Testimonials";
import PageHero from "@/components/company/PageHero";
import CompanyLinks from "@/components/company/CompanyLinks";
import ReasonsBento from "@/components/company/why/ReasonsBento";
import Comparison from "@/components/company/why/Comparison";

export const metadata: Metadata = {
  title: "Why travel with GoHoliday",
  description: "Locally owned, small groups, altitude done properly and every trip run by our own guides — what makes a GoHoliday journey different.",
};

export default function WhyTravelPage() {
  return (
    <SiteShell>
      <PageHero
        page="/why-travel-with-us"
        title={"Why travel with\n*GoHoliday?*"}
        intro="Plenty of companies sell Kailash and Tibet. Very few of them are actually here. These are the things we do differently — and why 1,200 travellers have rated us 4.9."
        image={images.alpineValley}
        aside={
          <div className="flex items-end gap-4">
            <p className="type-stat">4.9</p>
            <div className="pb-1">
              <StarRating value={5} />
              <p className="mt-2 text-sm text-stone">1,200+ reviews</p>
            </div>
          </div>
        }
      />

      <Section className="pt-0 lg:pt-0">
        <ReasonsBento />
        <Reveal className="mt-16 grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4" stagger={0.08}>
          {whyStats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 pr-4 ${i >= 2 ? "border-t border-ink/15 lg:border-t-0" : ""} ${i % 2 ? "border-l border-ink/15 pl-4 sm:pl-8" : ""} ${i ? "lg:border-l lg:border-ink/15 lg:pl-8" : ""}`}
            >
              <p className="type-stat">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-3 max-w-[14rem] text-sm text-stone">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <SectionLabel>Side by side</SectionLabel>
            <SplitReveal text={"Local vs.\n*resold*"} className="type-display mt-5" />
            <p className="mt-6 max-w-sm leading-relaxed text-stone">
              Many overseas companies hand your trip to a Kathmandu agency and add their margin. Here&apos;s what changes when you book with the people who run it.
            </p>
          </div>
          <Comparison />
        </div>
      </Section>

      <Testimonials />
      <CompanyLinks current="/why-travel-with-us" />
      <ExpertCTA />
    </SiteShell>
  );
}
