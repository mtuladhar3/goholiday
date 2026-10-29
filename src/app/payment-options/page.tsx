import type { Metadata } from "next";
import Link from "next/link";
import { bankDetails, paymentFaqs, paymentMethods, refundTiers } from "@/data/payments";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import { Bank, CreditCard, Globe, MapPin, Rupee, Shield } from "@/components/ui/Icons";
import Reveal from "@/components/animations/Reveal";
import SplitReveal from "@/components/animations/SplitReveal";
import ExpertCTA from "@/components/home/expert/ExpertCTA";
import Faqs from "@/components/tours/Faqs";
import PageHero from "@/components/company/PageHero";
import CompanyLinks from "@/components/company/CompanyLinks";
import PaymentSchedule from "@/components/company/payments/PaymentSchedule";
import CopyValue from "@/components/company/payments/CopyValue";

export const metadata: Metadata = {
  title: "Payment options — GoHoliday",
  description: "How deposits and balances work, every way to pay, our bank details and refund policy.",
};

const icons = { bank: Bank, card: CreditCard, globe: Globe, rupee: Rupee, office: MapPin };

export default function PaymentOptionsPage() {
  return (
    <SiteShell>
      <PageHero
        page="/payment-options"
        title={"Simple, *secure*\npayments"}
        intro="A small deposit to hold your place, the balance closer to the day, and no surprise fees in between. Pay the way that suits you — from anywhere in the world."
        aside={
          <ul className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
            {["USD", "INR", "NPR", "Visa", "Mastercard", "Amex", "Wise", "UPI"].map((c) => (
              <li key={c} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium">
                {c}
              </li>
            ))}
          </ul>
        }
      />

      <Section className="pt-0 lg:pt-0">
        <SectionLabel>How it works</SectionLabel>
        <SplitReveal text="Two payments. *That's it.*" className="type-headline mb-10 mt-5" />
        <PaymentSchedule />
      </Section>

      <Section tone="deep">
        <SectionHeader label="Ways to pay" title={"Pay from\n*anywhere*"} description="Whatever you choose, you'll get a numbered VAT receipt by email within one working day." />
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
          {paymentMethods.map((m) => {
            const Icon = icons[m.icon];
            return (
              <div key={m.name} className="group flex flex-col rounded-card border border-ink/10 bg-paper p-6 transition-colors duration-500 hover:border-navy">
                <span className="grid size-12 place-items-center rounded-full bg-paper-deep transition-colors duration-500 group-hover:bg-saffron">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-10 text-xl font-medium leading-snug tracking-tight">{m.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone">{m.best}</p>
                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-ink/10 pt-4 text-sm">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-stone">Fee</dt>
                    <dd className="mt-1 font-medium">{m.fee}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-stone">Clears</dt>
                    <dd className="mt-1 font-medium">{m.clears}</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-panel bg-ink p-6 text-paper sm:p-10">
            <div>
              <SectionLabel className="text-paper/70">Bank transfer</SectionLabel>
              <h2 className="type-headline mt-5">
                Our account <em>details</em>
              </h2>
              <dl className="mt-8 border-t border-paper/10">
                {bankDetails.map((d) => (
                  <CopyValue key={d.label} label={d.label} value={d.value} />
                ))}
              </dl>
              <p className="mt-6 flex items-start gap-3 text-sm text-paper/60">
                <Shield className="mt-0.5 size-4 shrink-0 text-gold" />
                Please add your booking reference to the transfer. We&apos;ll never email you new bank details — if you receive any, call us first.
              </p>
            </div>
          </Reveal>

          <Reveal className="rounded-panel border border-ink/10 p-6 sm:p-10">
            <div>
              <SectionLabel>If plans change</SectionLabel>
              <h2 className="type-headline mt-5">
                Refunds, <em>clearly</em>
              </h2>
              <ul className="mt-8 space-y-5">
                {refundTiers.map((t) => (
                  <li key={t.window}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-medium">{t.window}</span>
                      <span className="type-title tabular-nums">{t.refund}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-deep">
                      <div className="h-full rounded-full bg-navy" style={{ width: `${t.refund}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-stone">
                Refund of the trip price by time of cancellation. Permit fees already paid can&apos;t be recovered. Full details in our{" "}
                <Link href="/terms-and-conditions#cancel-you" className="text-navy underline underline-offset-4 hover:text-saffron">
                  terms &amp; conditions
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel>Good to know</SectionLabel>
            <SplitReveal text="Payment *questions*" className="type-headline mt-5" />
          </div>
          <Faqs items={paymentFaqs} />
        </div>
      </Section>

      <CompanyLinks current="/payment-options" />
      <ExpertCTA />
    </SiteShell>
  );
}
