import type { Metadata } from "next";
import { legalDocuments, verifySteps } from "@/data/legal";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import { ArrowUpRight, Shield } from "@/components/ui/Icons";
import Reveal from "@/components/animations/Reveal";
import SplitReveal from "@/components/animations/SplitReveal";
import ExpertCTA from "@/components/home/expert/ExpertCTA";
import Recognition from "@/components/about/Recognition";
import PageHero from "@/components/company/PageHero";
import CompanyLinks from "@/components/company/CompanyLinks";
import DocumentCard from "@/components/company/legal/DocumentCard";

export const metadata: Metadata = {
  title: "Legal documents — GoHoliday",
  description: "GoHoliday's company registration, tourism licences, tax registration and association memberships.",
};

export default function LegalDocumentsPage() {
  return (
    <SiteShell>
      <PageHero
        page="/legal-documents"
        title={"Licensed, registered\nand *accountable*"}
        intro="Booking a trip to the roof of the world means trusting the people who run it. Here's every licence and registration we hold — open to check, any time."
        aside={
          <div className="flex items-center gap-4 rounded-card border border-ink/10 p-4 pr-6">
            <span className="grid size-12 place-items-center rounded-full bg-navy text-white">
              <Shield className="size-5" />
            </span>
            <p className="text-sm">
              <span className="block font-medium">{legalDocuments.length} documents on file</span>
              <span className="text-stone">All current · checked October 2026</span>
            </p>
          </div>
        }
      />

      <Section className="pt-0 lg:pt-0">
        <Reveal className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" stagger={0.06}>
          {legalDocuments.map((doc) => (
            <DocumentCard key={doc.title} doc={doc} />
          ))}
        </Reveal>
      </Section>

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel className="text-paper/70">Don&apos;t take our word for it</SectionLabel>
            <SplitReveal text={"Verify us\n*yourself*"} className="type-display mt-5" />
            <p className="mt-6 max-w-md leading-relaxed text-paper/60">
              Every registration above can be checked independently. If anything doesn&apos;t match, we&apos;d like to hear about it.
            </p>
          </div>
          <Reveal className="border-t border-paper/15" stagger={0.08}>
            {verifySteps.map((step, i) => {
              const external = step.href.startsWith("http");
              return (
                <a
                  key={step.title}
                  href={step.href}
                  {...(external && { target: "_blank", rel: "noopener" })}
                  className="group grid grid-cols-[3rem_1fr_auto] items-start gap-4 border-b border-paper/15 py-7"
                >
                  <span className="type-eyebrow pt-1.5 text-paper/50">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="type-title block transition-colors duration-500 group-hover:text-gold">{step.title}</span>
                    <span className="mt-2 block max-w-md text-paper/60">{step.text}</span>
                  </span>
                  <span className="grid size-11 place-items-center rounded-full border border-paper/20 transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              );
            })}
          </Reveal>
        </div>
      </Section>

      <Recognition />

      <Section>
        <SectionHeader
          label="For travel agents & partners"
          title={"Need certified\n*copies?*"}
          description="We'll send notarised copies of any document for your records or due diligence — usually within one working day."
          action={{ href: "/contact", label: "Request copies" }}
        />
      </Section>

      <CompanyLinks current="/legal-documents" />
      <ExpertCTA />
    </SiteShell>
  );
}
