"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/ui/Icons";

/** A bank-detail value with a one-tap copy button that confirms for a moment. */
export default function CopyValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure context, permissions) — the value is still selectable.
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-paper/10 py-4">
      <div className="min-w-0">
        <dt className="text-[11px] uppercase tracking-[0.15em] text-paper/50">{label}</dt>
        <dd className="mt-1 truncate text-lg font-medium tracking-tight tabular-nums">{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${copied ? "border-gold bg-gold text-ink" : "border-paper/20 hover:border-gold hover:text-gold"}`}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
