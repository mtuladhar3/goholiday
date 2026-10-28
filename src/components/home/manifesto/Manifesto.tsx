import { images } from "@/data/images";
import { whyFeatures, whyStats } from "@/data/why";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { Compass, Leaf, Shield, Users } from "@/components/ui/Icons";
import CountUp from "@/components/animations/CountUp";
import Reveal from "@/components/animations/Reveal";
import ScrollText from "./ScrollText";

const icons = { shield: Shield, users: Users, compass: Compass, leaf: Leaf };

/** "Why travel with us": scroll-lit statement, feature cards and key numbers. */
export default function Manifesto() {
  return (
    <Section id="why" tone="deep">
      <SectionLabel>Why travel with us</SectionLabel>
      <ScrollText
        className="type-statement mt-8 max-w-6xl"
        images={{ wheels: images.prayerWheels, peak: images.amaDablam, hikers: images.hikers }}
        text="We don't sell tours. We open doors [wheels] — to monasteries at *dawn,* butter tea with nomads on the Tibetan plateau, and a kora [peak] around Kailash that quietly *rewrites who you are.* Every journey is planned by locals, walked [hikers] by locals, and leaves the mountains a little better than we found them."
      />

      <Reveal className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {whyFeatures.map(({ icon, title, text }) => {
          const Icon = icons[icon];
          return (
            <div key={title} className="group rounded-card border border-ink/10 bg-paper p-6 transition-colors duration-500 hover:border-navy">
              <span className="grid size-12 place-items-center rounded-full bg-paper-deep transition-colors duration-500 group-hover:bg-saffron">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-10 text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{text}</p>
            </div>
          );
        })}
      </Reveal>

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
  );
}
