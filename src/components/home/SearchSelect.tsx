"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "@/components/ui/Icons";

export type SearchOption = { value: string; hint?: string; image?: string };

type SearchSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  /** Rendered icon element (components can't be passed from the server). */
  icon: ReactNode;
  options: SearchOption[];
  className?: string;
};

/** Search-bar field that opens a styled listbox. The chosen value is submitted through a hidden input. */
export default function SearchSelect({ name, label, placeholder, icon, options, className = "" }: SearchSelectProps) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);

  // The placeholder doubles as the "any" choice at the top of the list.
  const items: SearchOption[] = [{ value: "", hint: "No preference" }, ...options];
  const optionId = (i: number) => `${id}-opt-${i}`;

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  // Keep the keyboard-highlighted option visible without scrolling the page.
  useEffect(() => {
    const el = list.current;
    const opt = el?.children[active] as HTMLElement | undefined;
    if (!open || !el || !opt) return;
    if (opt.offsetTop < el.scrollTop) el.scrollTop = opt.offsetTop;
    else if (opt.offsetTop + opt.offsetHeight > el.scrollTop + el.clientHeight) el.scrollTop = opt.offsetTop + opt.offsetHeight - el.clientHeight;
  }, [open, active]);

  const show = () => {
    setActive(Math.max(0, items.findIndex((o) => o.value === value)));
    setOpen(true);
    requestAnimationFrame(() => list.current?.focus());
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  };
  const choose = (i: number) => {
    setValue(items[i].value);
    close();
  };

  const onListKey = (e: KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => setActive((a) => Math.min(items.length - 1, a + 1)),
      ArrowUp: () => setActive((a) => Math.max(0, a - 1)),
      Home: () => setActive(0),
      End: () => setActive(items.length - 1),
      Enter: () => choose(active),
      " ": () => choose(active),
      Escape: () => close(),
    };
    if (e.key === "Tab") return close(false);
    if (!keys[e.key]) return;
    e.preventDefault();
    keys[e.key]();
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${value || placeholder}`}
        onClick={() => (open ? close() : show())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            show();
          }
        }}
        className={`group flex w-full cursor-pointer items-center gap-4 rounded-thumb px-4 py-3.5 text-left transition-colors hover:bg-paper ${open ? "bg-paper" : ""}`}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-saffron/10 text-saffron transition-colors group-hover:bg-saffron group-hover:text-white">
          {icon}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="type-eyebrow text-stone">{label}</span>
          <span className={`mt-1 truncate text-base font-medium ${value ? "text-ink" : ""}`}>{value || placeholder}</span>
        </span>
        <ChevronDown className={`size-4 shrink-0 text-stone transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <ul
        ref={list}
        id={`${id}-list`}
        role="listbox"
        aria-label={label}
        tabIndex={-1}
        aria-activedescendant={open ? optionId(active) : undefined}
        onKeyDown={onListKey}
        data-lenis-prevent
        className={`absolute inset-x-0 top-full z-20 mt-2 max-h-80 min-w-64 overflow-y-auto rounded-card bg-white p-2 shadow-[0_20px_50px_-12px] shadow-ink/25 ring-1 ring-ink/5 outline-none transition-[opacity,translate] duration-300 ease-expo ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0 motion-safe:-translate-y-2"
        }`}
      >
        {items.map((o, i) => {
          const selected = o.value === value;
          return (
            <li
              key={o.value || "any"}
              id={optionId(i)}
              role="option"
              aria-selected={selected}
              onPointerMove={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center gap-3 rounded-thumb px-3 py-2.5 transition-colors ${i === active ? "bg-paper" : ""}`}
            >
              {o.image ? (
                <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-paper-deep">
                  <Image src={o.image} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ) : null}
              <span className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className={`truncate text-sm font-medium ${selected ? "text-saffron" : ""}`}>{o.value || placeholder}</span>
                {o.hint && <span className="mt-0.5 text-xs text-stone">{o.hint}</span>}
              </span>
              {selected && <Check className="size-4 shrink-0 text-saffron" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
