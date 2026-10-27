"use client";

import { useEffect, useState } from "react";

/**
 * Floating in-page tabs. Hidden until the first section reaches the top, gone again after the last one,
 * and dropped below the main navbar whenever that slides back in on scroll-up.
 */
export default function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0].id);
  const [visible, setVisible] = useState(false);
  const [underNavbar, setUnderNavbar] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const first = document.getElementById(items[0].id)?.getBoundingClientRect();
      const last = document.getElementById(items.at(-1)!.id)?.getBoundingClientRect();
      setVisible(Boolean(first && last && first.top < 160 && last.bottom > 240));
      // Mirrors the navbar: it hides while scrolling down and returns on the way up.
      if (Math.abs(y - lastY) > 4) setUnderNavbar(y < lastY);
      lastY = y;

      const line = window.innerHeight * 0.4;
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

  return (
    <nav
      aria-label="On this page"
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 transition-[translate,opacity] duration-500 ease-expo ${
        visible ? "opacity-100" : "-translate-y-full opacity-0"
      } ${visible && underNavbar ? "translate-y-28 sm:translate-y-32" : visible ? "translate-y-3 sm:translate-y-4" : ""}`}
    >
      <ul className={`no-scrollbar glass-light flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5 ${visible ? "pointer-events-auto" : ""}`}>
        {items.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              tabIndex={visible ? 0 : -1}
              aria-current={active === id ? "true" : undefined}
              className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === id ? "bg-navy text-white" : "hover:text-navy"}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
