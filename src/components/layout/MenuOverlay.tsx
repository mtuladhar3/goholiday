"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import { navLinks, site, socials } from "@/data/site";
import { ChevronDown } from "@/components/ui/Icons";

type MenuOverlayProps = { open: boolean; onClose: () => void };

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(ref.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 })
        .fromTo(ref.current, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" })
        .from(".menu-link", { yPercent: 110, rotate: 4, duration: 0.8, stagger: 0.05, ease: "power4.out" }, "-=0.45")
        .from(".menu-meta", { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.06 }, "-=0.5");
    },
    { scope: ref },
  );

  useGSAP(() => {
    if (open) {
      lenisRef.current?.stop();
      tl.current?.timeScale(1).play();
    } else {
      lenisRef.current?.start();
      tl.current?.timeScale(1.8).reverse();
    }
  }, { dependencies: [open] });

  return (
    <div ref={ref} className="invisible fixed inset-0 z-40 flex flex-col bg-ink px-4 pb-8 pt-32 text-paper sm:px-8 sm:pt-36" aria-hidden={!open}>
      {/* data-lenis-prevent lets the list scroll natively while smooth scroll is paused */}
      <nav className="no-scrollbar -mx-1 flex flex-1 flex-col overflow-y-auto px-1" data-lenis-prevent>
        <div className="my-auto">
          {navLinks.map((link) => {
            const expanded = openItem === link.label;
            const row = "menu-link flex w-full items-baseline justify-between py-2.5 text-left text-[clamp(1.75rem,5.5vw,3.5rem)] font-medium leading-none tracking-[-0.04em] transition-colors hover:text-gold";
            return (
              <div key={link.label} className="overflow-hidden border-b border-paper/10">
                {link.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenItem(expanded ? null : link.label)}
                      aria-expanded={expanded}
                      tabIndex={open ? 0 : -1}
                      className={`${row} ${expanded ? "text-gold" : ""}`}
                    >
                      {link.label}
                      <ChevronDown className={`size-5 shrink-0 self-center text-paper/40 transition-transform duration-500 ease-expo ${expanded ? "rotate-180 text-gold" : ""}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-expo ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <ul className="grid min-h-0 gap-x-8 sm:grid-cols-2">
                        {link.children.map((child, j) => (
                          <li key={child.label} className={j === 0 ? "pt-1" : ""}>
                            <a
                              href={child.href}
                              onClick={onClose}
                              tabIndex={open && expanded ? 0 : -1}
                              className="flex items-center gap-3 py-2 text-base text-paper/70 transition-colors hover:text-gold"
                            >
                              <span className="size-1 shrink-0 rounded-full bg-saffron" />
                              {child.label}
                            </a>
                          </li>
                        ))}
                        <li className="pb-4 sm:col-span-2" aria-hidden />
                      </ul>
                    </div>
                  </>
                ) : (
                  <a href={link.href} onClick={onClose} tabIndex={open ? 0 : -1} className={row}>
                    {link.label}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      <div className="mt-8 grid shrink-0 gap-6 text-sm text-paper/70 sm:grid-cols-3">
        <a className="menu-meta hover:text-gold" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <a className="menu-meta hover:text-gold" href={`tel:${site.whatsapp}`}>
          {site.whatsapp}
        </a>
        <div className="menu-meta flex gap-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-gold">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
