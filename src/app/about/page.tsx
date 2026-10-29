import type { Metadata } from "next";
import { images } from "@/data/images";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollText from "@/components/home/manifesto/ScrollText";
import ExpertCTA from "@/components/home/expert/ExpertCTA";
import AboutHero from "@/components/about/AboutHero";
import Timeline from "@/components/about/Timeline";
import Values from "@/components/about/Values";
import Recognition from "@/components/about/Recognition";
import CompanyLinks from "@/components/company/CompanyLinks";

export const metadata: Metadata = {
  title: "About us — GoHoliday",
  description: "A locally owned Kathmandu team planning Kailash yatras, Tibet tours and Himalayan treks since 2010.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutHero />

      <Section id="story" tone="deep">
        <SectionLabel>Our story</SectionLabel>
        <ScrollText
          className="type-statement mt-8 max-w-6xl"
          images={{ flags: images.prayerFlags, stupa: images.boudha, peak: images.sunsetPeaks }}
          text="It started with a borrowed jeep and a simple idea: travellers [flags] deserve to see the Himalaya through the eyes of the people who *call it home.* Fifteen years on, we still answer every enquiry ourselves, still walk [stupa] the routes we sell, and still measure success in the *friends* we make along the way. [peak]"
        />
      </Section>

      <Section>
        <Timeline />
      </Section>

      <Values />
      <Recognition />
      <CompanyLinks current="/about" />
      <ExpertCTA />
    </SiteShell>
  );
}
