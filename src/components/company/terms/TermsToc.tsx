"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ChevronDown, Document, Mail } from "@/components/ui/Icons";

type Item = { id: string; title: string };

/** Sticky contents list that highlights the section being read; collapses to a dropdown on mobile. */
export default function TermsToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = items[0].id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const list = (
    <ol className="space-y-0.5">
      {items.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm transition-colors duration-300 ${
              active === item.id ? "bg-navy text-white" : "text-stone hover:text-ink"
            }`}
          >
            <span className={`w-5 text-xs tabular-nums ${active === item.id ? "text-white/60" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="Terms sections" className="lg:sticky lg:top-28">
      <details className="group rounded-card border border-ink/10 bg-paper lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
          Jump to section
          <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="px-2 pb-3">{list}</div>
      </details>

      <div className="hidden lg:block">
        <p className="type-eyebrow mb-4 px-3 text-stone">On this page</p>
        {list}
        <div className="mt-8 flex flex-col gap-2 border-t border-ink/10 px-3 pt-6 text-sm">
          <button type="button" onClick={() => window.print()} className="flex items-center gap-2 text-left transition-colors hover:text-navy">
            <Document className="size-4" /> Print or save as PDF
          </button>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-navy">
            <Mail className="size-4" /> Ask about these terms
          </a>
        </div>
      </div>
    </nav>
  );
}
