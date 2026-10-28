"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { expert } from "@/data/expert";
import { site } from "@/data/site";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/animations/SplitReveal";
import { Mail, Phone } from "@/components/ui/Icons";
import RotatingBadge from "./RotatingBadge";
import EnquiryForm from "./EnquiryForm";

export default function ExpertCTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } })
          .fromTo(".arch", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 0 0)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)", duration: 1.4, ease: "expo.inOut" })
          .from(".arch img", { scale: 1.4, duration: 1.8, ease: "expo.out" }, 0.2)
          .from(".expert-fade", { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.5);
      });
    },
    { scope: ref },
  );

  return (
    <section id="plan" ref={ref} className="scroll-mt-20 py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 rounded-panel bg-ink p-6 text-paper sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-14">
          <div className="flex flex-col gap-10">
            <div className="relative w-full max-w-sm">
              <div className="arch relative aspect-[4/5] overflow-hidden rounded-t-full" style={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 0 0)" }}>
                <Image src={expert.image} alt={expert.name} fill sizes="(min-width: 1024px) 26vw, 90vw" className="object-cover" />
              </div>
              <RotatingBadge text="Talk to a Kailash expert • Plan with us • " href={`tel:${site.whatsapp}`} className="expert-fade absolute -bottom-6 -right-4 sm:-right-10" />
            </div>
            <div className="expert-fade max-w-sm">
              <blockquote className="leading-relaxed text-paper/75">“{expert.quote}”</blockquote>
              <p className="mt-5">
                <span className="block font-medium">{expert.name}</span>
                <span className="text-sm text-paper/50">{expert.role}</span>
              </p>
              <div className="mt-6 space-y-2 border-t border-paper/10 pt-6 text-sm text-paper/70">
                <a href={`tel:${site.whatsapp}`} className="flex items-center gap-3 hover:text-gold">
                  <Phone className="size-4" /> {site.whatsapp} · WhatsApp
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold">
                  <Mail className="size-4" /> {site.email}
                </a>
              </div>
            </div>
          </div>

          <div className="order-first flex flex-col justify-center lg:order-none">
            <SectionLabel className="expert-fade text-paper/70">
              Plan with us
            </SectionLabel>
            <SplitReveal text={"Plan your Kailash yatra\nwith a *local expert*"} className="type-display mt-5" />
            <p className="expert-fade mt-6 max-w-lg text-paper/60">
              Share a few details and we&apos;ll plan your Kailash or Tibet journey around your dates, pace and permits — free, with no obligation.
            </p>
            <div className="expert-fade mt-10">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
