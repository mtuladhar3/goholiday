import type { ReactNode } from "react";

/** Headline figure in the trip-at-a-glance band, with an optional control beside the label. */
export default function Stat({ label, action, children, foot }: { label: string; action?: ReactNode; children: ReactNode; foot: ReactNode }) {
  return (
    <div className="flex flex-col p-5 sm:p-6">
      <div className="flex min-h-7 items-center justify-between gap-3">
        <p className="type-eyebrow text-stone">{label}</p>
        {action}
      </div>
      <div className="mt-2 flex items-baseline gap-2">{children}</div>
      <div className="mt-auto pt-4">{foot}</div>
    </div>
  );
}
