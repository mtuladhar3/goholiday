import type { Metadata } from "next";
import { site } from "@/data/site";
import { termsSections, termsUpdated } from "@/data/terms";
import { longDate } from "@/lib/format";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import RichText from "@/components/ui/RichText";
import { Calendar } from "@/components/ui/Icons";
import PageHero from "@/components/company/PageHero";
import CompanyLinks from "@/components/company/CompanyLinks";
import TermsToc from "@/components/company/terms/TermsToc";

export const metadata: Metadata = {
  title: "Terms & conditions — GoHoliday",
  description: "Booking, payment, cancellation, permit and insurance terms for every GoHoliday journey.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <PageHero
        page="/terms-and-conditions"
        title={"Terms &\n*conditions*"}
        intro="The agreement between you and GoHoliday, written in plain English. Please read it before booking — and ask us if anything's unclear."
        aside={
          <p className="flex items-center gap-3 rounded-full border border-ink/15 py-2 pl-2 pr-5 text-sm">
            <span className="grid size-9 place-items-center rounded-full bg-paper-deep">
              <Calendar className="size-4" />
            </span>
            <span>
              Last updated <time dateTime={termsUpdated} className="font-medium">{longDate(termsUpdated)}</time>
            </span>
          </p>
        }
      />

      <Section className="pt-0 lg:pt-0">
        <div className="grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-20">
          <aside>
            <TermsToc items={termsSections.map(({ id, title }) => ({ id, title }))} />
          </aside>

          <div className="max-w-3xl">
            {termsSections.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-28 border-t border-ink/15 py-10 first:border-t-0 first:pt-0">
                <p className="type-eyebrow text-saffron">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="type-title mt-3">{s.title}</h2>
                <div className="mt-5">
                  <RichText html={s.html} />
                </div>
              </article>
            ))}

            <div className="mt-6 flex flex-col gap-6 rounded-panel bg-paper-deep p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-md leading-relaxed text-stone">
                <span className="block text-lg font-medium tracking-tight text-ink">Still have a question?</span>
                We&apos;re happy to explain any part of these terms before you book.
              </p>
              <Button href={`mailto:${site.email}`} variant="ink">
                Email us
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CompanyLinks current="/terms-and-conditions" />
    </SiteShell>
  );
}
