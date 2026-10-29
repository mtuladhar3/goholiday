import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contactChannels, contactFaqs, officeHours } from "@/data/contact";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { team } from "@/data/team";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Chat, Mail, MapPin, Phone, Shield } from "@/components/ui/Icons";
import Reveal from "@/components/animations/Reveal";
import SplitReveal from "@/components/animations/SplitReveal";
import Faqs from "@/components/tours/Faqs";
import PageHero from "@/components/company/PageHero";
import KathmanduClock from "@/components/contact/KathmanduClock";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact us — GoHoliday",
  description: "Talk to our Kathmandu team by WhatsApp, phone or email, or visit our office in Kamaladi.",
};

const icons = { whatsapp: Chat, phone: Phone, email: Mail, visit: MapPin };
const hour = (h: number) => `${h % 12 || 12}:00 ${h < 12 ? "am" : "pm"}`;

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Contact"
        title={"Say *namaste.*\nWe're listening."}
        intro="Real people in Kathmandu, not a call centre. Ask about routes, permits, dates or the altitude — whatever's on your mind, we'll give you a straight answer."
        aside={<KathmanduClock />}
      />

      <Section className="pt-0 lg:pt-0">
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {contactChannels.map((c, i) => {
            const Icon = icons[c.key];
            const external = c.href.startsWith("http");
            const primary = i === 0;
            return (
              <a
                key={c.key}
                href={c.href}
                {...(external && { target: "_blank", rel: "noopener" })}
                className={`group flex min-h-[260px] flex-col justify-between rounded-panel p-6 transition-colors duration-500 ${
                  primary ? "bg-ink text-paper hover:bg-navy" : "border border-ink/10 hover:border-navy"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`grid size-12 place-items-center rounded-full ${primary ? "bg-saffron text-ink" : "bg-paper-deep"}`}>
                    <Icon className="size-5" />
                  </span>
                  <span className={`grid size-10 place-items-center rounded-full transition-all duration-500 ease-expo group-hover:rotate-45 ${primary ? "bg-paper text-ink" : "bg-paper-deep group-hover:bg-navy group-hover:text-white"}`}>
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div>
                  <p className={`type-eyebrow ${primary ? "text-paper/60" : "text-stone"}`}>{c.label}</p>
                  <p className="mt-2 break-words text-xl font-medium tracking-tight">{c.value}</p>
                  <p className={`mt-1 text-sm ${primary ? "text-paper/60" : "text-stone"}`}>{c.note}</p>
                </div>
              </a>
            );
          })}
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel>Write to us</SectionLabel>
            <SplitReveal text={"Tell us what\nyou're *dreaming* of"} className="type-headline mt-5" />
            <p className="mt-6 max-w-md leading-relaxed text-stone">
              The more you share, the better our first reply. Already know your trip? Skip ahead and{" "}
              <Link href="/book" className="text-navy underline underline-offset-4 hover:text-saffron">reserve it online</Link>.
            </p>

            <Reveal className="mt-10 border-t border-ink/15" stagger={0.06}>
              <p className="type-eyebrow pt-6 text-stone">Office hours · Kathmandu time</p>
              <dl className="mt-3">
                {officeHours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-4 border-b border-ink/10 py-3">
                    <dt>{h.label}</dt>
                    <dd className="font-medium tabular-nums">
                      {hour(h.open)} – {hour(h.close)}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {team.slice(0, 4).map((m) => (
                    <span key={m.name} className="relative size-11 overflow-hidden rounded-full ring-2 ring-paper">
                      <Image src={m.image} alt={m.name} fill sizes="44px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-stone">
                  <span className="block font-medium text-ink">One of these four will reply</span>
                  Our trip planners, not a bot.
                </p>
              </div>

              <p className="mt-8 flex items-start gap-3 rounded-card bg-ink p-5 text-sm text-paper/70">
                <Shield className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  <span className="block font-medium text-paper">Already on a trip?</span>
                  Use the 24/7 emergency number on your trip documents — it rings straight through to our operations team.
                </span>
              </p>
            </Reveal>
          </div>

          <ContactForm />
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal from={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <div className="relative isolate flex min-h-[420px] items-end overflow-hidden rounded-panel p-4 lg:min-h-[560px]">
              <Image src={images.boudha} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="-z-10 object-cover" />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/50 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-saffron text-ink shadow-[0_0_0_12px_rgb(233_78_27/0.25)]" aria-hidden>
                <MapPin className="size-6" />
              </span>
              <p className="glass rounded-card p-5 text-white">
                <span className="type-eyebrow block text-white/70">Find us</span>
                {site.address.map((line) => (
                  <span key={line} className="mt-1 block text-lg font-medium tracking-tight">{line}</span>
                ))}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-10 rounded-panel bg-paper p-6 sm:p-10">
            <div>
              <SectionLabel>Visit the office</SectionLabel>
              <SplitReveal text={"Come for tea,\nleave with a *plan*"} className="type-headline mt-5" />
              <p className="mt-5 leading-relaxed text-stone">
                We&apos;re in Kamaladi, in the centre of Kathmandu — an easy taxi ride from Thamel and the airport. Drop in during office hours, or let us know you&apos;re coming and we&apos;ll have maps and permits ready to talk through.
              </p>
            </div>
            <Button href={contactChannels[3].href} variant="ink">
              Get directions
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel>Good to know</SectionLabel>
            <SplitReveal text="Before you *write*" className="type-headline mt-5" />
          </div>
          <Faqs items={contactFaqs} />
        </div>
      </Section>
    </SiteShell>
  );
}
