import Image from "next/image";
import { associations, footerColumns, recommendedOn, site, socials } from "@/data/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SplitReveal from "@/components/animations/SplitReveal";
import Reveal from "@/components/animations/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden rounded-t-panel bg-ink text-paper">
      <Container className="pt-24 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <SplitReveal text={"Ready when\n*you* are."} className="type-display" />
            <Button href="#plan" variant="saffron" className="mt-10">
              Start planning
            </Button>
          </div>

          <Reveal>
            <form action="#" className="rounded-card border border-paper/10 p-6">
              <label htmlFor="newsletter" className="text-sm text-paper/60">
                Seasonal stories, permit news and early departures — once a month.
              </label>
              <div className="mt-4 flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 p-1.5 focus-within:border-saffron">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-paper/60"
                />
                <button type="submit" aria-label="Subscribe" className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-white transition-[scale,background-color] hover:scale-105 hover:bg-saffron">
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal className="mt-20 grid gap-10 border-t border-paper/10 pt-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="type-eyebrow text-paper/60">{col.title}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-paper/80 transition-colors hover:text-gold">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="type-eyebrow text-paper/60">Visit</p>
            <address className="mt-4 not-italic text-paper/80">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={`mailto:${site.email}`} className="mt-3 block hover:text-gold">
                {site.email}
              </a>
              {site.phones.map((p) => (
                <a key={p} href={`tel:${p}`} className="block hover:text-gold">
                  {p}
                </a>
              ))}
            </address>
          </div>
          <div>
            <p className="type-eyebrow text-paper/60">Follow</p>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="group inline-flex items-center gap-2 text-paper/80 hover:text-gold">
                    {s.label}
                    <ArrowRight className="size-3.5 -rotate-45 transition-transform group-hover:rotate-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Logos are small square marks, so each sits at native size on a white chip — all on one row */}
        <div className="mt-16 flex flex-col gap-8 border-t border-paper/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="type-eyebrow shrink-0 text-paper/60">We are associated with</p>
            <Reveal className="flex flex-wrap items-center gap-3" stagger={0.06}>
              {associations.map((a) => (
                <span
                  key={a.name}
                  title={a.name}
                  className="group grid size-16 place-items-center rounded-xl border border-paper/10 bg-white p-1.5"
                >
                  <Image src={a.logo} alt={a.name} sizes="64px" className="size-full object-contain transition-transform duration-500 ease-expo group-hover:scale-105" />
                </span>
              ))}
            </Reveal>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="type-eyebrow shrink-0 text-paper/60">Recommended on</p>
            <Reveal className="flex flex-wrap items-center gap-3" stagger={0.06}>
              {recommendedOn.map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  title={r.name}
                  className="group flex items-center gap-3 rounded-xl border border-paper/10 py-1.5 pl-1.5 pr-4 transition-colors duration-500 hover:border-paper/30"
                >
                  <span className="grid size-13 place-items-center rounded-lg bg-white p-1">
                    <Image src={r.logo} alt={r.name} sizes="56px" className="size-full object-contain" />
                  </span>
                  <span className="flex flex-col text-xs text-paper/60">
                    <span className="text-gold">★★★★★</span>
                    {r.note}
                  </span>
                </a>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-paper/60 sm:flex-row sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <a href="https://webtech.com.np" target="_blank" rel="noopener" className="text-paper underline underline-offset-4 transition-colors hover:text-saffron">
              Webtech Nepal
            </a>
          </p>
        </div>
      </Container>

      <Reveal
        className="mt-6 flex select-none justify-center overflow-hidden leading-none"
        selector=".wm-letter"
        from={{ yPercent: 110 }}
        stagger={0.04}
        start="top 98%"
      >
        <p aria-hidden className="flex text-[18vw] font-semibold tracking-[-0.07em] text-paper">
          {site.name.split("").map((ch, i) => (
            <span key={i} className="wm-letter inline-block">
              {ch}
            </span>
          ))}
          <span className="wm-letter inline-block text-saffron">°</span>
        </p>
      </Reveal>
    </footer>
  );
}
