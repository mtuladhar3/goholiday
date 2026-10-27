"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { onIntro } from "@/lib/intro";
import { navLinks } from "@/data/site";
import Button from "@/components/ui/Button";
import { ArrowUpRight, ChevronDown } from "@/components/ui/Icons";
import Logo from "./Logo";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useGSAP(
    () => {
      const intro = gsap.from(".nav-item", { y: -24, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "power4.out", paused: true });
      const off = onIntro(() => intro.play());

      // Tuck the bar away while scrolling down, bring it back on scroll up.
      const hide = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const hidden = self.direction === 1 && self.scroll() > 300 && !menuOpenRef.current;
          gsap.to(ref.current, { yPercent: hidden ? -130 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        },
      });
      return () => {
        off();
        hide.kill();
      };
    },
    { scope: ref },
  );

  return (
    <>
      <header ref={ref} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
          <div className="nav-item rounded-2xl border border-ink/10 bg-white px-2.5 py-1.5">
            <Logo />
          </div>

          <nav className="nav-item glass-light relative hidden items-center gap-0.5 rounded-full p-1.5 xl:flex">
            {navLinks.map((link, i) => {
              if (!link.children) {
                return (
                  <a key={link.label} href={link.href} className="rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-navy hover:text-white">
                    {link.label}
                  </a>
                );
              }
              // Long lists open as a panel spanning the whole bar; short ones hang from their own trigger,
              // aligned to whichever edge keeps them inside the bar.
              const wide = link.children.length > 6;
              const anchor = wide ? "inset-x-0 pt-1.5" : `pt-3 ${i < navLinks.length / 2 ? "left-0" : "right-0"}`;
              return (
                <div key={link.label} className={`group ${wide ? "" : "relative"}`}>
                  <a
                    href={link.href}
                    aria-haspopup="true"
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors group-hover:bg-navy group-hover:text-white group-focus-within:bg-navy group-focus-within:text-white"
                  >
                    {link.label}
                    <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </a>
                  {/* The top padding bridges the gap so the panel stays open while the pointer moves onto it */}
                  <div className={`invisible absolute top-full ${anchor} translate-y-2 opacity-0 transition-[opacity,translate,visibility] duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100`}>
                    <ul
                      className={`grid gap-0.5 rounded-card border border-mist bg-white p-2 ${
                        wide ? "grid-cols-2" : "w-72"
                      }`}
                    >
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            className="group/item flex items-center justify-between gap-3 rounded-thumb px-4 py-3 text-sm transition-colors hover:bg-navy/5 hover:text-navy"
                          >
                            {child.label}
                            <ArrowUpRight className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="nav-item flex items-center gap-2">
            <Button href="#plan" variant="saffron" className="hidden sm:inline-block">
              Plan a trip
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`grid size-12 place-items-center rounded-full transition-colors xl:hidden ${menuOpen ? "bg-paper text-ink" : "glass-light"}`}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-full rounded bg-current transition-transform duration-500 ease-expo ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-full rounded bg-current transition-transform duration-500 ease-expo ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
